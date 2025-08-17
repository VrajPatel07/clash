import { emailQueue, emailQueueName } from "@/jobs/emailQueue";
import { db } from "@/lib/db";
import { v4 as uuidV4 } from "uuid";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        const user = await db.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            return Response.json({ message: "No user found with this email." }, { status: 404 });
        }

        const token = uuidV4();

        const expiryDate = new Date();
        expiryDate.setMinutes(expiryDate.getMinutes() + 10);

        await db.user.update({
            where: {
                email
            },
            data: {
                resetPassworkToken: token,
                resetPasswordExpiry: expiryDate
            }
        });

        const resetPasswordLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

        try {
            await emailQueue.add(emailQueueName, {
                email,
                username : user.username,
                resetPasswordLink,
                template: "resetPassword",
                subject: "Reset your password"
            });
        }
        catch (error) {
            console.error('Failed to queue Reset password email:', error);
        }

        return Response.json({ message: "Email sent successfully" }, { status: 200 });
    }
    catch (error) {
        return Response.json({ message: "Error while forgot password" }, { status: 500 });
    }
}