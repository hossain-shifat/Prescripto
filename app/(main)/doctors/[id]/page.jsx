'use client'
import { doctors } from "@/assets/assets_frontend/assets";
import Card from "@/components/global/Card";
import { Info, Verified, X } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase/client";
import { onAuthStateChanged } from "firebase/auth";

export default function DoctorDetails() {
    const params = useParams()
    const router = useRouter()

    const [authChecked, setAuthChecked] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (!firebaseUser) {
                router.replace("/login");
                return;
            }

            setAuthChecked(true);
        });

        return unsubscribe;
    }, [router]);

    const doctor = doctors.find(doc => doc._id === params.id)

    if (!authChecked) {
        return (
            <section className="flex min-h-[60vh] items-center justify-center px-4">
                <p className="text-sm text-[#6b7280]">Checking your session...</p>
            </section>
        );
    }

    if (!doctor) {
        return (
            <section className="flex min-h-[60vh] items-center justify-center px-4">
                <p className="text-sm text-[#6b7280]">Doctor not found.</p>
            </section>
        );
    }

    const relatedDoctors = doctors.filter(
        doc => doc.speciality === doctor.speciality && doc._id !== doctor._id
    );

    // Date slots
    const dateSlots = [
        { day: 'MON', date: 10 },
        { day: 'TUE', date: 11 },
        { day: 'WED', date: 12 },
        { day: 'THU', date: 13 },
        { day: 'FRI', date: 14 },
        { day: 'SAT', date: 15 },
        { day: 'SUN', date: 16 },
    ];

    // Time slots
    const timeSlots = [
        '8:00 am',
        '8:30 am',
        '9:00 am',
        '9:30 am',
        '10:00 am',
        '10:30 am',
        '11:00 am',
        '11:30 am',
    ];

    const handleBookAppointment = () => {
        if (selectedDate && selectedTime) {
            console.log('Selected Date:', selectedDate);
            console.log('Selected Time:', selectedTime);
            alert(`Appointment booked for ${selectedDate.day} ${selectedDate.date} at ${selectedTime}`);
        } else {
            alert('Please select both date and time');
        }
    };

    return (
        <section className="max-w-6xl mx-auto px-4 md:px-0 py-8 space-y-20">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                {/* Doctor Image */}
                <div className="shrink-0">
                    <div className="bg-primary rounded-xl overflow-hidden w-full md:w-72 lg:w-80 h-83">
                        <Image
                            src={doctor.image}
                            className="object-cover object-bottom h-full"
                            alt="doctor image"
                            width={320}
                            height={400}
                        />
                    </div>
                </div>

                {/* Doctor Details and Booking Section */}
                <div className="flex-1 space-y-6">
                    {/* Doctor Info */}
                    <div className="border border-base-300 p-5 md:p-8 rounded-xl space-y-4">
                        <div className="space-y-2">
                            <span className="flex gap-2 items-start md:items-center text-xl md:text-3xl font-medium">
                                <h1 className="leading-tight">{doctor.name}</h1>
                                <Verified fill="#0016E1" className="text-white shrink-0 mt-1 md:mt-0" size={20} />
                            </span>
                            <p className="text-sm md:text-base">
                                {doctor.degree} - {doctor.speciality}
                                <span className="ml-2 badge badge-neutral badge-outline rounded-full text-xs">
                                    {doctor.experience}
                                </span>
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h2 className="flex gap-2 text-base md:text-lg items-center font-medium text-base-content">
                                About <Info size={18} />
                            </h2>
                            <p className="text-sm md:text-base text-base-content/80 leading-relaxed">
                                {doctor.about}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm md:text-base">
                                Appointment fee: <span className="font-semibold">${doctor.fees}</span>
                            </h3>
                        </div>
                    </div>

                    {/* Booking Slots */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg md:text-xl font-semibold">Booking slots</h2>
                            {(selectedDate || selectedTime) && (
                                <button
                                    onClick={() => {
                                        setSelectedDate(null);
                                        setSelectedTime(null);
                                    }}
                                    className="flex items-center cursor-pointer gap-1 text-md md:text-sm text-error font-medium transition"
                                >
                                    Clear selection <X size={18} />
                                </button>
                            )}
                        </div>

                        {/* Date Selection - Grid on Mobile, Flex on Desktop */}
                        <div className="grid grid-cols-4 md:flex gap-2 md:gap-3">
                            {dateSlots.map((slot) => (
                                <button
                                    key={slot.date}
                                    onClick={() => setSelectedDate(slot)}
                                    className={`flex flex-col items-center justify-center w-full md:min-w-16 h-14 md:h-16 rounded-full border-2 transition ${selectedDate?.date === slot.date
                                        ? 'bg-indigo-500 text-white border-indigo-500'
                                        : 'bg-base-100 text-base-content border-base-300 hover:border-indigo-300'
                                        }`}
                                >
                                    <span className="text-[10px] md:text-xs font-medium">{slot.day}</span>
                                    <span className="text-base md:text-lg font-semibold">{slot.date}</span>
                                </button>
                            ))}
                        </div>

                        {/* Time Selection */}
                        <div className="flex gap-2 md:gap-3 flex-wrap">
                            {timeSlots.map((time) => (
                                <button
                                    key={time}
                                    onClick={() => setSelectedTime(time)}
                                    className={`px-4 md:px-6 py-2 rounded-full border-2 text-xs md:text-sm font-medium transition ${selectedTime === time
                                        ? 'bg-indigo-500 text-white border-indigo-500'
                                        : 'bg-base-100 text-base-content border-base-300 hover:border-indigo-300'
                                        }`}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>

                        {/* Book Appointment Button */}
                        <button
                            onClick={handleBookAppointment}
                            className="w-full md:w-auto bg-indigo-500 text-white px-8 md:px-12 py-3 rounded-full font-semibold hover:bg-indigo-600 transition text-sm md:text-base"
                        >
                            Book an appointment
                        </button>
                    </div>
                </div>
            </div>
            <div className="space-y-20">
                <div className="text-center space-y-2">
                    <h1 className="font-bold text-4xl">Related Doctors</h1>
                    <p>Simply browse through our extensive list of trusted doctors.</p>
                </div>
                <Card
                    datas={relatedDoctors}
                    sm={2}
                    md={3}
                    lg={4}
                />
            </div>
        </section>
    );
}
