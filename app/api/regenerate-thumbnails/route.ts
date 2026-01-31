import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { generateAndUploadThumbnail } from "@/lib/infographic";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

/**
 * 既存記事のサムネイルを再生成するAPI
 * POST /api/regenerate-thumbnails
 * Body: { articleId?: string } - 指定がなければ全記事
 */
export async function POST(request: NextRequest) {
  // 認証チェック
  const authHeader = request.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  const isLocalhost = request.headers.get("host")?.includes("localhost");
  if (secret && !isLocalhost && authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { articleId } = body as { articleId?: string };

    const supabase = createServerClient();

    // 対象記事を取得
    let query = supabase
      .from("articles")
      .select("id, title, summary, thumbnail_url")
      .not("summary", "is", null);

    if (articleId) {
      query = query.eq("id", articleId);
    } else {
      // サムネイルがない記事のみ
      query = query.is("thumbnail_url", null);
    }

    const { data: articles, error } = await query.limit(10);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!articles || articles.length === 0) {
      return NextResponse.json({ message: "対象記事がありません", count: 0 });
    }

    const results = [];

    for (const article of articles) {
      try {
        const thumbnailUrl = await generateAndUploadThumbnail(
          article.id,
          article.title || "",
          article.summary || ""
        );

        if (thumbnailUrl) {
          await supabase
            .from("articles")
            .update({ thumbnail_url: thumbnailUrl, updated_at: new Date().toISOString() })
            .eq("id", article.id);

          results.push({ id: article.id, success: true, thumbnailUrl });
        } else {
          results.push({ id: article.id, success: false, error: "生成失敗" });
        }
      } catch (err) {
        results.push({ id: article.id, success: false, error: String(err) });
      }
    }

    return NextResponse.json({
      message: "サムネイル再生成完了",
      count: results.filter((r) => r.success).length,
      results,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
