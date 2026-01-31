/**
 * Gemini API で要約テキストからインフォグラフィック画像を生成し、
 * Supabase Storage にアップロードして公開URLを返す。
 */
import { createServerClient } from "@/lib/supabase/server";

export async function generateAndUploadInfographic(
  articleId: string,
  summary: string
): Promise<string | null> {
  const geminiKey = process.env.GEMINI_API_KEY;
  if (!geminiKey) {
    console.warn("GEMINI_API_KEY が未設定のため画像生成をスキップします");
    return null;
  }

  const prompt = `以下の蒲郡市議会の内容を、市民にわかりやすく伝えるイラスト風のインフォグラフィックを作成してください。

【デザイン指示】
- かわいいイラストやアイコンを使って、内容を視覚的に説明する
- 人物はシンプルなキャラクター風に（議員、市民、市長など）
- 吹き出しや矢印で流れをわかりやすく
- オレンジ・白・黄色を基調とした温かみのある配色
- 日本語テキストは最小限に、アイコンやイラストで伝える
- ポップで親しみやすい雰囲気
- 3〜5つの主要ポイントをイラストで表現

【要約内容】
${summary.slice(0, 2000)}
`;

  try {
    // Gemini 3 Pro Image Preview を使用（高品質画像生成）
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent",
      {
        method: "POST",
        headers: {
          "x-goog-api-key": geminiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            responseModalities: ["IMAGE", "TEXT"],
            responseMimeType: "text/plain",
          },
        }),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error("Gemini Image API error:", errText);
      return null;
    }

    const data = await res.json();
    const parts = data?.candidates?.[0]?.content?.parts ?? [];

    // 画像データを探す
    for (const part of parts) {
      if (part.inlineData?.mimeType?.startsWith("image/")) {
        const b64 = part.inlineData.data;
        const mimeType = part.inlineData.mimeType;
        const extension = mimeType === "image/jpeg" ? "jpg" : "png";
        const buffer = Buffer.from(b64, "base64");
        const publicUrl = await uploadToSupabaseStorage(articleId, buffer, mimeType, extension);
        return publicUrl;
      }
    }

    console.warn("Gemini API response did not contain image data");
    return null;
  } catch (err) {
    console.error("generateAndUploadInfographic error:", err);
    return null;
  }
}

async function uploadToSupabaseStorage(
  articleId: string,
  buffer: Buffer,
  contentType: string,
  extension: string,
  bucket: string = "infographics"
): Promise<string | null> {
  try {
    const supabase = createServerClient();
    const path = `${articleId}.${extension}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, buffer, { contentType, upsert: true });

    if (error) {
      console.error("Supabase storage upload error:", error);
      return null;
    }

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
    return urlData.publicUrl;
  } catch (err) {
    console.error("uploadToSupabaseStorage error:", err);
    return null;
  }
}

/**
 * サムネイル画像を生成（YouTubeサムネイル風、イラスト重視）
 */
export async function generateAndUploadThumbnail(
  articleId: string,
  title: string,
  summary: string
): Promise<string | null> {
  const geminiKey = process.env.GEMINI_API_KEY;
  if (!geminiKey) {
    console.warn("GEMINI_API_KEY が未設定のためサムネイル生成をスキップします");
    return null;
  }

  const prompt = `YouTubeサムネイル風の画像を作成してください。市議会の記事用です。

【デザイン指示】
- かわいいイラストやキャラクターを中心に
- 文字は一切使わない（日本語・英語ともに禁止）
- オレンジ・白・黄色を基調とした明るい配色
- ポップで目を引くデザイン
- 16:9のアスペクト比
- 議会の内容をシンボリックなイラストで表現
- 人物はシンプルなキャラクター風に

【記事の内容】
タイトル: ${title || "市議会の話題"}
概要: ${(summary || "").slice(0, 800)}

【イラストの例】
- 予算・お金 → コイン、貯金箱、グラフとキャラクター
- 教育 → 学校、本、勉強するキャラクター
- 福祉 → ハート、手をつなぐ人々、笑顔のキャラクター
- 環境 → 木、太陽、自然の中のキャラクター
- インフラ → ビル、道路、工事のキャラクター
- 観光 → 海、船、風景
- 防災 → 盾、ヘルメット、安全を守るキャラクター

文字は一切使わず、イラストとキャラクターだけで内容を伝えてください。`;

  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent",
      {
        method: "POST",
        headers: {
          "x-goog-api-key": geminiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            responseModalities: ["IMAGE", "TEXT"],
            responseMimeType: "text/plain",
          },
        }),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error("Gemini Image API error (thumbnail):", errText);
      return null;
    }

    const data = await res.json();
    const parts = data?.candidates?.[0]?.content?.parts ?? [];

    for (const part of parts) {
      if (part.inlineData?.mimeType?.startsWith("image/")) {
        const b64 = part.inlineData.data;
        const mimeType = part.inlineData.mimeType;
        const extension = mimeType === "image/jpeg" ? "jpg" : "png";
        const buffer = Buffer.from(b64, "base64");
        const publicUrl = await uploadToSupabaseStorage(articleId, buffer, mimeType, extension, "thumbnails");
        return publicUrl;
      }
    }

    console.warn("Gemini API response did not contain thumbnail image data");
    return null;
  } catch (err) {
    console.error("generateAndUploadThumbnail error:", err);
    return null;
  }
}
