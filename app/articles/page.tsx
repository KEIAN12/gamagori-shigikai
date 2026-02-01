import { ArticlesPageContent } from "@/components/ArticlesPageContent";
import { getArticlesForPublic } from "@/lib/articles";

interface PageProps {
  searchParams: { q?: string; session_type?: string; tag?: string };
}

export default async function ArticlesPage({ searchParams }: PageProps) {
  const params = searchParams;
  const articles = await getArticlesForPublic({
    q: params.q,
    session_type: params.session_type,
    tag: params.tag,
  });

  const isSearching = !!(params.q || params.session_type || params.tag);

  return (
    <ArticlesPageContent
      articles={articles}
      isSearching={isSearching}
    />
  );
}
