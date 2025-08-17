"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Sparkles, Trophy } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import AddClash from "@/components/clash/AddClash";
import ClashCard from "@/components/clash/ClashCard";


export default function Dashboard() {

    const [clashs, setClashs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();

    const {data : session} = useSession();

    useEffect(() => {

        const fetchClashs = async () => {
            try {
                const response = await axios.get("/api/clash");

                if (response.status === 200) {
                    setClashs(response.data.data);
                }
            }
            catch (error) {
                toast.error("Failed to fetch clashes");
            }
            finally {
                setIsLoading(false);
            }
        };
        
        fetchClashs();

    }, []);


    useEffect(() => {
        if (!session?.user) {
            router.push("/login");
        }
    }, []);
    

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 relative overflow-hidden">

            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-200"></div>
                <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-400"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">

                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-12">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-xl flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Start Something Amazing</h2>
                    </div>
                    <p className="text-gray-600 mb-6">Ready to ignite the competition? Create a new clash and let the battle begin!</p>
                    <div className="flex justify-center">
                        <AddClash />
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">

                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                            <Trophy className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Active Clashes</h2>
                        {
                            clashs.length > 0 && (
                                <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                                    {clashs.length} Active
                                </span>
                            )
                        }
                    </div>

                    {
                        isLoading ? (
                            <div className="flex flex-col items-center justify-center py-16">
                                <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
                                <p className="text-gray-600 font-medium">Loading clashes...</p>
                            </div>
                        ) : clashs.length > 0 ? (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {
                                    clashs.map((clash, index) => (
                                        <div key={index} className="transform hover:-translate-y-1 transition-all duration-200">
                                            <ClashCard clash={clash} />
                                        </div>
                                    ))
                                }
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Trophy className="w-12 h-12 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-700 mb-2">No Clashes Yet</h3>
                                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                                    Be the first to create an exciting clash! Click the button above to get started.
                                </p>
                                <div className="w-full max-w-xs mx-auto">
                                    <AddClash />
                                </div>
                            </div>
                        )
                    }
                </div>

            </div>

        </div>
    );
}