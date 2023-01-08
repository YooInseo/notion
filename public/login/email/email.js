import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { uuidv4 } from "../code/generate.js";

dotenv.config();
/**
 * This function use module nodemailer
 * Generate random code and send email for login
 * 
 * @param {*} to Input value to send email 
 */
export function sendMail(to){

  let code = uuidv4();
  let email = process.env.EMAIL;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: email, pass: process.env.EMAIL_PASSWORD},
  });

  let text = `임시 코드는 ${code} 입니다.`;

  let mailOptions = {
    from: email,
    to: to,
    subject: text,
    text: text 
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