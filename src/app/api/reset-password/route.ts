import { db } from "@/lib/db";
import bcrypt from "bcryptjs";


export async function PUT (req : Request) {
    try {
        const {password, confirm_password, email, token} = await req.json();

        const user = await db.user.findUnique({
            where : {
                email
            }
        });

        if (!user) {
            return Response.json({message : "User not found"}, {status : 404});
        }

        if (password !== confirm_password) {
            return Response.json({message : "Passwords do not match"}, {status : 400});
        }

        const isTokenExpired = new Date(user.resetPasswordExpiry!) <= new Date();

        if (isTokenExpired) {
            return Response.json({message : "Token is expired"}, {status : 400});
        }

        if (token !== user.resetPassworkToken) {
            return Response.json({message : "Invalid token"}, {status : 400});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.user.update({
            where : {
                email
            },
            data : {
                password : hashedPassword,
                resetPassworkToken : undefined,
                resetPasswordExpiry : undefined
            }
        });

        return Response.json({message : "Password reset successfully"}, {status : 200});
    }
    catch (error) {
        return Response.json({message : "Error while reseting password"}, {status : 500})
    }
}