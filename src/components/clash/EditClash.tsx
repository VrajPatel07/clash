"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Type, FileText, Calendar, Edit, Image as ImageIcon } from "lucide-react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { clashSchema } from "@/schemas/clashSchema";
import FileUpload from "../FileUpload";



export default function EditClash({ editOpen, setEditOpen, clash }: {
    editOpen: boolean,
    setEditOpen: Dispatch<SetStateAction<boolean>>,
    clash: any,
}) {

    const [fileUrl, setFileUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const form = useForm<z.infer<typeof clashSchema>>({
        resolver: zodResolver(clashSchema),
        defaultValues : {
            title : clash?.title || "",
            description : clash?.description || "",
            image : clash?.image || "",
            expiredAt : clash?.expiredAt ? new Date(clash.expiredAt) : undefined,
        },
        mode: "onChange"
    });


    useEffect(() => {
        if (fileUrl) {
            form.setValue("image", fileUrl);
        }
    }, [fileUrl, form]);


    useEffect(() => {
        if (!editOpen) {
            form.reset();
            setFileUrl("");
        }
    }, [editOpen, form]);


    useEffect(() => {
        if (clash) {
            form.reset({
                title: clash.title || "",
                description: clash.description || "",
                image: clash.image || "",
                expiredAt: clash.expiredAt ? new Date(clash.expiredAt) : undefined,
            });
            setFileUrl(clash.image || "");
        }
    }, [clash, form]);


    const submitHandler = async (data: z.infer<typeof clashSchema>) => {
        try {
            setIsLoading(true);

            const response = await axios.put(`/api/clash/${clash.id}`, data);

            if (response.status === 200) {
                toast.success(response.data.message || "Clash updated successfully!");
                form.reset();
                setFileUrl("");
                setEditOpen(false);
            }
            else {
                toast.error(response.data.message || "Failed to update clash");
            }
        }
        catch (error: any) {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            }
            else {
                toast.error('Something went wrong. Please try again.');
            }
        }
        finally {
            setIsLoading(false);
        }
    };


    return (
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 border-0 shadow-2xl">

                <div className="absolute inset-0 overflow-hidden rounded-lg">
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                    <div className="absolute top-1/3 right-1/4 w-36 h-36 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-200"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-400"></div>
                </div>

                <div className="relative">

                    <DialogHeader className="text-center mb-6">
                        <div className="inline-flex items-center gap-2 justify-center mb-2">
                            <DialogTitle className="text-3xl font-black bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
                                Edit Clash
                            </DialogTitle>
                        </div>
                        <p className="text-gray-600">Update your clash details and keep the competition exciting</p>
                    </DialogHeader>

                    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden mb-4">
                        <div className="px-6 pt-6 pb-4">

                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-500 rounded-lg flex items-center justify-center">
                                    <Edit className="w-3 h-3 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800">Update Clash Details</h3>
                            </div>

                            <Form {...form}>
                                <form className="space-y-4" onSubmit={form.handleSubmit(submitHandler)}>
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-semibold text-gray-700">Title</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Type className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                                        <Input
                                                            {...field}
                                                            type="text"
                                                            placeholder="Enter clash title (3-30 characters)"
                                                            className="pl-10 h-10 bg-gray-50/50 border-gray-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl transition-all duration-200 hover:bg-gray-50"
                                                            maxLength={30}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <div className="flex justify-between">
                                                    <FormMessage className="text-xs" />
                                                    <span className="text-xs text-gray-500">
                                                        {field.value?.length || 0}/30
                                                    </span>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-semibold text-gray-700">Description (Optional)</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <FileText className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                                                        <Textarea
                                                            {...field}
                                                            placeholder="Describe your clash (max 500 characters)"
                                                            className="pl-10 min-h-20 bg-gray-50/50 border-gray-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl transition-all duration-200 hover:bg-gray-50 resize-none"
                                                            maxLength={500}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <div className="flex justify-between">
                                                    <FormMessage className="text-xs" />
                                                    <span className="text-xs text-gray-500">
                                                        {field.value?.length || 0}/500
                                                    </span>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="expiredAt"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-semibold text-gray-700">Expiry Date</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                                        <Input
                                                            type="date"
                                                            min={new Date().toISOString().slice(0, 10)}
                                                            value={field.value ? new Date(field.value).toISOString().slice(0, 10) : ""}
                                                            onChange={(e) => {
                                                                const dateValue = e.target.value ? new Date(e.target.value) : undefined;
                                                                field.onChange(dateValue);
                                                            }}
                                                            className="pl-10 h-10 bg-gray-50/50 border-gray-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl transition-all duration-200 hover:bg-gray-50"
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage className="text-xs" />
                                            </FormItem>
                                        )}
                                    />
                                </form>
                            </Form>
                            
                        </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden mb-4">

                        <div className="px-6 pt-4 pb-2">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-500 rounded-lg flex items-center justify-center">
                                    <ImageIcon className="w-3 h-3 text-white" />
                                </div>
                                <h4 className="text-lg font-bold text-gray-800">Clash Image</h4>
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Optional</span>
                            </div>
                            <p className="text-gray-600 text-xs mb-3">Update the image to refresh your clash appearance</p>
                        </div>

                        <div className="px-6 pb-4">
                            <FileUpload setFileUrl={setFileUrl} />
                            {
                                clash?.image && (
                                    <div className="mt-3 p-3 bg-purple-50 rounded-xl border border-purple-200">
                                        <p className="text-sm text-purple-700">Current image will be kept if no new image is uploaded</p>
                                    </div>
                                )
                            }
                        </div>

                    </div>

                    <div className="flex gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setEditOpen(false)}
                            className="flex-1 h-10 border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-xl transition-colors duration-200"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading || !form.formState.isValid}
                            onClick={form.handleSubmit(submitHandler)}
                            className="flex-1 h-10 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {
                                isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Updating...
                                    </div>
                                ) : (
                                    <>
                                        <Edit className="mr-2 h-3 w-3" />
                                        Update Clash
                                    </>
                                )
                            }
                        </Button>
                    </div>

                </div>

            </DialogContent>
        </Dialog>
    );
}