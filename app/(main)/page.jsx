import { assets } from "@/assets/assets_frontend/assets"
import Button from "@/components/global/Button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

const Home = () => {
    return (
        <section>
            {/* banner */}
            <div className="relative flex flex-col lg:flex-row justify-between items-center bg-primary rounded-md px-5 md:px-10 overflow-hidden">
                {/* Left Content */}
                <div className="py-10 md:py-30 space-y-5">
                    {/* Heading */}
                    <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:leading-20 text-white">
                        Book Appointment<br />With Trusted Doctors
                    </h1>

                    {/* Subtext with Image */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
                        <Image
                            width={200}
                            height={200}
                            className="w-24 sm:w-28 md:w-32 object-cover rounded-full"
                            src={assets.group_profiles}
                            alt="Trusted doctors"
                        />
                        <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-md">
                            Simply browse through our extensive list of trusted doctors,
                            schedule your appointment hassle-free.
                        </p>
                    </div>

                    {/* CTA Button */}
                    <button className="group btn btn-lg bg-white text-primary hover:bg-white border-none shadow-xl rounded-full mt-4 transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95">
                        Book appointment
                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                </div>

                {/* Right Image - Doctors */}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-end items-end lg:absolute lg:right-0 lg:bottom-0 lg:mt-0">
                    <Image
                        src={assets.header_img}
                        alt="Professional doctors"
                        className="w-full max-w-sm md:max-w-md lg:max-w-md xl:max-w-lg object-contain lg:object-cover lg:h-full"
                        priority
                    />
                </div>
            </div>
        </section>
    )
}

export default Home
