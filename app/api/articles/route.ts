import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import type { ArticleWithVideo } from "@/types";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim().slice(0, 200) ?? "";
    const sessionType = searchParams.get("session_type") ?? "";

    let query = supabase
      .from("articles")
      .select(
        "id, video_id, title, transcript, summary, infographic_url, thumbnail_url, session_type, processed_at, video:videos!video_id(id, youtube_video_id, title, published_at, status)"
      )
      .order("processed_at", { ascending: false });

    if (sessionType && ["regular", "extraordinary", "committee"].includes(sessionType)) {
      query = query.eq("session_type", sessionType);
    }

    if (q) {
      query = query.or(`summary.ilike.%${q}%,transcript.ilike.%${q}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error("articles fetch error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const rows = (data ?? []) as Array<Record<string, unknown> & { video?: unknown }>;

    const articles: ArticleWithVideo[] = rows
      .filter((row) => {
        const video = row.video;
        return video && typeof video === "object" && (video as { status?: string }).status === "done";
      })
      .map((row) => ({
        id: row.id,
        video_id: row.video_id,
        title: row.title,
        transcript: row.transcript,
        summary: row.summary,
        infographic_url: row.infographic_url,
        thumbnail_url: row.thumbnail_url,
        session_type: row.session_type,
        processed_at: row.processed_at,
        video: row.video,
      })) as ArticleWithVideo[];

    return NextResponse.json({ articles });
  } catch (err) {
    if (err instanceof Error && err.message.includes("Missing")) {
      return NextResponse.json({ articles: [] });
    }
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
