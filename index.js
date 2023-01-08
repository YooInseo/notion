import express from "express";
import http from "http";
import serveStatic from "serve-static";
import path from "path";
const __dirname = path.resolve();
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import bodyParser from "body-parser";

import query from "./public/data/mysql.js";
import {sendMail} from "./public/login/email/email.js";

const connection = query.connect(); // MYSQL Connect
const app = express(); // express Server


app.set("port", 3000);

//Add Middle ware 
app.use(serveStatic(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
 
app.post("/login", (req, res) => {
  let email = req.body.adress;

  if(query.insert(connection, email)){ // Check Email is valid email 
    sendMail(email);
  } else{
    console.log("이메일아님");
  }

  res.end();
});

// cookie and session assign middleWare
app.use(cookieParser());

// Session Setting
app.use(
  expressSession({
    secret: "my key",
    resave: true,
    saveUninitialized: true,
  })
);

app.get("/process/example", (req, res) => {
  if (req.session.user) {
    //If user is exist in session
    res.redirect("/example.html");  
  } else {
    res.redirect("/login.html");  
  }
});


const appServer = http.createServer(app);

appServer.listen(app.get("port"), () => {
  console.log(`${app.get("port")}에서 서버실행중.`);
});