"use client";

import { useState } from "react";
import { EllipsisVertical, Edit, Copy, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import DeleteClash from "./DeleteClash";
import EditClash from "./EditClash";



export default function ClashMenuBar({ clash }: { clash: any }) {

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);


    const handleCopy = () => {
        navigator.clipboard?.writeText(`${process.env.NEXT_PUBLIC_APP_URL}/clash/${clash.id}`);
        toast.success("Link copied successfully!");
    };


    return (
        <>

            <DeleteClash deleteOpen={deleteOpen} setDeleteOpen={setDeleteOpen} clashId={clash.id} />
            <EditClash editOpen={editOpen} setEditOpen={setEditOpen} clash={clash} />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-purple-100/80 hover:backdrop-blur-sm rounded-xl transition-all duration-200 group-hover:opacity-100 opacity-70"
                    >
                        <EllipsisVertical className="w-4 h-4 text-gray-600 group-hover:text-purple-600 transition-colors duration-200" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    className="w-48 bg-white/95 backdrop-blur-xl border border-purple-200/50 shadow-2xl rounded-xl overflow-hidden"
                >
                    <DropdownMenuItem
                        onClick={() => setEditOpen(true)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200 cursor-pointer group"
                    >
                        <Edit className="w-4 h-4 text-purple-500 group-hover:text-purple-600" />
                        <span className="font-medium text-gray-700 group-hover:text-purple-700">Edit Clash</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={handleCopy}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 cursor-pointer group"
                    >
                        <Copy className="w-4 h-4 text-blue-500 group-hover:text-blue-600" />
                        <span className="font-medium text-gray-700 group-hover:text-blue-700">Copy Link</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() => setDeleteOpen(true)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-200 cursor-pointer group"
                    >
                        <Trash2 className="w-4 h-4 text-red-500 group-hover:text-red-600" />
                        <span className="font-medium text-gray-700 group-hover:text-red-700">Delete Clash</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}