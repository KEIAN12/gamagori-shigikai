#!/bin/sh
# プレビュー用: 依存関係インストール後に開発サーバーを起動
cd "$(dirname "$0")/.."
if [ ! -d node_modules ]; then
  echo "依存関係をインストールしています..."
  npm install
fi
echo "開発サーバーを起動します。ブラウザで http://localhost:3000 を開いてください。"
npm run dev
