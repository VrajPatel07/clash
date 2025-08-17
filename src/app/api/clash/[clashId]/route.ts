import { db } from "@/lib/db";


export async function GET(req : Request, {params} : {params : {clashId : string}}) {
    try {
        const { clashId } = await params;

        if (!clashId) {
            return Response.json({message : "Clash ID is missing"}, {status : 400});
        }

        const clash = await db.clash.findUnique({
            where : {
                id : clashId as string
            }
        });

        if (!clash) {
            return Response.json({message : "Clash not found"}, {status : 404});
        }

        return Response.json({message : "Clash fetched successfully", data : clash}, {status : 200});
    }
    catch (error) {
        return Response.json({message : "Error while fetching clash"}, {status : 500});
    }
}



export async function PUT (req : Request, {params} : {params: {clashId : string}}) {
    try {
        const {title, description, image, expiredAt} = await req.json();

        const { clashId } = await params;

        await db.clash.update({
            where : {
                id : clashId as string
            },
            data : {
                title,
                description,
                image,
                expiredAt : new Date(expiredAt)
            }
        });

        return Response.json({message : "Clash updated successfully"}, {status : 200});
    }
    catch (error) {
        return Response.json({message : "Error while updating clash"}, {status : 500});
    }
}



export async function DELETE (req : Request, {params} : {params: {clashId : string}}) {
    try {
        const { clashId } = await params;

        await db.clash.delete({
            where : {
                id : clashId as string
            }
        });

        return Response.json({message : "Clash deleted successfully"}, {status : 200});
    }
    catch (error) {
        return Response.json({message : "Error while deleting clash"}, {status : 500});
    }
}