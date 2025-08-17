import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ClashMenuBar from "./ClashMenuBar";

export default function ClashCard({ clash }: { clash: any }) {

    const now = new Date();
    const expiryDate = new Date(clash.expiredAt);
    const isExpired = now > expiryDate;

    const getTimeRemaining = () => {
        if (isExpired) {
            return "Expired";
        }

        const diffTime = expiryDate.getTime() - now.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

        if (diffDays > 0) return `${diffDays}d ${diffHours}h left`;
        if (diffHours > 0) return `${diffHours}h ${diffMinutes}m left`;

        return `${diffMinutes}m left`;
    };


    return (
        <Card className="group relative overflow-hidden bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 border border-purple-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-2xl">

            <CardHeader className="relative z-10 flex justify-between items-center flex-row pb-3">
                <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-purple-700 transition-colors duration-200">
                    {clash.title}
                </CardTitle>
                <ClashMenuBar clash={clash} />
            </CardHeader>

            <CardContent className="relative z-10 h-[300px] space-y-3">

                {
                    clash?.image && (
                        <div className="w-full h-[220px] rounded-xl overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                            <Image
                                src={clash.image}
                                width={500}
                                height={500}
                                alt={clash.title}
                                className="rounded-md w-full h-[220px] object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                    )
                }

                {
                    clash?.description && (
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                            {clash.description}
                        </p>
                    )
                }

                <div className="space-y-2">

                    <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-purple-500" />
                        <span className="text-gray-600">
                            <strong>Expires:</strong> {new Date(clash?.expiredAt!).toDateString()}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-pink-500" />
                        <Badge
                            variant="secondary"
                            className={`${isExpired ? 'bg-gray-100 text-gray-600' : 'bg-gradient-to-r from-pink-500/10 to-purple-500/10 text-purple-700 border-purple-200'} font-semibold`}
                        >
                            {getTimeRemaining()}
                        </Badge>
                    </div>
                </div>

            </CardContent>

            <CardFooter className="relative z-10 space-x-4">
                <Link href={`/clash/items/${clash.id}`} className="flex-1">
                    <Button className="w-full h-10 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                        Items
                    </Button>
                </Link>
            </CardFooter>

        </Card>
    );
}