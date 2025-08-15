"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

import { verifySchema } from '@/schemas/authSchema';

import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from 'sonner';



export default function Verify() {

    const router = useRouter();

    const params = useParams<{ username : string }>();

    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
        defaultValues: {
            code: ""
        }
    });


    const submitHandler = async (data: z.infer<typeof verifySchema>) => {
        try {
            const response = await axios.post(`/api/verify`, {
                username: params.username,
                code: data.code
            });

            if (response.status === 200) {
                toast(response.data.message);
                router.replace('/login');
            }
        }
        catch (error : any) {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            }
        } 
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">

                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6"> Verify Your Account </h1>
                    <p className="mb-4 text-gray-600"> Enter the verification code sent to your email </p>
                    <p className="text-sm text-gray-500"> We sent a 6-digit code to verify your account </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-6">

                        <FormField
                            name="code"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="flex flex-col items-center space-y-4">
                                    <FormLabel className="text-center">Verification Code</FormLabel>
                                    <InputOTP 
                                        maxLength={6} 
                                        {...field}
                                        className="flex justify-center"
                                    >
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <div className="space-y-4">
                            <Button 
                                type="submit" 
                                className="w-full cursor-pointer"
                                disabled={form.watch("code").length !== 6}
                            >
                                Verify Account
                            </Button>
                        </div>

                    </form>
                </Form>

            </div>
        </div>
    );
}