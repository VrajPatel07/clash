import nodemailer from "nodemailer";
import { render, pretty } from "@react-email/render";
import ForgotPasswordEmailTemplate from "@/lib/emails/templates/forgotPasswordEmailTemplate";


export const sendForgotpasswordEmail = async (email: string, name : string, forgotpasswordLink : string) => {
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

        // Render the React email template to HTML
        const emailHtml = await pretty(await render(ForgotPasswordEmailTemplate({ name, forgotpasswordLink })));

        await transporter.sendMail({
            from: `"Clash" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: "Reset your password",
            html : emailHtml
        });

        return { success: true, message: "Forgot password email sent successfully." };
    }
    catch (error) {
        return { success: false, message: "Failed to send Forgot password email" };
    }
}