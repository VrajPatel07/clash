import bcrypt from "bcryptjs";
import { z } from "zod";

import { registerSchema } from "@/schemas/authSchema";
import { db } from "@/lib/db";
import { emailQueue, emailQueueName } from "@/jobs/emailQueue";


export async function POST(req: Request) {
    try {
        const { username, email, password, confirm_password }: z.infer<typeof registerSchema> = await req.json();

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

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json({ success: false, message: "User already exists" }, { status: 400 });
            }
            else {
                if (password !== confirm_password) {
                    return Response.json({ success: false, message: "Passwords do not match" }, { status: 400 });
                }

                const hashedPassword = await bcrypt.hash(password, 10);

                await db.user.update({
                    where: {
                        email
                    },
                    data: {
                        password: hashedPassword,
                        verifyCode: verifyCode,
                        verifyCodeExpiry: new Date(Date.now() + 600000)
                    }
                });
            }
        }
        else {
            if (password !== confirm_password) {
                return Response.json({ success: false, message: "Passwords do not match" }, { status: 400 });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const expiryDate = new Date();

            expiryDate.setMinutes(expiryDate.getMinutes() + 10);

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

        
        await emailQueue.add(emailQueueName, {
            email,
            username,
            verifyCode,
            template: "verifyEmail",
            subject: "Verify your account"
        });

        return Response.json({ success: true, message: "User registered successfully. Please verify your account." }, { status: 200 });
    }
    catch (error) {
        return Response.json({ success: false, message: `Error while signup : ${error}` }, { status: 500 });
    }
}