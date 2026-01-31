import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

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
      <body className="min-h-screen flex flex-col font-sans">
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

              {/* 説明 */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">このサイトについて</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  本サイトは蒲郡市議会の公式記録ではありません。AIによる自動生成のため、内容の正確性は公式情報をご確認ください。
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100 text-center text-sm text-gray-500">
              <p>© 2024 蒲郡市議会AIウォッチ - Powered by AI</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
