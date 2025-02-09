// Packages
import nodemailer from "nodemailer";
import dotenv from "dotenv";


// Utils and services
import logger from "@services/logger";


// Configurations
dotenv.config();

// Mail Sender Function
const mailSender = async (email: string, title: string, body: string): Promise<any> => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER as string,
        pass: process.env.MAIL_PASS as string,
      },
    });

    const info = await transporter.sendMail({
      from: "Academia || Bhargav Tibadiya",
      to: email,
      subject: title,
      html: body,
    });

    logger.info("Email Sent:", info);
    return info;
  } catch (error: any) {
    logger.error("Error While Sending Verification Mail.", error.message);
    throw error;
  }
};


export default mailSender;
