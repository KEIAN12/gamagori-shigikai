import { getServerClientOrNull, createServerClient } from "@/lib/supabase/server";
import type { ArticleWithVideo } from "@/types";

export async function getArticlesForPublic(options: {
  q?: string;
  session_type?: string;
  tag?: string;
}): Promise<ArticleWithVideo[]> {
  try {
    const supabase = getServerClientOrNull();
    if (!supabase) return [];
    let query = supabase
      .from("articles")
      .select(
        "id, video_id, title, transcript, summary, infographic_url, thumbnail_url, session_type, tags, processed_at, video:videos!video_id(id, youtube_video_id, title, published_at, status)"
      )
      .order("processed_at", { ascending: false }); // 後でvideo.published_atでソート

    if (
      options.session_type &&
      ["regular", "extraordinary", "committee"].includes(options.session_type)
    ) {
      query = query.eq("session_type", options.session_type);
    }

    if (options.tag?.trim()) {
      query = query.contains("tags", [options.tag.trim()]);
    }

    if (options.q?.trim()) {
      const q = options.q.trim().slice(0, 200);
      query = query.or(`summary.ilike.%${q}%,transcript.ilike.%${q}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error("getArticlesForPublic error:", error);
      return [];
    }

    const rows = (data ?? []) as Array<Record<string, unknown> & { video?: unknown }>;
    return rows
      .filter((row) => {
        const video = row.video;
        const hasValidVideo = video && typeof video === "object" && (video as { status?: string }).status === "done";
        const hasSummary = row.summary && typeof row.summary === "string" && row.summary.trim().length > 0;
        return hasValidVideo && hasSummary;
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
        tags: row.tags,
        processed_at: row.processed_at,
        video: row.video,
      }))
      .sort((a, b) => {
        const dateA = (a.video as { published_at?: string })?.published_at ?? "";
        const dateB = (b.video as { published_at?: string })?.published_at ?? "";
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      }) as ArticleWithVideo[];
  } catch (err) {
    if (err instanceof Error && err.message.includes("Missing")) return [];
    console.error(err);
    return [];
  }
}

export async function getArticleById(id: string): Promise<ArticleWithVideo | null> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("articles")
      .select(
        "id, video_id, title, transcript, summary, infographic_url, thumbnail_url, session_type, tags, processed_at, video:videos!video_id(id, youtube_video_id, title, published_at, status)"
      )
      .eq("id", id)
      .single();

    if (error || !data) return null;

    const row = data as Record<string, unknown> & { video?: unknown };
    const video = row.video;
    if (!video || typeof video !== "object" || (video as { status?: string }).status !== "done") {
      return null;
    }

    return {
      id: row.id,
      video_id: row.video_id,
      title: row.title,
      transcript: row.transcript,
      summary: row.summary,
      infographic_url: row.infographic_url,
      thumbnail_url: row.thumbnail_url,
      session_type: row.session_type,
      processed_at: row.processed_at,
      video,
    } as ArticleWithVideo;
  } catch (err) {
    if (err instanceof Error && err.message.includes("Missing")) return null;
    console.error(err);
    return null;
  }
}
