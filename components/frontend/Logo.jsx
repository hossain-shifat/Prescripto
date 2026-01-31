import { assets } from "@/assets/assets_frontend/assets";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href='/' className="flex items-center gap-3">
            <Image src={assets.logo} width={200} className="w-7 h-7 object-cover lg:w-8 lg:h-8" alt="prescripto logo"/>
            <h1 className="font-bold text-xl md:text-2xl bg-linear-to-r from-[#5F6FFF] to-[#5F6FFF]/80 bg-clip-text text-transparent">
                Prescripto
            </h1>
        </Link>
    )
}
