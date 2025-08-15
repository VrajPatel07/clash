import bcrypt from "bcryptjs";
import { z } from "zod";

import { registerSchema } from "@/schemas/authSchema";
import { db } from "@/lib/db";
import { emailQueue, emailQueueName } from "@/jobs/emailQueue";


export async function POST(req: Request) {
    try {
        const { username, email, password, confirm_password }: z.infer<typeof registerSchema> = await req.json();

        if (password !== confirm_password) {
            return Response.json({ success: false, message: "Passwords do not match" }, { status: 400 });
        }

        const existingVerifiedUserByUsername = await db.user.findFirst({
            where: {
                username,
                isVerified: true
            }
        });


        if (existingVerifiedUserByUsername) {
            return Response.json({ success: false, message: "Username is already taken" }, { status: 400 });
        }


        const existingUserByEmail = await db.user.findFirst({
            where: {
                email: email
            }
        });


        let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedPassword = await bcrypt.hash(password, 10);

        const expiryDate = new Date();
        expiryDate.setMinutes(expiryDate.getMinutes() + 10);


        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json({ success: false, message: "User already exists" }, { status: 400 });
            }
            else {
                await db.user.update({
                    where: {
                        email
                    },
                    data: {
                        username: username,
                        password: hashedPassword,
                        verifyCode: verifyCode,
                        verifyCodeExpiry: new Date(Date.now() + 600000)
                    }
                });
            }
        }
        else {
            await db.user.create({
                data: {
                    username,
                    email,
                    password: hashedPassword,
                    verifyCode,
                    verifyCodeExpiry: expiryDate,
                    isVerified: false
                }
            });
        }

        try {
            await emailQueue.add(emailQueueName, {
                email,
                username,
                verifyCode,
                template: "verifyEmail",
                subject: "Verify your account"
            });
        }
        catch (error) {
            console.error('Failed to queue verification email:', error);
        }

        return Response.json({ success: true, message: "User registered successfully. Please verify your account." }, { status: 200 });
    }
    catch (error) {
        return Response.json({ success: false, message: `Error while signup : ${error}` }, { status: 500 });
    }
}