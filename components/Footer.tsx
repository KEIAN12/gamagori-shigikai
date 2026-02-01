"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-gray-100 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-lg">
                蒲
              </div>
              <div>
                <div className="font-bold text-gray-900">{t.footer.brand}</div>
                <div className="text-xs text-gray-500">{t.footer.brandSub}</div>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">{t.footer.links}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://www.city.gamagori.lg.jp/site/gikai/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-orange-600 transition-colors">
                  {t.footer.officialSite}
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/channel/UC7cv9y-qnun3BtLKrX5aoAw" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-orange-600 transition-colors">
                  {t.footer.youtubeChannel}
                </a>
              </li>
              <li>
                <a href="https://www.city.gamagori.lg.jp/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-orange-600 transition-colors">
                  {t.footer.cityHall}
                </a>
              </li>
            </ul>
          </div>

          {/* Site Info */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">{t.footer.siteInfo}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/terms" className="text-gray-600 hover:text-orange-600 transition-colors">
                  {t.footer.terms}
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-600 hover:text-orange-600 transition-colors">
                  {t.footer.privacy}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-amber-800">{t.footer.warning}</p>
              <p className="text-sm text-amber-700 mt-1">
                {t.footer.warningText}
                <a href="https://www.city.gamagori.lg.jp/site/gikai/" target="_blank" rel="noopener noreferrer" className="underline font-medium hover:text-amber-900">
                  {t.footer.warningLink}
                </a>
                {t.footer.warningTextEnd}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100 text-center text-sm text-gray-500">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
