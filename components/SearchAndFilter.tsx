"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { AVAILABLE_TAGS } from "@/lib/summarize";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const SESSION_OPTIONS = [
  { value: "", labelKey: "all" as const, icon: "M4 6h16M4 12h16M4 18h16" },
  { value: "regular", labelKey: "regular" as const, icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { value: "extraordinary", labelKey: "extraordinary" as const, icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  { value: "committee", labelKey: "committee" as const, icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
];

export function SearchAndFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const [sessionType, setSessionType] = useState(searchParams.get("session_type") ?? "");
  const currentTag = searchParams.get("tag") ?? "";
  const { t } = useLanguage();

  const apply = useCallback(() => {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (sessionType) params.set("session_type", sessionType);
    if (currentTag) params.set("tag", currentTag);
    router.push(`/?${params.toString()}`);
  }, [router, q, sessionType, currentTag]);

  const setTag = (tag: string) => {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (sessionType) params.set("session_type", sessionType);
    if (tag) params.set("tag", tag);
    router.push(`/?${params.toString()}`);
  };

  // Get translated tag label
  const getTagLabel = (tagId: string): string => {
    return t.tags[tagId as keyof typeof t.tags] || tagId;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
      {/* Search input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg className="h-5 w-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && apply()}
          placeholder={t.search.placeholder}
          className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange-500 rounded-xl text-gray-900 placeholder-gray-400 outline-none transition-all duration-300 shadow-inner"
        />
        <button
          onClick={apply}
          className="absolute right-2 top-2 bottom-2 bg-orange-500 hover:bg-orange-600 text-white px-6 rounded-lg font-bold transition-colors duration-300 hidden md:block"
        >
          {t.search.button}
        </button>
      </div>

      {/* Filter buttons */}
      <div className="mt-6 flex flex-wrap gap-3">
        {SESSION_OPTIONS.map((opt) => (
          <button
            key={opt.value || "all"}
            type="button"
            onClick={() => {
              setSessionType(opt.value);
              const params = new URLSearchParams();
              if (q.trim()) params.set("q", q.trim());
              if (opt.value) params.set("session_type", opt.value);
              router.push(`/?${params.toString()}`);
            }}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all duration-300 border-2 ${
              sessionType === opt.value
                ? "bg-orange-50 border-orange-500 text-orange-700 shadow-md shadow-orange-500/10"
                : "bg-white border-gray-100 text-gray-500 hover:border-orange-200 hover:text-orange-600 hover:bg-orange-50/50"
            }`}
          >
            <svg className={`h-4 w-4 ${sessionType === opt.value ? "text-orange-500" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={opt.icon} />
            </svg>
            {t.session[opt.labelKey]}
          </button>
        ))}
      </div>

      {/* Tag filter */}
      <div className="mt-4">
        <div className="text-xs font-medium text-gray-500 mb-2">{t.search.filterByTopic}</div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setTag("")}
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-all duration-300 ${
              !currentTag
                ? "bg-gray-800 text-white"
                : "bg-white/80 text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {t.search.all}
          </button>
          {AVAILABLE_TAGS.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => setTag(tag.id)}
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-all duration-300 ${
                currentTag === tag.id
                  ? "bg-gray-800 text-white"
                  : "bg-white/80 text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <span>{tag.icon}</span>
              {getTagLabel(tag.id)}
            </button>
          ))}
        </div>
      </div>

      {/* Search button (mobile) */}
      <button
        type="button"
        onClick={apply}
        className="btn-primary w-full mt-4 md:hidden"
      >
        <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {t.search.button}
      </button>
    </div>
  );
}
