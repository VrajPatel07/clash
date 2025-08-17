"use client";

import { useState, Dispatch, SetStateAction } from "react";
import axios from "axios";
import { toast } from "sonner";


import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";



export default function DeleteClash({ deleteOpen, setDeleteOpen, clashId }: { deleteOpen: boolean, setDeleteOpen: Dispatch<SetStateAction<boolean>>, clashId: string }) {

    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        try {
            setLoading(true);

            const response = await axios.delete(`/api/clash/${clashId}`);

            if (response.status === 200) {
                toast(response.data.message);
                setDeleteOpen(false);
            }
            else {
                toast(response.data.message);
            }
        }
        catch (error) {

        }
    };

    return (
        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <AlertDialogContent className="max-w-md bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 backdrop-blur-xl border border-purple-200/50 shadow-2xl rounded-2xl overflow-hidden">

                <div className="relative z-10">
                    <AlertDialogHeader className="text-center mb-6">
                       
                        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>

                        <AlertDialogTitle className="text-2xl font-black bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text mb-2">
                            Are you absolutely sure?
                        </AlertDialogTitle>

                        <AlertDialogDescription className="text-gray-600 leading-relaxed">
                            This will delete the clash from our database permanently. This action cannot be undone and all associated data will be lost forever.
                        </AlertDialogDescription>
                        
                    </AlertDialogHeader>

                    <AlertDialogFooter className="flex gap-3 mt-8">
                        <AlertDialogCancel className="flex-1 h-11 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold rounded-xl transition-all duration-200 hover:shadow-md">
                            Cancel
                        </AlertDialogCancel>

                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={loading}
                            className="flex-1 h-11 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {
                                loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Processing...
                                    </div>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Delete Clash
                                    </>
                                )
                            }
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </div>

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/5 to-pink-600/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

            </AlertDialogContent>
        </AlertDialog>
    );
}