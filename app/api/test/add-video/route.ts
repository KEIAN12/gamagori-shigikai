import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/**
 * テスト用: YouTube動画IDを指定して動画を追加するエンドポイント
 * POST /api/test/add-video
 * Body: { youtubeVideoId: string, title: string, publishedAt?: string }
 */
export async function POST(request: NextRequest) {
  // 認証チェック（CRON_SECRET または localhost のみ許可）
  const authHeader = request.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  const isLocalhost = request.headers.get("host")?.includes("localhost");
  if (secret && !isLocalhost && authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { youtubeVideoId, title, publishedAt } = body;

    if (!youtubeVideoId || !title) {
      return NextResponse.json(
        { error: "youtubeVideoId と title が必要です" },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    const { data, error } = await supabase
      .from("videos")
      .upsert(
        {
          youtube_video_id: youtubeVideoId,
          title,
          published_at: publishedAt ?? new Date().toISOString(),
          status: "pending",
          updated_at: new Date().toISOString(),
        },
        { onConflict: "youtube_video_id" }
      )
      .select("id, youtube_video_id, title, status")
      .single();

    if (error) {
      console.error("video insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: "動画を追加しました",
      video: data,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
