import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { summarizeTranscript } from "@/lib/summarize";
import { getCouncilMemberNames } from "@/lib/council-members";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function POST(request: NextRequest) {
  // 認証チェック
  const authHeader = request.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  const isLocalhost = request.headers.get("host")?.includes("localhost");
  if (secret && !isLocalhost && authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createServerClient();

    // transcriptがある全ての記事を取得
    const { data: articles, error: fetchError } = await supabase
      .from("articles")
      .select("id, transcript, video_id")
      .not("transcript", "is", null)
      .neq("transcript", "");

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    if (!articles || articles.length === 0) {
      return NextResponse.json({ message: "再生成する記事がありません" });
    }

    const councilNames = await getCouncilMemberNames();
    const results: { id: string; success: boolean; title?: string; tags?: string[] }[] = [];

    for (const article of articles) {
      try {
        const result = await summarizeTranscript(article.transcript as string, {
          councilMemberNames: councilNames,
        });

        await supabase
          .from("articles")
          .update({
            title: result.title || null,
            summary: result.summary || null,
            session_type: result.sessionType,
            tags: result.tags.length > 0 ? result.tags : null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", article.id);

        results.push({ id: article.id, success: true, title: result.title, tags: result.tags });
      } catch (err) {
        console.error(`Failed to regenerate article ${article.id}:`, err);
        results.push({ id: article.id, success: false });
      }
    }

    return NextResponse.json({
      message: `${results.filter((r) => r.success).length}/${articles.length} 件の記事を再生成しました`,
      results,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
