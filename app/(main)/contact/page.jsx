import { assets } from "@/assets/assets_frontend/assets";
import Image from "next/image";

export default function Contact() {
    return (
        <section className="max-w-6xl mx-auto px-4 py-5 md:py-16">
            {/* Page Title */}
            <div className="text-center mb-10 md:mb-16">
                <h1 className="text-2xl md:text-3xl">
                    CONTACT <span className="font-bold">US</span>
                </h1>
            </div>

            {/* Contact Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                {/* Left Side - Image */}
                <div className="w-full">
                    <Image
                        src={assets.contact_image}
                        alt="contact image"
                        className="w-full h-auto rounded-lg"
                        width={500}
                        height={400}
                    />
                </div>

                {/* Right Side - Contact Information */}
                <div className="space-y-8 md:space-y-10">
                    {/* Our Office Section */}
                    <div className="space-y-3">
                        <h2 className="text-lg md:text-xl font-semibold text-base-content">
                            OUR OFFICE
                        </h2>
                        <div className="space-y-2 text-sm md:text-base text-base-content/80">
                            <p>54709 Willms Station</p>
                            <p>Suite 350, Washington, USA</p>
                            <p className="mt-3">
                                Tel:
                                <a href="tel:+14155550132" className="ml-1 hover:text-indigo-500 transition-colors cursor-pointer">(415) 555-0132</a>
                            </p>
                            <p>
                                Email:
                                <a href="mailto:prescripto@gmail.com" className="ml-1 hover:text-indigo-500 transition-colors cursor-pointer">prescripto@gmail.com</a>
                            </p>
                        </div>
                    </div>

                    {/* Careers Section */}
                    <div className="space-y-4">
                        <h2 className="text-lg md:text-xl font-semibold text-base-content">
                            CAREERS AT PRESCRIPTO
                        </h2>
                        <p className="text-sm md:text-base text-base-content/80">
                            Learn more about our teams and job openings.
                        </p>
                        <button className="btn btn-outline rounded-none px-8 py-2 text-sm md:text-base hover:bg-base-content hover:text-base-100 transition">
                            Explore Jobs
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
