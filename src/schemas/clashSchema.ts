import { z } from "zod";


export const clashSchema = z.object({
    title : z
        .string({ message: "Title is required" })
        .min(3, { message: "Title must be of atleast 3 characters" })
        .max(30, { message: "Title must be of atmost 30 characters" }),
    description : z
        .string()
        .max(500, { message: "Description must be of atmost 500 characters" }),
    image : z.string().optional(),
    expiredAt : z.date().nonoptional({message : "Expiry date is required"})
});