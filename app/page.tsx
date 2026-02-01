import { HomePageContent } from "@/components/HomePageContent";
import { getArticlesForPublic } from "@/lib/articles";

const MAX_HOME_ARTICLES = 5;

interface PageProps {
  searchParams: { q?: string; session_type?: string; tag?: string };
}

export default async function HomePage({ searchParams }: PageProps) {
  const params = searchParams;
  const allArticles = await getArticlesForPublic({
    q: params.q,
    session_type: params.session_type,
    tag: params.tag,
  });

  // Show all when searching, otherwise show latest 5
  const isSearching = !!(params.q || params.session_type || params.tag);
  const articles = isSearching ? allArticles : allArticles.slice(0, MAX_HOME_ARTICLES);
  const hasMore = !isSearching && allArticles.length > MAX_HOME_ARTICLES;

  const featuredArticle = articles[0];
  const restArticles = articles.slice(1);

  return (
    <HomePageContent
      articles={articles}
      featuredArticle={featuredArticle}
      restArticles={restArticles}
      hasMore={hasMore}
      isSearching={isSearching}
      searchQuery={params.q}
      sessionType={params.session_type}
    />
  );
}
