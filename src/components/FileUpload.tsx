"use client";

import { ImageKitAbortError, ImageKitInvalidRequestError, ImageKitServerError, ImageKitUploadNetworkError, upload, UploadResponse } from "@imagekit/next";
import { Upload, X, CheckCircle, Loader2, Sparkles, Image as ImageIcon } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AuthParamsProps {
    signature: string;
    expire: number;
    token: string;
    publicKey: string;
}

interface FileUploadProps {
    setFileUrl: (url: string) => void;
}

const FileUpload = ({ setFileUrl }: FileUploadProps) => {

    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<UploadResponse | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);


    const fileInputRef = useRef<HTMLInputElement>(null);


    const authenticator = async (): Promise<AuthParamsProps> => {
        try {
            const response = await fetch("/api/upload-auth");

            if (!response.ok) {
                const errorText = await response.text();
                toast.error(errorText);
            }

            const data = await response.json();
            const { signature, expire, token, publicKey } = data;

            return { signature, expire, token, publicKey };
        }
        catch (error) {
            toast.error("Authentication request failed");
            throw error;
        }
    };


    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setUploadedFile(null);
            setProgress(0);
        }
    };


    const handleUpload = async () => {

        const fileInput = fileInputRef.current;

        if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
            toast.error("Please select a file to upload");
            return;
        }

        const file = fileInput.files[0];

        setUploading(true);
        setProgress(0);

        try {
            const authParams = await authenticator();

            const uploadResponse = await upload({
                expire: authParams.expire,
                token: authParams.token,
                signature: authParams.signature,
                publicKey: authParams.publicKey,
                file,
                fileName: file.name,
                onProgress: (event) => {
                    const progressPercent = (event.loaded / event.total) * 100;
                    setProgress(progressPercent);
                }
            });

            setUploadedFile(uploadResponse);
            setFileUrl(uploadResponse.url as string);
            toast.success("File uploaded successfully!");
        }
        catch (error) {
            if (error instanceof ImageKitInvalidRequestError) {
                toast.error(`Invalid request: ${error.message}`);
            }
            else if (error instanceof ImageKitUploadNetworkError) {
                toast.error(`Network error: ${error.message}`);
            }
            else if (error instanceof ImageKitServerError) {
                toast.error(`Server error: ${error.message}`);
            }
            else {
                toast.error("An unexpected error occurred during upload");
            }
        }
        finally {
            setUploading(false);
        }
    };


    const handleReset = () => {
        setSelectedFile(null);
        setUploadedFile(null);
        setProgress(0);
        setFileUrl("");
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };


    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">

                <div className="px-6 pt-6 pb-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-lg flex items-center justify-center">
                            <Upload className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">Upload Image</h3>
                    </div>
                    <p className="text-gray-600 text-sm">Select an image file to upload</p>
                </div>

                <div className="px-6 pb-6 space-y-6">
                    {!uploadedFile && (
                        <>
                            <div className="space-y-4">
                                <div className="relative">
                                    <Input
                                        ref={fileInputRef}
                                        type="file"
                                        onChange={handleFileSelect}
                                        accept="image/*"
                                        disabled={uploading}
                                        className="h-12 bg-gray-50/50 border-gray-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl transition-all duration-200 hover:bg-gray-50 cursor-pointer file:cursor-pointer file:border-0 file:bg-transparent file:text-purple-600 file:font-semibold"
                                    />
                                </div>

                                {selectedFile && (
                                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <ImageIcon className="w-4 h-4 text-white" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-gray-800 truncate">
                                                    {selectedFile.name}
                                                </p>
                                                <p className="text-xs text-gray-600">
                                                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                                                </p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={handleReset}
                                            disabled={uploading}
                                            className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600 rounded-lg transition-colors duration-200"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {uploading && (
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm font-medium text-gray-700">
                                        <span>Uploading...</span>
                                        <span>{Math.round(progress)}%</span>
                                    </div>
                                    <div className="relative">
                                        <Progress value={progress} className="w-full h-2" />
                                        <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
                                    </div>
                                </div>
                            )}

                            <Button
                                onClick={handleUpload}
                                disabled={!selectedFile || uploading}
                                className="w-full h-12 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {uploading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Uploading...
                                    </div>
                                ) : (
                                    <>
                                        <Upload className="mr-2 h-4 w-4" />
                                        Upload File
                                    </>
                                )}
                            </Button>
                        </>
                    )}

                    {
                        uploadedFile && (
                            <div className="space-y-6">
                                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                                            <CheckCircle className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-green-800">Upload Successful!</p>
                                            <p className="text-xs text-green-600">Your file has been uploaded successfully</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="relative group">
                                        <img
                                            src={uploadedFile.url}
                                            alt={uploadedFile.name}
                                            className="w-full h-48 object-cover rounded-xl border-2 border-gray-200 shadow-lg group-hover:shadow-xl transition-all duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                </div>

                                <Button
                                    onClick={handleReset}
                                    className="w-full h-12 bg-white border-2 border-purple-200 text-purple-600 font-semibold rounded-xl hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 shadow-sm hover:shadow-md"
                                >
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload Another File
                                </Button>
                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    );
};

export default FileUpload;