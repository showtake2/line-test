"use strict";

require("dotenv").config();

// ライブラリのインポート。
const express = require("express");
const app = express();
const line_login = require("line-login");
const session = require("express-session");
const session_options = {
    secret: process.env.LINE_LOGIN_CHANNEL_SECRET, // 任意の秘密鍵を設定
    resave: false,
    saveUninitialized: false
}
app.use(session(session_options));

// 認証の設定。
const login = new line_login({
    channel_id: process.env.LINE_LOGIN_CHANNEL_ID,
    channel_secret: process.env.LINE_LOGIN_CHANNEL_SECRET,
    callback_url: process.env.LINE_LOGIN_CALLBACK_URL
});

// サーバー起動設定。
app.listen(process.env.PORT || 5000, () => {
    console.log(`server is listening to ${process.env.PORT || 5000}...`);
});

// 認証フローを開始するためのルーター設定。
app.get("/auth", async (req, res) => {
    try {
        // 認証フローを開始するコード
        // 何らかのエラーが発生した場合、login.auth() でエラーがスローされる
        await login.auth();

        // 認証フロー成功時の処理 (エラーが発生しなかった場合)
        res.json({ success: true });
    } catch (error) {
        // エラーメッセージをコンソール上に表示
        console.error(error.message);

        // エラーが捕捉された場合、エラーメッセージをクライアントに返す
        res.status(400).json({ error: error.message });
    }
});

// ユーザーが承認したあとに実行する処理のためのルーター設定。
app.get("/callback", login.callback(
    (req, res, next, token_response) => {
        // 認証フロー成功時
        res.json(token_response);
    },(req, res, next, error) => {
        // 認証フロー失敗時
        res.status(400).json(error);
    }
));
