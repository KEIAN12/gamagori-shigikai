"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-lg shadow-sm border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto max-w-6xl flex h-16 items-center justify-between px-4">
        <Link href="/" className="group flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="relative flex-shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg shadow-orange-500/20 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
              蒲
            </div>
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm sm:text-lg font-bold text-gray-900 whitespace-nowrap">
              {t.siteName}
            </span>
            <span className="text-[9px] sm:text-[10px] text-gray-400 tracking-wider hidden sm:block">
              {t.siteSubtitle}
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
          <Link
            href="/"
            className="px-2.5 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-600 rounded-full hover:bg-orange-50 hover:text-orange-600 transition-all"
          >
            {t.nav.home}
          </Link>
          <Link
            href="/articles"
            className="px-2.5 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-600 rounded-full hover:bg-orange-50 hover:text-orange-600 transition-all"
          >
            {t.nav.articles}
          </Link>
          <a
            href="https://www.youtube.com/channel/UC7cv9y-qnun3BtLKrX5aoAw"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-600 rounded-full hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            {t.nav.youtube}
          </a>
          <div className="ml-1 sm:ml-2">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}
