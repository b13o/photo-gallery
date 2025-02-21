<img width="1440" alt="app-banner" src="https://github.com/user-attachments/assets/ba02a49c-8b16-491b-99a2-ce35d502fd14" />

# フォトギャラリーアプリ

## 概要

このプロジェクトでは、高画質なフリー画像検索アプリを構築します。

Unsplash API を使用し、特定のトピックに関連する画像一覧を表示します。

## 学習目標

Suspense, Error Boundaries を使用した、宣言的な非同期処理の記述を学習します。

合わせて、React 18 で追加された useTransition や useDeferredValue の使用方法について確認してください。

### 推奨技術

このプロジェクトの難易度と趣旨を踏まえて、以下の使用をお勧めします。

- Vite を用いた React 環境構築
- TypeScript による型チェック
- Tailwind CSS を用いたスタイリング
- shadcn/ui によるコンポーネントの導入
- Unsplash API を用いた画像取得

---

## 🎯 お題

- 「ユーザーストーリー」を全て満たす、アプリを構築してください。
- 必要に応じて、スクリーンショットやデモサイトの URL を、参照してください。
- なお、スタイルは、あなた自身で独自にカスタマイズすることが可能です。

### 必須機能

1. **画像一覧表示**：
   - Unsplash API から取得した画像を表示
   - Suspense, Error Boundaries を使用した適切な取得状態の表示
2. **画像検索**：
   - キーワードによる画像検索機能
   - 検索体験の最適化(useDeferredValue)
3. **画像詳細モーダル**：
   - 画像クリック時に詳細情報をモーダルで表示
   - transition を使用したモーダルの読み込み

### 追加情報

今回推奨する API は、「[Unsplash API](https://unsplash.com/developers)」です。

- この API は、高品質は画像のコレクションにアクセスできます。
- アカウント登録と、アクセスキーの発行が必要ですが、無料で使用できます
- なお、開発時のレート制限は、１時間あたり 50 リクエストまでです。[ref](https://unsplash.com/documentation#:~:text=rate%2Dlimited%20to%2050%20requests%20per%20hour.%20)

## ユーザーストーリー

- [ ] ユーザーがサイトにアクセスすると、Unsplash からの厳選された画像一覧が表示される
- [ ] 画像は読み込み中には、ローディング UI が表示される
- [ ] ヘッダーに、検索バーが表示されている
- [ ] 検索バーに文字を入力すると、その内容に関連する画像が表示される
- [ ] 検索中は、２文字目以降の入力では、古いデータを点滅させて読み込み中であることを視覚的に表す
- [ ] 画像をクリックすると、モーダルウィンドウが開き、詳細情報が表示される
- [ ] モーダル内では、次の情報が確認できる：
  - 画像/ 撮影者/ 撮影場所/ 説明文/ ダウンロード数/ いいね数/ 関連するタグ（複数）
- [ ] モーダル内の関連するタグをクリックすると、画像検索が行われる
- [ ] モーダルは画面外クリックや、「_X アイコン_」で閉じることができる
- [ ] エラーが発生した場合、適切なエラーメッセージが表示される

### その他

- RSC が使える場合は直接 async/await を使用することができます
- クライアントコンポーネントでは use API を使用することができます
- デモコードでは、Suspense の仕組みの基本概念を掴むため、`wrapPromise`を実装しています
