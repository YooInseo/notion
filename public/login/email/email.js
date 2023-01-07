import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { uuidv4 } from "../code/generate.js";
// import { connect } from "../data/mysql.js";

dotenv.config();

export function sendMail(to){

  let code = uuidv4();
    console.log(process.env.EMAIL)
      let email = process.env.EMAIL;
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: email, pass: process.env.EMAIL_PASSWORD},
      });
      let mailOptions = {
        from: email,
        to: to,
        subject:"임시 Notion 코드는 " + code + "입니다.",
        text:"임시 코드는 " + code + "입니다."
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
}
export default {sendMail};