import { assets } from "@/assets/assets_frontend/assets";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href='/'>
            <Image src={assets.logo} width={200} className="lg:px-5 w-35 lg:w-45" alt="prescripto logo"/>
        </Link>
    )
}
