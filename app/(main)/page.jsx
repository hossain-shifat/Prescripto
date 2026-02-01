import { assets, doctors, specialityData } from "@/assets/assets_frontend/assets"
import { Speciality } from "@/components/frontend/Speciality"
import Card from "@/components/global/Card"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

const Home = () => {
    return (
        <section className="space-y-20">
            {/* banner */}
            <div className="relative flex flex-col lg:flex-row justify-between items-center bg-primary rounded-md px-5 md:px-10 overflow-hidden">
                {/* Left Content */}
                <div className="py-10 md:py-28 space-y-5">
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
            {/* Specialist section */}
            <div className="space-y-20">
                <div className="text-center space-y-10">
                    <h1 className="font-bold text-4xl">Find by Speciality</h1>
                    <p>Simply browse through our extensive list of trusted doctors, schedule <br /> your appointment hassle-free.</p>
                </div>
                <div className="flex flex-col md:flex-row justify-center items-center gap-10">
                    <Speciality />
                </div>
            </div>
            <div className="space-y-20">
                <div className="text-center space-y-5">
                    <h1 className="font-bold text-4xl">Top Doctors to Book</h1>
                    <p>Simply browse through our extensive list of trusted doctors.</p>
                </div>
                <div>
                    <Card datas={doctors} sm={1} md={3} lg={5} limit={10} />
                </div>
            </div>
            {/* footer banner */}
            <div className="relative flex flex-row justify-between items-center bg-primary rounded-md px-10 md:pl-20 overflow-hidden">
                {/* Left Content */}
                <div className="py-8 sm:py-10 lg:py-16 space-y-3 sm:space-y-5 z-20 w-1/2 lg:w-1/2">
                    {/* Heading */}
                    <h1 className="font-bold text-sm sm:text-2xl md:text-4xl lg:text-5xl leading-tight lg:leading-tight text-white">
                        Book Appointment
                        <br /> With 100+ Trusted Doctors
                    </h1>
                    {/* CTA Button */}
                    <button className="group btn btn-xs sm:btn-md lg:btn-lg bg-white text-primary hover:bg-white border-none shadow-xl rounded-full transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95">
                        <span className="hidden sm:inline">Create account</span>
                        <span className="inline sm:hidden">Create</span>
                        <ArrowRight className="w-3 h-3 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                </div>

                {/* Right Image - Doctor */}
                <div className="absolute right-0 bottom-0 w-1/2 h-full flex items-end justify-end pr-10 md:pr-20">
                    <Image
                        src={assets.appointment_img}
                        alt="Professional doctor"
                        className="h-full w-auto object-contain object-bottom"
                        priority
                    />
                </div>
            </div>
        </section>
    )
}

export default Home
