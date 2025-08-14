import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";


export default function HeroSection () {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <div>
                <Image src={"/hero-image.svg"} width={600} height={600} alt="Banner" />
            </div>
            <div className="text-center my-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
                    Clash
                </h1>
                <p className="text-2xl font-bold text-center">
                    Discover the better choice
                </p>
                <Link href={"/login"}>
                    <Button className="my-2 cursor-pointer">Start</Button>
                </Link>
            </div>
        </div>
    );
}