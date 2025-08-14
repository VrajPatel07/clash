import nodemailer from "nodemailer";
import { render, pretty } from "@react-email/render";
import VerificationEmailTemplate from "@/lib/emails/templates/verificationEmailTemplate";


export const sendVerificationEmail = async (email: string, name : string, verificationLink : string) => {
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
        const emailHtml = await pretty(await render(VerificationEmailTemplate({ name, verificationLink })));

        await transporter.sendMail({
            from: `"Clash" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: "Verify your email",
            html : emailHtml
        });

        return { success: true, message: "Verification email sent successfully." };
    }
    catch (error) {
        return { success: false, message: "Failed to send verification email" };
    }
}