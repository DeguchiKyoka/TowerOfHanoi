# ハノイの塔ゲーム

ReactとTailwind CSSを使用して作成されたハノイの塔ゲームです。

## 特徴

- 🎮 ドラッグ＆ドロップ操作で円盤を移動
- 📊 手数カウンター
- 🔄 リセット機能
- 🎉 ゲームクリア時のアニメーション効果
- 📱 レスポンシブデザイン対応
- 🎨 美しいUIデザイン

## 技術仕様

- **フレームワーク**: React 18.2.0
- **スタイル**: Tailwind CSS 3.4.17
- **言語**: TypeScript
- **ビルドツール**: Vite

## セットアップ

1. リポジトリをクローンします
```bash
git clone <repository-url>
cd TowerOfHanoi
```

2. 依存パッケージをインストールします
```bash
npm install
```

3. 開発サーバーを起動します
```bash
npm run dev
```

4. ブラウザで `http://localhost:5173` を開きます

## ゲームの遊び方

1. 円盤をドラッグして別の塔に移動させます
2. 一度に1枚の円盤しか動かせません
3. 大きい円盤の上に小さい円盤を置くことはできません
4. 目標はすべての円盤を右端の塔に移動させることです

## プロジェクト構造

```
TowerOfHanoi/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Disk.tsx           # 円盤コンポーネント
│   │   ├── Tower.tsx          # 塔コンポーネント
│   │   └── GameControls.tsx   # ゲーム制御コンポーネント
│   ├── hooks/
│   │   └── useTowerOfHanoi.ts # カスタムフック
│   ├── types/
│   │   └── game.ts            # 型定義
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

## コマンド

- `npm run dev` - 開発サーバー起動
- `npm run build` - プロダクションビルド
- `npm run preview` - ビルド結果のプレビュー
- `npm run lint` - ESLintによるコードチェック

## ライセンス

MIT