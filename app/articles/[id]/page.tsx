import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticleById } from "@/lib/articles";
import { ArticleDetail } from "@/components/ArticleDetail";

const SESSION_LABEL: Record<string, string> = {
  regular: "定例会",
  extraordinary: "臨時会",
  committee: "委員会",
};

function formatDate(iso: string | null) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "—";
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) notFound();

  const video = article.video as { title?: string; published_at?: string } | null;
  // 記事のタイトル（AIが生成）を優先、なければ動画タイトルを使用
  const title = article.title || video?.title || "（タイトルなし）";

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
      <div className="space-y-6">
        <div>
          <Link
            href="/"
            className="text-sm font-medium text-orange-600 hover:text-orange-700"
          >
            ← 記事一覧へ
          </Link>
          <span className="inline-block mt-3 rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800">
            {SESSION_LABEL[article.session_type ?? ""] ?? "—"}
          </span>
          <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">{title}</h1>
          <p className="mt-2 text-gray-600">{formatDate(video?.published_at ?? article.processed_at)}</p>
        </div>

        <ArticleDetail article={article} />
      </div>
    </div>
  );
}
