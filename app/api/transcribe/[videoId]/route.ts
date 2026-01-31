import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { fetchTranscriptWithWhisper } from "@/lib/whisper";

export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ videoId: string }> }
) {
  // 認証チェック（CRON_SECRET または内部呼び出しのみ許可）
  const authHeader = request.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  const isLocalhost = request.headers.get("host")?.includes("localhost");
  if (secret && !isLocalhost && authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { videoId } = await params;
  if (!videoId) {
    return NextResponse.json({ error: "videoId required" }, { status: 400 });
  }

  try {
    const supabase = createServerClient();
    const { data: video, error: videoError } = await supabase
      .from("videos")
      .select("id, youtube_video_id")
      .eq("id", videoId)
      .single();

    if (videoError || !video) {
      return NextResponse.json({ error: "動画が見つかりません" }, { status: 404 });
    }

    const ytVideoId = video.youtube_video_id as string;
    let transcript = "";
    // Gemini または OpenAI のAPIキーがあれば文字起こしを実行
    if (process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY) {
      try {
        transcript = await fetchTranscriptWithWhisper(ytVideoId);
      } catch (e) {
        console.error("Transcription error:", e);
      }
    }

    const { data: article, error: articleError } = await supabase
      .from("articles")
      .upsert(
        {
          video_id: videoId,
          transcript: transcript || null,
          summary: null,
          infographic_url: null,
          session_type: null,
          processed_at: null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "video_id" }
      )
      .select("id")
      .single();

    if (articleError) {
      console.error("article upsert error:", articleError);
      return NextResponse.json({ error: articleError.message }, { status: 500 });
    }

    await supabase
      .from("videos")
      .update({
        status: transcript ? "summarizing" : "pending",
        updated_at: new Date().toISOString(),
      })
      .eq("id", videoId);

    return NextResponse.json({
      articleId: article?.id ?? null,
      message: transcript ? "文字起こし完了。要約・画像生成は未実装です。" : "記事レコードを作成しました。",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
