import Link from "next/link";
import type { ArticleWithVideo } from "@/types";

const SESSION_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  regular: { label: "定例会", color: "text-blue-700", bg: "bg-blue-100" },
  extraordinary: { label: "臨時会", color: "text-purple-700", bg: "bg-purple-100" },
  committee: { label: "委員会", color: "text-green-700", bg: "bg-green-100" },
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

function getReadingTime(text: string | null): string {
  if (!text) return "1分";
  const charCount = text.length;
  const minutes = Math.max(1, Math.ceil(charCount / 600));
  return `${minutes}分`;
}

// デフォルトのプレースホルダーサムネイル（画像がない場合）
function DefaultThumbnail({ sessionType }: { sessionType: string | null }) {
  const colors = {
    regular: "from-blue-100 to-sky-50",
    extraordinary: "from-purple-100 to-violet-50",
    committee: "from-emerald-100 to-teal-50",
    default: "from-orange-100 to-amber-50",
  };
  const bg = colors[sessionType as keyof typeof colors] || colors.default;

  return (
    <div className={`w-full h-full bg-gradient-to-br ${bg} flex items-center justify-center`}>
      <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    </div>
  );
}

export function ArticleCard({ article, featured = false }: { article: ArticleWithVideo; featured?: boolean }) {
  const video = article.video as { title?: string; published_at?: string; youtube_video_id?: string } | null;
  const title = article.title || video?.title || "（タイトルなし）";
  const date = video?.published_at ?? article.processed_at;
  const sessionConfig = SESSION_CONFIG[article.session_type ?? ""] ?? { label: "議会", color: "text-gray-700", bg: "bg-gray-100" };

  // サムネイルURL（優先順位: thumbnail_url > YouTubeサムネイル）
  const thumbnailUrl = (article as { thumbnail_url?: string | null }).thumbnail_url || (video?.youtube_video_id
    ? `https://img.youtube.com/vi/${video.youtube_video_id}/maxresdefault.jpg`
    : null);

  if (featured) {
    return (
      <Link href={`/articles/${article.id}`} className="group block">
        <article className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="grid md:grid-cols-2 gap-0">
            {/* サムネイル */}
            <div className="relative aspect-video md:aspect-auto overflow-hidden">
              {thumbnailUrl ? (
                <img
                  src={thumbnailUrl}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <DefaultThumbnail sessionType={article.session_type} />
              )}
              {article.infographic_url && (
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    図解あり
                  </span>
                </div>
              )}
            </div>

            {/* コンテンツ */}
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className={`${sessionConfig.bg} ${sessionConfig.color} text-xs font-semibold px-3 py-1 rounded-full`}>
                  {sessionConfig.label}
                </span>
                <span className="text-xs text-gray-400">
                  {formatDate(date)}
                </span>
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                {title}
              </h2>

              {article.summary && (
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                  {article.summary}
                </p>
              )}

              <div className="flex items-center gap-4 mt-auto">
                <span className="inline-flex items-center gap-1 text-xs text-gray-800 font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  約{getReadingTime(article.summary)}で読める
                </span>
                <span className="inline-flex items-center text-orange-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                  記事を読む
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/articles/${article.id}`} className="group block h-full">
      <article className="h-full flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        {/* サムネイル */}
        <div className="relative aspect-video overflow-hidden shrink-0">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt=""
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <DefaultThumbnail sessionType={article.session_type} />
          )}

          {/* バッジ */}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className={`${sessionConfig.bg} ${sessionConfig.color} text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md shadow-sm`}>
              {sessionConfig.label}
            </span>
            {article.infographic_url && (
              <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                図解
              </span>
            )}
          </div>
        </div>

        {/* コンテンツ */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-3 font-medium">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(date)}
          </div>

          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors mb-3 leading-snug">
            {title}
          </h3>

          {article.summary && (
            <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-4 flex-grow">
              {article.summary}
            </p>
          )}

          <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
            <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              約{getReadingTime(article.summary)}で読める
            </span>
            <span className="text-sm font-bold text-orange-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              読む
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
