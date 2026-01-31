import Link from "next/link";
import { SearchAndFilter } from "@/components/SearchAndFilter";
import { ArticleCard } from "@/components/ArticleCard";
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium mb-4 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            トップへ戻る
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            記事一覧
          </h1>
          <p className="text-white/80 mt-2">
            蒲郡市議会の議事内容をAIがわかりやすく解説した記事の一覧です
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* 検索・フィルター */}
        <div className="mb-8">
          <SearchAndFilter />
        </div>

        {/* 記事数 */}
        <div className="mb-6">
          <p className="text-gray-600">
            {params.q || params.session_type || params.tag ? "検索結果: " : ""}
            <span className="font-bold text-gray-900">{articles.length}件</span>の記事
          </p>
        </div>

        {/* 記事リスト */}
        {articles.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-orange-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              記事がありません
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              検索条件に一致する記事が見つかりませんでした。
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <div
                key={article.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
