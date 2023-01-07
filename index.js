import express from "express";
import http from "http";
import serveStatic from "serve-static";
import path from "path";
const __dirname = path.resolve();
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import bodyParser from "body-parser";

import connect from "./public/data/mysql.js";
import email, {sendMail} from "./public/login/email/email.js";

const app = express(); // express Server

app.set("port", 3000);

// 미들웨어를 등록한다
app.use(serveStatic(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.post("/login", (req, res) => {
  let email = req.body.adress;

  sendMail(email);

  res.redirect("/login");
  res.end();
});

// cookie and session assign middleWare
app.use(cookieParser());

// 세션세팅
app.use(
  expressSession({
    secret: "my key",
    resave: true,
    saveUninitialized: true,
  })
);

app.get("/process/example", (req, res) => {
  if (req.session.user) {
    // 세션에 유저가 존재한다면
    res.redirect("/example.html"); // 예시로
  } else {
    res.redirect("/login.html"); // fhrmdlsdmfh
  }
});

const appServer = http.createServer(app);

appServer.listen(app.get("port"), () => {
  console.log(`${app.get("port")}에서 서버실행중.`);
  connect.connect();
});