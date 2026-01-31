import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  if (secret && authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const base =
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : process.env.NEXT_PUBLIC_VERCEL_URL
          ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
          : "http://localhost:3000";

    const supabase = createServerClient();

    if (process.env.YOUTUBE_API_KEY && process.env.YOUTUBE_CHANNEL_ID) {
      const channelId = process.env.YOUTUBE_CHANNEL_ID;
      const apiKey = process.env.YOUTUBE_API_KEY;
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=10&order=date&type=video&key=${apiKey}`
      );
      const json = await res.json();
      const items = json.items ?? [];
      for (const item of items) {
        const videoId = item.id?.videoId;
        if (!videoId) continue;
        await supabase.from("videos").upsert(
          {
            youtube_video_id: videoId,
            title: item.snippet?.title ?? "",
            channel_id: channelId,
            published_at: item.snippet?.publishedAt ?? new Date().toISOString(),
            status: "pending",
            updated_at: new Date().toISOString(),
          },
          { onConflict: "youtube_video_id", ignoreDuplicates: true }
        );
      }
    }

    const { data: pending } = await supabase
      .from("videos")
      .select("id")
      .eq("status", "pending")
      .order("published_at", { ascending: false })
      .limit(1)
      .single();

    if (pending?.id) {
      const processRes = await fetch(`${base}/api/process/${pending.id}`, {
        method: "POST",
        headers: secret ? { Authorization: `Bearer ${secret}` } : {},
      });
      const body = await processRes.json();
      return NextResponse.json({
        message: "Cron 実行完了",
        fetched: true,
        processed: !!pending?.id,
        processResult: body,
      });
    }

    return NextResponse.json({
      message: "Cron 実行完了。処理待ち動画なし。",
      fetched: true,
      processed: false,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
