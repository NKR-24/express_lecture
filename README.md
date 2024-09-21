# express_lecture



## セットアップ

1. Node.js がインストールされているか確認します  
  ```sh
  node -v
  ```

2. 結果は ```v18.xx.x``` になります  
   Node.js がインストールされていない場合は、[インストールしてください](https://qiita.com/echolimitless/items/83f8658cf855de04b9ce)。 
  
3. インストール
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
