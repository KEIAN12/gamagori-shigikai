"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

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
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-orange-500/20 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
              蒲
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-900">
              蒲郡市議会AIウォッチ
            </span>
            <span className="text-[10px] text-gray-400 tracking-wider hidden sm:block">
              GAMAGORI CITY COUNCIL WATCH
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className="px-4 py-2 text-sm font-medium text-gray-600 rounded-full hover:bg-orange-50 hover:text-orange-600 transition-all"
          >
            ホーム
          </Link>
          <Link
            href="/articles"
            className="px-4 py-2 text-sm font-medium text-gray-600 rounded-full hover:bg-orange-50 hover:text-orange-600 transition-all"
          >
            記事一覧
          </Link>
          <a
            href="https://www.youtube.com/channel/UC7cv9y-qnun3BtLKrX5aoAw"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-600 rounded-full hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            YouTube
          </a>
        </nav>
      </div>
    </header>
  );
}
