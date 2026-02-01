import { notFound } from "next/navigation";
import { getArticleById } from "@/lib/articles";
import { ArticleDetail } from "@/components/ArticleDetail";
import { ArticlePageHeader } from "@/components/ArticlePageHeader";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) notFound();

  const video = article.video as { title?: string; published_at?: string } | null;
  const title = article.title || video?.title || "";
  const date = video?.published_at ?? article.processed_at;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
      <div className="space-y-6">
        <ArticlePageHeader
          title={title}
          sessionType={article.session_type}
          date={date}
        />
        <ArticleDetail article={article} />
      </div>
    </div>
  );
}
