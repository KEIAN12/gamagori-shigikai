import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { summarizeTranscript } from "@/lib/summarize";
import { generateAndUploadInfographic, generateAndUploadThumbnail } from "@/lib/infographic";
import { getCouncilMemberNames } from "@/lib/council-members";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

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
    const { data: video, error: fetchError } = await supabase
      .from("videos")
      .select("id, status")
      .eq("id", videoId)
      .single();

    if (fetchError || !video) {
      return NextResponse.json({ error: "動画が見つかりません" }, { status: 404 });
    }

    const currentStatus = video.status as string;
    if (currentStatus === "done") {
      return NextResponse.json({ message: "すでに処理済みです" });
    }

    const base =
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : process.env.NEXT_PUBLIC_VERCEL_URL
          ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
          : "http://localhost:3000";

    await supabase
      .from("videos")
      .update({ status: "transcribing", updated_at: new Date().toISOString() })
      .eq("id", videoId);

    const secret = process.env.CRON_SECRET;
    const transcribeRes = await fetch(`${base}/api/transcribe/${videoId}`, {
      method: "POST",
      headers: secret ? { Authorization: `Bearer ${secret}` } : {},
    });
    if (!transcribeRes.ok) {
      await supabase
        .from("videos")
        .update({ status: "error", updated_at: new Date().toISOString() })
        .eq("id", videoId);
      const err = await transcribeRes.json();
      return NextResponse.json(
        { error: err.error ?? "文字起こしに失敗しました" },
        { status: 502 }
      );
    }

    const { articleId } = await transcribeRes.json();
    if (!articleId) {
      return NextResponse.json(
        { error: "記事の作成に失敗しました" },
        { status: 502 }
      );
    }

    const { data: article } = await supabase
      .from("articles")
      .select("id, transcript, summary")
      .eq("id", articleId)
      .single();

    if (!article) {
      return NextResponse.json({ error: "記事が見つかりません" }, { status: 502 });
    }

    const transcript = (article.transcript as string) ?? "";
    let summary = (article.summary as string) ?? "";
    let title = "";
    let sessionType: string | null = null;
    let tags: string[] = [];

    if (transcript.trim()) {
      await supabase
        .from("videos")
        .update({ status: "summarizing", updated_at: new Date().toISOString() })
        .eq("id", videoId);

      try {
        const councilNames = await getCouncilMemberNames();
        const result = await summarizeTranscript(transcript, {
          councilMemberNames: councilNames,
        });
        summary = result.summary;
        title = result.title;
        sessionType = result.sessionType;
        tags = result.tags;
      } catch (sumErr) {
        console.error("summarize error:", sumErr);
      }

      await supabase
        .from("articles")
        .update({
          title: title || null,
          summary: summary || null,
          session_type: sessionType,
          tags: tags.length > 0 ? tags : null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", articleId);
    }

    await supabase
      .from("videos")
      .update({ status: "generating_image", updated_at: new Date().toISOString() })
      .eq("id", videoId);

    let infographicUrl: string | null = null;
    let thumbnailUrl: string | null = null;

    if (summary || title) {
      // サムネイルとインフォグラフィックを並行生成
      const [thumbnail, infographic] = await Promise.all([
        generateAndUploadThumbnail(articleId, title, summary),
        summary ? generateAndUploadInfographic(articleId, summary) : Promise.resolve(null),
      ]);

      thumbnailUrl = thumbnail;
      infographicUrl = infographic;

      await supabase
        .from("articles")
        .update({
          thumbnail_url: thumbnailUrl,
          infographic_url: infographicUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", articleId);
    }

    const now = new Date().toISOString();
    await supabase
      .from("articles")
      .update({ processed_at: now, updated_at: now })
      .eq("id", articleId);
    await supabase
      .from("videos")
      .update({ status: "done", updated_at: now })
      .eq("id", videoId);

    return NextResponse.json({
      message: "処理が完了しました",
      articleId,
      summary: !!summary,
      thumbnail: !!thumbnailUrl,
      infographic: !!infographicUrl,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
