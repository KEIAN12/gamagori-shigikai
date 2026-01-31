import { loadGamagoriReference } from "@/lib/load-reference";
import type { GamagoriReference } from "@/types";

// 使用可能なタグ一覧
export const AVAILABLE_TAGS = [
  { id: "kosodate", label: "子育て・教育", icon: "👶", color: "pink" },
  { id: "hojokin", label: "補助金・給付金", icon: "💰", color: "yellow" },
  { id: "yosan", label: "予算・財政", icon: "📊", color: "blue" },
  { id: "suidou", label: "水道・インフラ", icon: "🚰", color: "cyan" },
  { id: "iryo", label: "医療・福祉", icon: "🏥", color: "red" },
  { id: "senkyo", label: "選挙", icon: "🗳️", color: "purple" },
  { id: "bosai", label: "防災・安全", icon: "🛡️", color: "orange" },
  { id: "kankyo", label: "環境", icon: "🌳", color: "green" },
  { id: "kanko", label: "観光・商業", icon: "🏖️", color: "indigo" },
] as const;

const TAG_LIST = AVAILABLE_TAGS.map((t) => t.id).join(", ");

const SYSTEM_PROMPT = `あなたは蒲郡市の情報を発信する、親しみやすく優秀な「地元メディアの編集者」です。
入力された「市議会の議事録（Youtube文字起こし）」をもとに、市民が興味を持って読めるブログ記事を作成してください。

【制約事項】
- 太字（** **）は絶対に使用しないでください
- 専門用語や行政用語は、中学生でも分かる言葉に噛み砕いてください（例：補正予算→予算の変更、繰入金→貯金の切り崩し、など）
- 入力テキストは音声認識特有の誤字や読点不足が含まれるため、文脈を読み取り、正しい情報に補正して要約してください
- 事務的な進行発言（「ページをご覧ください」「質疑を許します」等）は削除し、決定事項や重要な議論の中身だけを抽出してください
- 雰囲気は「明るく、前向きで、分かりやすい」トーンにしてください
- 見出しやリストを見やすく配置し、適度な絵文字を使って視認性を高めてください

【記事構成】
1. 30秒でわかるまとめ（最上部に配置）
   - 記事全体の結論を3点の箇条書きでまとめてください
   - 忙しい人がここだけ読めば内容が分かるようにしてください

2. 本文セクション1：市民へのメリット（最優先）
   - 給付金、商品券、補助金など、市民の財布や生活に直結する話題を最初に書いてください
   - 金額や条件など、数字は具体的に記載してください

3. 本文セクション2：街の動き・行政課題
   - 公共工事の進捗、予算の増減、その他の議案について解説してください
   - なぜ予算が増えたのか/減ったのかの理由（背景）を必ず含めてください
   - 質疑応答がある場合は、Q&A形式で分かりやすくまとめてください

4. まとめ・ひとこと
   - 今回の議会のポイントを振り返り、次なるアクション（広報の確認など）を促してください

【マークダウン形式（WordPressブログ風に読みやすく）】
- ## で大見出し（見出しの前後は必ず空行を1行入れる）
- ### で小見出し（見出しの前後は必ず空行を1行入れる）
- 段落と段落の間は必ず空行を1行入れる
- 箇条書き（-）の前後も空行を入れる
- 💡 📌 🏠 💰 🗳️ などの絵文字を見出しに適度に使用
- 1つの段落は2〜3文程度に抑え、長文にしない
- 読みやすさを最優先にする

【参照データの使用】
- 議員名・施設名・地名・役職は参照データの正式表記のみ使用
- 参照データにない名前は「関係者」「担当者」と表記`;

function buildReferenceContext(reference: GamagoriReference, councilNames: string[]): string {
  const facilities = reference.facilities.map((f) => f.name).join("、");
  const locations = reference.locations.map((l) => l.name).join("、");
  const meetingTypes = reference.meetingTypes.map((m) => `${m.name}（${m.dbValue}）`).join("、");
  const terms = reference.politicalTerms.map((t) => `${t.term}: ${t.description}`).join("\n");
  const positions = reference.positions.map((p) => p.title).join("、");
  return `
【施設名（正式表記）】${facilities || "（なし）"}
【地名（正式表記）】${locations || "（なし）"}
【議会種類】${meetingTypes || "（なし）"}
【議会用語】${terms || "（なし）"}
【役職】${positions || "（なし）"}
【議員名（このリストのみ使用すること）】${councilNames.length ? councilNames.join("、") : "（市役所HPの議員名簿で取得・未取得の場合は省略）"}
`;
}

export async function summarizeTranscript(
  transcript: string,
  options: { councilMemberNames?: string[] } = {}
): Promise<{ summary: string; title: string; sessionType: "regular" | "extraordinary" | "committee" | null; tags: string[] }> {
  // Gemini API を優先、なければ OpenAI を試す
  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (!geminiKey && !openaiKey) {
    console.warn("GEMINI_API_KEY も OPENAI_API_KEY も未設定です");
    return { summary: "", title: "", sessionType: null, tags: [] };
  }

  const reference = loadGamagoriReference();
  const councilNames = options.councilMemberNames ?? [];
  const refContext = buildReferenceContext(reference, councilNames);

  const userContent = `
【システム指示】
${SYSTEM_PROMPT}

【参照データ（表記はこれに厳密に合わせること）】
${refContext}

【文字起こしテキスト】
${transcript.slice(0, 120000)}

上記の文字起こしを、市民向けの「わかりやすい要約」に変換してください。

【出力形式】
1. 最初の行に「タイトル: 」で始まるキャッチーなタイトルを書いてください
   - 思わずクリックしたくなる、具体的なメリットを含んだタイトル
   - 25文字以内で、内容の核心を伝える
   - 例：「水不足で緊急節水！市民生活への影響は？」「子育て支援に6億円！補正予算の中身」
2. その後に要約本文を書いてください
3. 要約本文の後に「タグ: 」で始まる行で、該当するタグをカンマ区切りで記載
   - 使用可能なタグ: ${TAG_LIST}
   - 内容に該当するものを1〜3個選んでください
   - 例：「タグ: kosodate, hojokin」
4. 最後に「議会種類: regular」「議会種類: extraordinary」「議会種類: committee」のいずれかを記載
`;

  let content = "";

  if (geminiKey) {
    try {
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
        {
          method: "POST",
          headers: {
            "x-goog-api-key": geminiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userContent }] }],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 4096,
            },
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        content = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";
      } else {
        console.error("Gemini API error:", await res.text());
      }
    } catch (err) {
      console.error("Gemini summarize error:", err);
    }
  }

  // Gemini で失敗した場合、OpenAI を試す
  if (!content && openaiKey) {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userContent },
        ],
        max_tokens: 4096,
        temperature: 0.3,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as { error?: { message?: string } }).error?.message ?? "要約APIエラー");
    }

    const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
    content = data.choices?.[0]?.message?.content?.trim() ?? "";
  }

  // タイトルを抽出
  let title = "";
  const titleMatch = content.match(/^タイトル:\s*(.+?)(\n|$)/m);
  if (titleMatch) {
    title = titleMatch[1].trim();
  }

  // 議会種類を抽出
  let sessionType: "regular" | "extraordinary" | "committee" | null = null;
  const sessionMatch = content.match(/議会種類:\s*(regular|extraordinary|committee)/i);
  if (sessionMatch) {
    sessionType = sessionMatch[1].toLowerCase() as "regular" | "extraordinary" | "committee";
  }

  // タグを抽出
  const validTagIds = AVAILABLE_TAGS.map((t) => t.id);
  let tags: string[] = [];
  const tagsMatch = content.match(/タグ:\s*(.+?)(\n|$)/m);
  if (tagsMatch) {
    tags = tagsMatch[1]
      .split(/[,、\s]+/)
      .map((t) => t.trim().toLowerCase())
      .filter((t) => validTagIds.includes(t));
  }

  // タイトル行、タグ行、議会種類行を除去して要約本文を取得
  const summary = content
    .replace(/^タイトル:\s*.+?(\n|$)/m, "")
    .replace(/\n?タグ:\s*.+?(\n|$)/m, "")
    .replace(/\n?議会種類:\s*(regular|extraordinary|committee).*$/i, "")
    .trim();

  return { summary, title, sessionType, tags };
}
