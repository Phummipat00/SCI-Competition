import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { getVerificationEmailTemplate } from "./emailTemplate.js";

dotenv.config();
// create Gmail Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
   tls: {
    rejectUnauthorized: false, 
  },
});

//Verify SMTP Connection Configuration
transporter.verify(function (error, success) {
  if (error) {
    console.error("SMTP Connection Error", error);
  } else {
    console.log("SMTP Server is ready to sennd Email");
  }
});

//send verification email
//click แล้วสามารถไปได้เลย
export const sendVerificationEmail = async (email, token, userName) => {
  const verificationUrl = `${process.env.BASE_URL}/api/v1/auth/verify/${token}`;

  const mailOptions = {
    from: {
      name: "ระบบการแข่งขันวันวิทยาศาสตร์",
      email: process.env.EMAIL_FROM,
    },
    to: email,
    subject: "กรุณายืนยันอีเมลล์ของคุณ - ระบบการแข่งขันวันวิทยาศาสตร์",
    html: getVerificationEmailTemplate(verificationUrl, userName),
    text: `ยินดีต้อนรับเข้าสู่วันวิทยาศาสตร์!\n\nเรียน คุณ${userName}, \n\n ขอบคุณที่ลงทะเบียนเข้าร่วมระบบการแข่งขันทางวิทยาศาสตร์
    กรุณายืนยันอีเมลล์ของคุณที่ลิงก์ด้านล่าง \n\n ${verificationUrl} \n\n ลิงก์ยืนยันอีเมลนี้จะหมดอายุภายใน 24 ชั่วโมง หากคุณไม่ได้เป็นผู้ลงทะเบียน กรุณาละเว้นการคลิกลิงก์นี้ \n\n นี่เป็นข้อความอัตโนมัติ กรุณาอย่าตอบกลับอีเมลนี้ `,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully!");
    return info;
  } catch (error) {
    console.error("Error sending email", error);
  }
};