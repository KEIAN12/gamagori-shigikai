import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";

const GA_ID = "G-WMZPR1V8EN";

export const metadata: Metadata = {
  title: "蒲郡市議会AIウォッチ | 市民のための議会情報メディア",
  description:
    "愛知県蒲郡市議会をAIがわかりやすく解説。動画の自動文字起こし・要約・インフォグラフィックで、議会がもっと身近に。",
  openGraph: {
    title: "蒲郡市議会AIウォッチ",
    description: "AIが届ける、やさしい議会ニュース",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="min-h-screen flex flex-col font-sans overflow-x-hidden">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        {/* 背景パターン */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-orange-100/50 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-amber-100/40 to-transparent rounded-full blur-3xl" />
        </div>

        <Header />

        <main className="flex-1">
          {children}
        </main>

        <footer className="border-t border-gray-100 bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-12 max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8">
              {/* ブランド */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-lg">
                    蒲
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">蒲郡市議会AIウォッチ</div>
                    <div className="text-xs text-gray-500">Gamagori City Council Watch</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  AIが議会動画を自動で分析。難しい議会の話を、市民のみなさんにわかりやすくお届けします。
                </p>
              </div>

              {/* リンク */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">関連リンク</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="https://www.city.gamagori.lg.jp/site/gikai/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-orange-600 transition-colors">
                      蒲郡市議会 公式サイト
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/channel/UC7cv9y-qnun3BtLKrX5aoAw" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-orange-600 transition-colors">
                      蒲郡市議会 YouTube
                    </a>
                  </li>
                  <li>
                    <a href="https://www.city.gamagori.lg.jp/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-orange-600 transition-colors">
                      蒲郡市役所
                    </a>
                  </li>
                </ul>
              </div>

              {/* サイト情報 */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">サイト情報</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="/terms" className="text-gray-600 hover:text-orange-600 transition-colors">
                      利用規約・免責事項
                    </a>
                  </li>
                  <li>
                    <a href="/privacy" className="text-gray-600 hover:text-orange-600 transition-colors">
                      プライバシーポリシー
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* 免責事項 */}
            <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-amber-800">ご注意ください</p>
                  <p className="text-sm text-amber-700 mt-1">
                    本サイトは蒲郡市議会の公式記録ではありません。AIによる自動生成のため、内容に誤りが含まれる可能性があります。正確な情報は<a href="https://www.city.gamagori.lg.jp/site/gikai/" target="_blank" rel="noopener noreferrer" className="underline font-medium hover:text-amber-900">蒲郡市議会公式サイト</a>をご確認ください。
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 text-center text-sm text-gray-500">
              <p>© 2026 蒲郡市議会AIウォッチ - Powered by CONTE inc.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
