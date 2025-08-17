"use client";

import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Trophy, LogOut, ChevronDown, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";


export default function Navbar() {

    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);

    const handleSignOut = async () => {
        setIsLoading(true);
        await signOut();
        setIsLoading(false);
    };

    const handleSignIn = async () => {
        setIsLoading(true);
        await signIn();
        setIsLoading(false);
    };

    if (!session?.user) {
        return null;
    }

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-purple-200/50 shadow-lg">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">

                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-105">
                        <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-black bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
                            Clash
                        </h1>
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                            <Zap className="w-3 h-3 text-white" />
                        </div>
                    </div>
                </Link>

                <div className="flex items-center gap-4">
                    {
                        !session.user ? (
                            <div className="w-8 h-8 border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                        ) : session?.user ? (
                            <DropdownMenu>

                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="flex items-center gap-3 h-12 px-4 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 rounded-xl transition-all duration-200 group"
                                    >
                                        <Avatar className="w-8 h-8 border-2 border-purple-200 group-hover:border-purple-300 transition-colors duration-200">
                                            <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-semibold">
                                                {session?.user.username?.charAt(0).toUpperCase() || "U"}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="hidden md:flex flex-col items-start">
                                            <span className="text-sm font-semibold text-gray-800 group-hover:text-purple-700 transition-colors duration-200">
                                                {session.user.username || "User"}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {session.user.email}
                                            </span>
                                        </div>
                                        <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors duration-200" />
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent
                                    align="end"
                                    className="w-56 bg-white/95 backdrop-blur-xl border border-purple-200/50 shadow-2xl rounded-xl overflow-hidden mt-2"
                                >
                                    <div className="px-4 py-3 bg-gradient-to-r from-purple-50/50 to-pink-50/50">
                                        <p className="text-sm font-semibold text-gray-800">{session.user.name}</p>
                                        <p className="text-xs text-gray-600 truncate">{session.user.email}</p>
                                    </div>

                                    <DropdownMenuSeparator className="bg-purple-200/50" />

                                    <DropdownMenuItem
                                        onClick={handleSignOut}
                                        disabled={isLoading}
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-200 cursor-pointer group"
                                    >
                                        <LogOut className="w-4 h-4 text-red-500 group-hover:text-red-600" />
                                        <span className="font-medium text-gray-700 group-hover:text-red-700">
                                            {isLoading ? "Signing out..." : "Sign Out"}
                                        </span>
                                    </DropdownMenuItem>

                                </DropdownMenuContent>

                            </DropdownMenu>
                        ) : (
                            <Button
                                onClick={handleSignIn}
                                disabled={isLoading}
                                className="h-10 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {
                                    isLoading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Signing in...
                                        </div>
                                    ) : (
                                        <>
                                            Sign In
                                        </>
                                    )
                                }
                            </Button>
                        )
                    }
                </div>
            </div>
        </nav>
    );
}