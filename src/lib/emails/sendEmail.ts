import nodemailer from "nodemailer";
import { render, pretty } from "@react-email/render";
import VerificationEmailTemplate from "@/lib/emails/templates/verificationEmailTemplate";
import ForgotPasswordEmailTemplate from "@/lib/emails/templates/forgotpasswordEmailTemplate";


interface emailProps {
    email : string;
    name : string;
    resetPasswordLink? : string;
    verifyCode? : string
    subject : string;
    template : "verifyEmail" | "resetPassword"
}


export const sendEmail = async ({email, name, resetPasswordLink, template, subject, verifyCode} : emailProps) => {
    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            secure: false,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD
            }
        });

        let emailHtml;

        if (template === "resetPassword") {
            emailHtml = await pretty(await render(ForgotPasswordEmailTemplate({ name, resetPasswordLink })));
        }
        else {
            emailHtml = await pretty(await render(VerificationEmailTemplate({ name, verifyCode })));
        }

        await transporter.sendMail({
            from: `"Clash" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: subject,
            html : emailHtml
        });

        return { success: true, message: "Email sent successfully." };
    }
    catch (error) {
        return { success: false, message: "Failed to send Email" };
    }
}