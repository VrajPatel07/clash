import { auth } from "@/auth";
import {db} from "@/lib/db";


export async function POST (req : Request) {
    try {
        const {title, description, image, expiredAt} = await req.json();

        const session = await auth();

        await db.clash.create({
            data : {
                userId : session?.user.id as string,
                title,
                description,
                image,
                expiredAt : new Date(expiredAt)
            }
        });

        return Response.json({message : "Clash created successfully"}, {status : 200});
    }
    catch (error) {
        return Response.json({message : "Error while creating clash"}, {status : 500});
    }
}



export async function GET (req : Request) {
    try {
        const session = await auth();

        const clash = await db.clash.findMany({
            where : {
                userId : session?.user.id
            }
        });

        if (!clash) {
            return Response.json({message : "Clash not found"}, {status : 404});
        }

        return Response.json({message : "Clash created successfully", data : clash}, {status : 200});
    }
    catch (error) {
        return Response.json({message : "Error while creating clash"}, {status : 500});
    }
}