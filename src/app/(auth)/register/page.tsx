"use client";

import { Eye, EyeOff, User, Mail, Lock, Sparkles, Check, X, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useDebounceValue } from "usehooks-ts";
import { useRouter } from "next/navigation";

import { registerSchema } from "@/schemas/authSchema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";


export default function Register() {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [usernameMessage, setUsernameMessage] = useState('');
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);

    const router = useRouter();


    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirm_password: "",
        },
        mode: "onChange"
    });


    const password = form.watch("password");
    const confirm_password = form.watch("confirm_password");
    const passwordsMatch = password && confirm_password && password === confirm_password;

    const username = form.watch("username");

    const [debouncedUsername] = useDebounceValue(username, 300);

    useEffect(() => {

        const checkUsernameUnique = async () => {
            if (debouncedUsername) {
                setIsCheckingUsername(true);
                setUsernameMessage('');
                const response = await axios.get(`/api/check-username-unique?username=${debouncedUsername}`);
                setUsernameMessage(response.data.message);
                setIsCheckingUsername(false);
            }
            else {
                setUsernameMessage('');
                setIsCheckingUsername(false);
            }
        }

        checkUsernameUnique();

    }, [debouncedUsername]);


    const onSubmit = async (data: z.infer<typeof registerSchema>) => {
        try {
            setIsLoading(true);

            const response = await axios.post("/api/register", data);

            toast(response.data.message);

            if (response.data.success) {
                router.replace(`/verify/${data.username}`);
            }
        }
        catch (error) {
            toast("There was a problem with your sign-up. Please try again.");
        }
        finally {
            setIsLoading(false);
        }
    };

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
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Join the Community</h2>
                        <p className="text-gray-600">Create your account to get started</p>
                    </div>

                    <div className="px-8 pb-8">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">

                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-semibold text-gray-700">Username</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                    <Input
                                                        {...field}
                                                        placeholder="Enter your username"
                                                        className="pl-11 h-12 bg-gray-50/50 border-gray-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl transition-all duration-200 hover:bg-gray-50"
                                                    />
                                                </div>
                                            </FormControl>
                                            {isCheckingUsername && <Loader2 className="animate-spin" />}
                                            {
                                                !isCheckingUsername && usernameMessage && (
                                                    <p className={`text-sm ${usernameMessage === 'Username is available' ? 'text-green-500' : 'text-red-500'}`}
                                                    >
                                                        {usernameMessage}
                                                    </p>
                                                )
                                            }
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-semibold text-gray-700">Email</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                    <Input
                                                        {...field}
                                                        type="email"
                                                        placeholder="Enter your email"
                                                        className="pl-11 h-12 bg-gray-50/50 border-gray-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl transition-all duration-200 hover:bg-gray-50"
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-semibold text-gray-700">Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                    <Input
                                                        {...field}
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="Create a strong password"
                                                        className="pl-11 pr-11 h-12 bg-gray-50/50 border-gray-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl transition-all duration-200 hover:bg-gray-50"
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
                                                        placeholder="Confirm your password"
                                                        className={`pl-11 pr-11 h-12 bg-gray-50/50 border-gray-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl transition-all duration-200 hover:bg-gray-50 ${form.formState.errors.confirm_password ? 'border-red-300 focus:border-red-400 focus:ring-red-400' : ''
                                                            }`}
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
                                            {
                                                confirm_password && !form.formState.errors.confirm_password && (
                                                    <div className={`flex items-center gap-2 text-xs ${passwordsMatch ? 'text-green-600' : 'text-red-600'
                                                        }`}>
                                                        {
                                                            passwordsMatch ? (
                                                                <>
                                                                    <Check className="w-4 h-4" />
                                                                    <span>Passwords match</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <X className="w-4 h-4" />
                                                                    <span>Passwords don't match</span>
                                                                </>
                                                            )
                                                        }
                                                    </div>
                                                )
                                            }
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
                                                Creating account...
                                            </div>
                                        ) : (
                                            "Create Account"
                                        )
                                    }
                                </Button>
                            </form>
                        </Form>

                        <div className="text-center mt-3 pt-6 border-t border-gray-100">
                            <p className="text-gray-600">
                                Already have an account?{" "}
                                <a
                                    href="/login"
                                    className="font-semibold text-purple-600 hover:text-purple-700 transition-colors hover:underline"
                                >
                                    Sign in
                                </a>
                            </p>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}