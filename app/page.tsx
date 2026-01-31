import Link from "next/link";
import { SearchAndFilter } from "@/components/SearchAndFilter";
import { ArticleCard } from "@/components/ArticleCard";
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

  // 検索時は全件表示、通常時は最新5件
  const isSearching = !!(params.q || params.session_type || params.tag);
  const articles = isSearching ? allArticles : allArticles.slice(0, MAX_HOME_ARTICLES);
  const hasMore = !isSearching && allArticles.length > MAX_HOME_ARTICLES;

  const featuredArticle = articles[0];
  const restArticles = articles.slice(1);

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400">
        <div className="absolute inset-0 bg-white/10" />

        <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24 relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white/90 text-sm mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              新着動画を自動で更新中
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              市議会を<span className="text-yellow-200">もっと身近に。</span>
            </h1>

            <p className="text-lg text-white font-medium leading-relaxed mb-8">
              難しい議会の話を、AIがわかりやすい記事に。<br className="hidden sm:block" />
              蒲郡市の「今」がわかる、市民のためのメディアです。
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-white text-sm font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                YouTube動画を自動取得
              </div>
              <div className="flex items-center gap-2 text-white text-sm font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                AIが文字起こし
              </div>
              <div className="flex items-center gap-2 text-white text-sm font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                インフォグラフィック生成
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto fill-white">
            <path d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 -mt-8 relative z-10 mb-20">
        <SearchAndFilter />
      </div>

      <div className="container mx-auto max-w-6xl px-4 pb-24">
        <section>
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {params.q || params.session_type ? "検索結果" : "最新の記事"}
              </h2>
              <p className="text-gray-500 mt-2">
                {articles.length}件の記事が見つかりました
              </p>
            </div>
          </div>

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
                検索条件に一致する記事が見つかりませんでした。<br />
                新しい動画がアップロードされると、自動的に記事が追加されます。
              </p>
            </div>
          ) : (
            <>
              {featuredArticle && !params.q && !params.session_type && (
                <div className="mb-8">
                  <ArticleCard article={featuredArticle} featured />
                </div>
              )}

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {(isSearching ? articles : restArticles).map((article, index) => (
                  <div
                    key={article.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ArticleCard article={article} />
                  </div>
                ))}
              </div>

              {hasMore && (
                <div className="mt-12 text-center">
                  <Link
                    href="/articles"
                    className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-colors duration-300 shadow-lg shadow-orange-500/20"
                  >
                    すべての記事を見る
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              )}
            </>
          )}
        </section>

        <section className="mt-32 relative">
          {/* 背景装飾 */}
          <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 to-white -skew-y-3 transform origin-top-left -z-10 scale-110" />
          
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 text-sm font-bold mb-4">
              AI TECHNOLOGY
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              AIが議会をわかりやすく
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              最新のAI技術を活用して、難しい議会情報を<br className="hidden sm:block" />
              誰にでもわかりやすい形でお届けします
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-100 border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-16 h-16 mb-6 rounded-2xl bg-red-50 flex items-center justify-center text-red-500">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <div className="text-sm font-bold text-red-500 mb-2 tracking-wider">STEP 1</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">動画を自動取得</h3>
              <p className="text-gray-600 leading-relaxed">
                蒲郡市議会のYouTubeチャンネルから、新着動画を自動で検知して取得します。
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-100 border border-gray-100 hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                AI Powered
              </div>
              <div className="w-16 h-16 mb-6 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="text-sm font-bold text-blue-500 mb-2 tracking-wider">STEP 2</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AIが分析・要約</h3>
              <p className="text-gray-600 leading-relaxed">
                Gemini AIが音声を高精度に文字起こしし、要点を抽出してわかりやすい記事に変換します。
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-100 border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-16 h-16 mb-6 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-sm font-bold text-orange-500 mb-2 tracking-wider">STEP 3</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">図解で見える化</h3>
              <p className="text-gray-600 leading-relaxed">
                議論の構造や対立点をインフォグラフィックにして、ひと目でわかるように可視化します。
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
