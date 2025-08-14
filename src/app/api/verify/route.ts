import { db } from "@/lib/db";


export async function POST (req : Request) {
    try {
        const {username, code} = await req.json();

        const user = await db.user.findFirst({
            where : {
                username
            }
        });

        if (!user) {
            return Response.json({success : false, message : "User not found"}, {status : 404});
        }

        // Check if the code is correct and not expired
        const isCodeValid = user.verifyCode === code;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry!) > new Date();

        if (isCodeValid && isCodeNotExpired) {
            
            await db.user.update({
                where : {
                    username
                },
                data : {
                    isVerified : true
                }
            });

            return Response.json({success : true, message : "Account verified successfully"}, {status : 200});
        }
        else if (!isCodeNotExpired) {
            return Response.json({success : false, message : "Verification code has expired. Please sign up again to get a new code."}, {status : 400});
        }
        else {
            return Response.json({success : false, message : "Incorrect verification code"}, {status : 400});
        }
    }
    catch (error) {
        return Response.json({success : false, message : `Error while verifying user : ${error}`}, {status : 500});
    }
}