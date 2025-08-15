"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Eye, EyeOff, Lock, Mail, Sparkles, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { resetPasswordSchema } from '@/schemas/authSchema';




export default function ResetPassword() {

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const router = useRouter();

    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const { data: session } = useSession();


    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            email: "",
            token: token || "",
            password: "",
            confirm_password: "",
        },
        mode: "onChange"
    });

    useEffect(() => {
        if (!token) {
            toast.error('Invalid reset link');
            router.push('/forgot-password');
        }
        else {
            form.setValue('token', token);
        }
    }, [token, form, router]);


    useEffect(() => {
        if (session?.user?.email) {
            form.setValue("email", session.user.email);
        }
    }, [session, form]);


    const submitHandler = async (data: z.infer<typeof resetPasswordSchema>) => {
        try {
            setIsLoading(true);

            const response = await axios.put("/api/reset-password", data);

            if (response.status === 200) {
                toast.success(response.data.message);
                setIsSuccess(true);
            }
            else {
                toast.error(response.data.message);
            }
        }
        catch (error: any) {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            }
        }
        finally {
            setIsLoading(false);
        }
    };


    const handleBackToLogin = () => {
        router.push('/login');
    };


    if (isSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex justify-center items-center p-4">

                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                    <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-200"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-400"></div>
                </div>

                <div className="relative w-full max-w-md">
                    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">

                        <div className="px-8 pt-8 pb-6 text-center">
                            <div className="inline-flex items-center gap-2 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-xl flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                                <h1 className="text-4xl font-black bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
                                    Clash
                                </h1>
                            </div>

                            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Password Reset!</h2>
                            <p className="text-gray-600">Your password has been successfully updated.</p>
                        </div>

                        <div className="px-8 pb-8">
                            <div className="space-y-6">
                                <Button
                                    onClick={handleBackToLogin}
                                    className="w-full h-12 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                                >
                                    Continue to Login
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex justify-center items-center p-4">

            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-200"></div>
                <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-400"></div>
            </div>

            <div className="relative w-full max-w-md">
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">

                    <div className="px-8 pt-8 pb-6 text-center">
                        <div className="inline-flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-xl flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-4xl font-black bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
                                Clash
                            </h1>
                        </div>

                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Reset Password</h2>
                        <p className="text-gray-600">Enter your email and new password to reset your account.</p>
                    </div>

                    <div className="px-8 pb-8">
                        <Form {...form}>
                            <form className="space-y-6" onSubmit={form.handleSubmit(submitHandler)}>
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-semibold text-gray-700">New Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                    <Input
                                                        {...field}
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="Enter your new password"
                                                        className="pl-11 pr-11 h-12 bg-gray-50/50 border-gray-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl transition-all duration-200 hover:bg-gray-50"
                                                        autoComplete="new-password"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                                    >
                                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="confirm_password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-semibold text-gray-700">Confirm Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                    <Input
                                                        {...field}
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        placeholder="Confirm your new password"
                                                        className="pl-11 pr-11 h-12 bg-gray-50/50 border-gray-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl transition-all duration-200 hover:bg-gray-50"
                                                        autoComplete="new-password"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                                    >
                                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    disabled={isLoading || !form.formState.isValid}
                                    className="w-full h-12 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {
                                        isLoading ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                Resetting password...
                                            </div>
                                        ) : (
                                            'Reset Password'
                                        )
                                    }
                                </Button>
                            </form>
                        </Form>

                        <div className="text-center mt-6 pt-6 border-t border-gray-100">
                            <button
                                onClick={handleBackToLogin}
                                className="font-semibold text-purple-600 hover:text-purple-700 transition-colors hover:underline"
                            >
                                Back to login
                            </button>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    );
}