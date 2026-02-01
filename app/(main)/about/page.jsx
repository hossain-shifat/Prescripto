import { assets } from "@/assets/assets_frontend/assets";
import Image from "next/image";

export default function About() {

    const features = [
        {
            title: "EFFICIENCY:",
            description: "Streamlined Appointment Scheduling That Fits Into Your Busy Lifestyle."
        },
        {
            title: "CONVENIENCE:",
            description: "Access To A Network Of Trusted Healthcare Professionals In Your Area."
        },
        {
            title: "PERSONALIZATION:",
            description: "Tailored Recommendations And Reminders To Help You Stay On Top Of Your Health."
        }
    ];

    return (
        <section className="space-y-10">
            <div>
                <h1 className="text-center text-xl">About <span className="font-medium">Us</span></h1>
            </div>
            <div className="flex flex-col md:flex-row gap-5 md:gap-10">
                <div className="flex-2">
                    <Image src={assets.about_image} className="w-80 md:w-85 min-h-full mx-auto object-cover" alt="about photo" />
                </div>
                <div className="flex-5 space-y-10 p-5 md:p-0">
                    <p>Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
                    <p>Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you&apos;re booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
                    <p className="flex flex-col gap-2">
                        <span className="font-bold">Our Vision</span>
                        <span>
                            Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
                        </span>
                    </p>
                </div>
            </div>
            <div className="mt-10 px-5 md:p-0">
                <div>
                    <h1 className="text-xl">Why <span className="font-bold">Choose Us</span></h1>
                </div>
                <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="border border-base-300 rounded-lg md:rounded-none p-6 md:p-8 hover:shadow-lg transition-shadow duration-300"
                            >
                                <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-base-content">
                                    {feature.title}
                                </h3>
                                <p className="text-sm md:text-base text-base-content/80 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
