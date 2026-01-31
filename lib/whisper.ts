/**
 * 文字起こし: まず YouTube 字幕を取得。字幕がなければ Gemini API で音声認識。
 * Gemini API は YouTube URL を直接処理できるため、音声ダウンロード不要。
 */

async function fetchYoutubeTranscript(videoId: string): Promise<string> {
  try {
    const { YoutubeTranscript } = await import("youtube-transcript");
    const items = await YoutubeTranscript.fetchTranscript(videoId);
    if (!items || !Array.isArray(items)) return "";
    return items.map((item: { text?: string }) => item.text ?? "").join("\n");
  } catch {
    return "";
  }
}

async function fetchTranscriptWithGemini(videoId: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.log("GEMINI_API_KEY が設定されていません");
    return "";
  }

  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "x-goog-api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  file_data: {
                    file_uri: youtubeUrl,
                    mime_type: "video/mp4",
                  },
                },
                {
                  text: `この動画の音声を日本語で文字起こししてください。
発言内容をそのまま正確に書き起こしてください。
要約や説明は不要です。発言のみを出力してください。`,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);
      return "";
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    return text;
  } catch (error) {
    console.error("Gemini transcription error:", error);
    return "";
  }
}

export async function fetchTranscriptWithWhisper(videoId: string): Promise<string> {
  // 1. まず YouTube 字幕を試す
  const fromYoutube = await fetchYoutubeTranscript(videoId);
  if (fromYoutube.trim()) {
    console.log(`YouTube 字幕から取得: ${videoId}`);
    return fromYoutube;
  }

  // 2. 字幕がなければ Gemini API で文字起こし
  console.log(`Gemini API で文字起こし: ${videoId}`);
  const fromGemini = await fetchTranscriptWithGemini(videoId);
  if (fromGemini.trim()) {
    return fromGemini;
  }

  // 3. OpenAI Whisper API（将来の拡張用、現在は未実装）
  const openaiKey = process.env.OPENAI_API_KEY;
  if (openaiKey && openaiKey !== "your_openai_api_key") {
    // Whisper を使う場合は音声ファイルが必要。yt-dlp 等でダウンロードしてから呼ぶ。
    // 現在は Gemini API で対応できるため、将来的な拡張用として残す。
  }

  return "";
}
