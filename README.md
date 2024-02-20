# express_lecture

## セットアップ
1. 以下のリポジトリをクローンします
```sh
cd 任意のディレクトリ
git clone https://github.com/kento-nkr/express_lecture
```
3. プログラムのあるディレクトリを開きます  
```sh
cd express_lecture
```
5. Node.js がインストールされているか確認します  
```sh
node -v
```
結果は ```v18.xx.x``` になります  
Node.js がインストールされていない場合は、[インストールしてください](https://qiita.com/echolimitless/items/83f8658cf855de04b9ce)。  
7. 依存ファイルをインストールします  
`npm install` を実行します

## テスト実行  
1. 現在のディレクトリを確認します  
`pwd`  
-> 結果は `任意のディレクトリ/express_lecture` になります  
もし /express_lecture にいない場合は、移動してください。
2. サーバーを実行します  
```sh
node src/app.js
```  
4. サーバーにリクエストを送信します  
ウェブブラウザを開き、`http://localhost:3000`へアクセスする

## src/app.js の読み込み
> - `src/app.js` を開きます  
> - このファイルは Express サーバーのメインコードです  
> - ドキュメント文字列やコメントを読んで、フローを理解します  


## 練習
> [!IMPORTANT]
> 練習の解答をgithubにpushしないでください

## 練習 1
- `/hello` エンドポイントを追加します（GET メソッド）
- このエンドポイントは単純なテキスト "hello" を返します。
- このエンドポイントは、サーバーコンソールに `requested from ${ipaddr}` を表示します。  

> [!TIP]
> クライアントの IP アドレスは `req` に保存されています。
> `ipaddr` を定義する必要があります。 `const ipaddr = ?????`

## 練習 2
- JSON データを送受信します。
- `/status` エンドポイントを追加します（POST メソッド）
- このエンドポイントはステータスコードのみを返します。
- テストリクエスト(`src/test_post.js`)は `{value: 100}` を送信します。  
- もし `req.body.value` > 100 なら、サーバーはステータスコード 200 を返します。
- そうでない場合は、サーバーはステータスコード 400 を返します。
> [!NOTE]
> サーバーが正しく動作しているかを確認するには、`src/test_post.js` を使用します。
