import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") ?? "";

    let query = supabase
      .from("videos")
      .select("id, youtube_video_id, title, status, published_at")
      .order("published_at", { ascending: false });

    if (status) {
      const statuses = status.split(",").map((s) => s.trim()).filter(Boolean);
      if (statuses.length > 0) {
        query = query.in("status", statuses);
      }
    }

    const { data, error } = await query;

    if (error) {
      console.error("videos GET error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ videos: data ?? [] });
  } catch (err) {
    if (err instanceof Error && err.message.includes("Missing")) {
      return NextResponse.json({ videos: [] });
    }
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST() {
  try {
    const supabase = createServerClient();
    const channelId = process.env.YOUTUBE_CHANNEL_ID ?? "";
    if (!channelId) {
      return NextResponse.json(
        { error: "YOUTUBE_CHANNEL_ID が設定されていません" },
        { status: 500 }
      );
    }
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "YOUTUBE_API_KEY が設定されていません" },
        { status: 500 }
      );
    }

    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=20&order=date&type=video&key=${apiKey}`
    );
    const json = await res.json();
    if (json.error) {
      return NextResponse.json(
        { error: json.error.message ?? "YouTube API エラー" },
        { status: 502 }
      );
    }

    const items = json.items ?? [];
    for (const item of items) {
      const videoId = item.id?.videoId;
      if (!videoId) continue;
      const title = item.snippet?.title ?? "";
      const publishedAt = item.snippet?.publishedAt ?? new Date().toISOString();
      await supabase.from("videos").upsert(
        {
          youtube_video_id: videoId,
          title,
          published_at: publishedAt,
          status: "pending",
          updated_at: new Date().toISOString(),
        },
        { onConflict: "youtube_video_id", ignoreDuplicates: true }
      );
    }

    return NextResponse.json({
      message: "新着取得を実行しました。既存の動画はスキップされています。",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
