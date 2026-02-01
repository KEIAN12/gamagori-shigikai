"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import type { ArticleWithVideo } from "@/types";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function ArticleDetail({ article }: { article: ArticleWithVideo }) {
  const { t } = useLanguage();

  const TABS = [
    {
      id: "summary",
      label: t.detail.summary,
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      description: t.detail.summaryDesc
    },
    {
      id: "transcript",
      label: t.detail.transcript,
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      description: t.detail.transcriptDesc
    },
  ] as const;

  const [active, setActive] = useState<"summary" | "transcript">("summary");
  const video = article.video as { youtube_video_id?: string; title?: string } | null;

  return (
    <div className="space-y-6">
      {/* Infographic (displayed at top) */}
      {article.infographic_url && (
        <div className="glass rounded-2xl overflow-hidden p-4 md:p-6">
          <div className="flex justify-center">
            <img
              src={article.infographic_url}
              alt={t.detail.infographicAlt}
              className="max-w-full h-auto rounded-xl shadow-lg"
            />
          </div>
        </div>
      )}

      {/* Original video info */}
      {video?.youtube_video_id && (
        <div className="glass rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 mb-1">{t.detail.originalVideo}</p>
              <p className="text-sm font-medium text-gray-900 line-clamp-2">
                {video.title || t.detail.unknownTitle}
              </p>
              <a
                href={`https://www.youtube.com/watch?v=${video.youtube_video_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-2 text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                {t.detail.watchOnYoutube}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Tab content */}
      <div className="glass rounded-2xl overflow-hidden">
        {/* Tab header */}
        <div className="flex border-b border-gray-200/50">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-all duration-300 relative ${
                active === tab.id
                  ? "text-orange-600 bg-orange-50/50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50/50"
              }`}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
              </svg>
              <span>{tab.label}</span>
              {active === tab.id && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="p-6 md:p-8">
          {active === "summary" && (
            <div className="animate-fade-in">
              {article.summary ? (
                <div className="article-content">
                  <ReactMarkdown
                    components={{
                      h2: ({ children }) => (
                        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4 pb-3 border-b-2 border-orange-300 flex items-center gap-2">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-3 pl-3 border-l-4 border-orange-400">
                          {children}
                        </h3>
                      ),
                      p: ({ children }) => (
                        <p className="text-gray-700 leading-relaxed mb-6 text-base">
                          {children}
                        </p>
                      ),
                      ul: ({ children }) => (
                        <ul className="my-6 space-y-3 bg-orange-50 rounded-xl p-5">
                          {children}
                        </ul>
                      ),
                      li: ({ children }) => (
                        <li className="text-gray-700 leading-relaxed flex items-start gap-2">
                          <span className="text-orange-500 mt-1">●</span>
                          <span>{children}</span>
                        </li>
                      ),
                      strong: ({ children }) => (
                        <strong className="text-orange-600 font-semibold">{children}</strong>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="my-6 pl-4 border-l-4 border-gray-300 bg-gray-50 py-4 pr-4 rounded-r-lg italic text-gray-600">
                          {children}
                        </blockquote>
                      ),
                    }}
                  >
                    {article.summary}
                  </ReactMarkdown>
                </div>
              ) : (
                <EmptyState
                  icon="M13 10V3L4 14h7v7l9-11h-7z"
                  title={t.detail.noSummary}
                  description={t.detail.noSummaryDesc}
                />
              )}
            </div>
          )}

          {active === "transcript" && (
            <div className="animate-fade-in">
              {article.transcript ? (
                <div className="prose prose-gray max-w-none">
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-sm bg-gray-50 rounded-xl p-6">
                    {article.transcript}
                  </div>
                </div>
              ) : (
                <EmptyState
                  icon="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  title={t.detail.noTranscript}
                  description={t.detail.noTranscriptDesc}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 mb-4">
        <svg className="h-8 w-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
