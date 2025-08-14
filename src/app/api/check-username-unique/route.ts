import { db } from "@/lib/db";
import { z } from "zod";


const usernameQuerySchema = z.object({
    username: z.string({ message: "Name is required" }).min(3, { message: "Name must be of atleast 3 characters." })
});


export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const queryParam = { username: searchParams.get("username") };

        const result = usernameQuerySchema.safeParse(queryParam);

        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || [];

            return Response.json({ success: false, message: usernameErrors?.length > 0 ? usernameErrors.join(", ") : "Invalid query parameters" }, { status: 400 });
        }

        const { username } = result.data;

        const existingVerifiedUser = await db.user.findFirst({
            where: {
                username: username,
                isVerified: true
            }
        });

        if (existingVerifiedUser) {
            return Response.json({ success: false, message: "Username is already taken" }, { status: 400 });
        }

        return Response.json({ success: true, message: "Username is available" }, { status: 200 });
    }
    catch (error) {
        return Response.json({ success: false, message: `Error while checking username : ${error}` }, { status: 500 })
    }
}