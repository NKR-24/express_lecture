# express_lecture

## 概要
- Express.jsを用いたOAuth認証のサンプルコード
- Google OAuthを用いて認証を行う
- ユーザー情報(profile)を取得する
- クライアント側では，Cookieを用いてログイン状態を保持する
  - 保存するログイン情報は，access_tokenではなく，JWTを用いる


## セットアップ

1. Node.js がインストールされているか確認します  
  ```sh
  node -v
  ```

2. 結果は ```v18.xx.x``` になります  
   Node.js がインストールされていない場合は、[インストールしてください](https://qiita.com/echolimitless/items/83f8658cf855de04b9ce)。 
  
3. ライブラリのインストール
  ```sh
  cd 任意のディレクトリ
  git clone https://github.com/kento-nkr/express_lecture
  cd express_lecture
  npm install
  ```

4. .envファイルを作成し，内容を記述
  ```sh
  touch .env
  ```
  ```sh
  # .env
  GOOGLE_CLIENT_ID=GCPコンソールで取得
  GOOGLE_CLIENT_SECRET=GCPコンソールで取得
  SECRET_KEY=任意の文字列
  ```

5. サーバーを起動
```sh
node app.js
```  

6. OAuth認証
  ウェブブラウザを開き、[http://localhost:3000/auth/google](http://localhost:3000/auth/google)へアクセス

## 自分のサーバーにOAuth認証を設定する方法
1. コンソールの設定は上記を参照

2. ライブラリのインストール
   ```sh
    npm install axios cookie-parser cors dotenv express express-session jsonwebtoken passport passport-google-oauth20 request uuid
   ```

3. 以下のファイルを追加
   - .env
   - src/auth.js
   - src/auth_routes.js
   - src/passport_setup.js

4. app.pyに以下を追加
    <details>
    <summary>コードを表示</summary>

    ```js
    require("dotenv").config();
    const express = require("express");
    const bodyParser = require("body-parser");
    const cookieParser = require("cookie-parser");
    const session = require("express-session");
    const passport = require("./src/passport_setup");
    const verifyToken = require("./src/auth");
    const authRoutes = require("./src/auth_routes");

    const SERVER_PORT = process.env.SERVER_PORT || 3000;
    const BINDING_PORT = "0.0.0.0";
    const APP = express();

    APP.use(bodyParser.json());

    // Add the cookieParser and session middleware
    APP.use(cookieParser());
    APP.use(
      session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: process.env.NODE_ENV === "production" },
      })
    );
    APP.use(passport.initialize());
    APP.use(passport.session());

    APP.use("/auth", authRoutes);
    ```

    </details>

5. auth保護したいエンドポイントに，verifyTokenをミドルウェアとして追加
    <details>
    <summary>コードを表示</summary>

    ```js
    APP.get("/profile", verifyToken, (req, res) => {
      res.status(200).send(`Hello, ${req.user.id}, this is the profile route!`);
    });
    ```
    - getやpostの第二引数にverifyTokenを追加することで，認証を行うことができる
    </details>

## OAuthを用いてユーザー情報を取得する方法
- 現在は[user.idを取得している](https://github.com/NKR-24/express_lecture/blob/9ace666083ece7b544df032508048d98a5da02cd/src/auth_routes.js#L19)が，他の情報も取得することができる
- まず，GCPのコンソールで，OAuthのスコープを設定することで，取得できる情報を変更することができる
- メールアドレスやユーザー名，国籍やプロフィール写真などが取得できる
