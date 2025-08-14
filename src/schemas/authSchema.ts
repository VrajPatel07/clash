import { z } from "zod";



export const registerSchema = z.object({
    name : z.string({ message: "Name is required" }).min(3, { message: "Name must be of atleast 3 characters." }),
    email : z.string({ message: "Email is required." }).email({ message: "Please enter correct email" }),
    password : z.string({ message: "Password is required" }).min(8, { message: "Password must be of atleast 8 characters." }),
    confirm_password : z.string({ message: "Confirm Password is required" })
});



export const loginSchema = z.object({
    email : z.string({ message: "Email is required." }).email({ message: "Please enter correct email" }),
    password : z.string({ message: "Password is required" }),
});


export const verifySchema = z.object({
    code : z.string({message : "Verify code is required"}).length(6, {message : "Verify code must be of 6 characters"})
})



export const forgotPasswordSchema = z.object({
    email : z.email({ message: "Please enter correct email" })
});


export const resetPasswordSchema = z.object({
    email : z.string({ message: "Email is required." }).email({ message: "Please enter correct email" }),
    token : z.string({ message: "Please make sure you are using correct url." }),
    password : z.string({ message: "Password is required" }).min(6, { message: "Password must be of atleast 8 characters." }),
    confirm_password : z.string({ message: "Confirm Password is required" })
})
