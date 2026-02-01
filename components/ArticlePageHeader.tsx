"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { formatDate as formatDateByLang } from "@/lib/i18n/translations";

interface ArticlePageHeaderProps {
  title: string;
  sessionType: string | null;
  date: string | null;
}

export function ArticlePageHeader({ title, sessionType, date }: ArticlePageHeaderProps) {
  const { lang, t } = useLanguage();

  const sessionLabelMap: Record<string, string> = {
    regular: t.session.regular,
    extraordinary: t.session.extraordinary,
    committee: t.session.committee,
  };
  const sessionLabel = sessionLabelMap[sessionType ?? ""] ?? t.session.default;

  const formattedDate = formatDateByLang(date, lang);
  const displayTitle = title || t.articles.noTitle;

  return (
    <div>
      <Link
        href="/"
        className="text-sm font-medium text-orange-600 hover:text-orange-700"
      >
        ← {t.articlesPage.backToHome}
      </Link>
      <span className="inline-block mt-3 rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800">
        {sessionLabel}
      </span>
      <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">{displayTitle}</h1>
      <p className="mt-2 text-gray-600">{formattedDate}</p>
    </div>
  );
}
