'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { specialityData } from '@/assets/assets_frontend/assets';

// For Home Page - Grid Layout with Images
export function Speciality() {
    const router = useRouter();

    const handleClick = (speciality) => {
        router.push(`/all-doctors?speciality=${encodeURIComponent(speciality)}`);
    };

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {specialityData.map((data, idx) => (
                <div
                    key={idx}
                    onClick={() => handleClick(data.speciality)}
                    className="space-y-3 cursor-pointer transition-all duration-300 hover:scale-110"
                >
                    <Image
                        src={data.image}
                        alt={`${data.speciality} icon`}
                        className="hover:scale-110 duration-300"
                    />
                    <p className="text-center">
                        {data.speciality}
                    </p>
                </div>
            ))}
        </div>
    );
}

// For All Doctors Page - Sidebar List (Desktop) / Dropdown (Mobile)
export function SpecialitySidebar({ onCategoryClick, selectedCategory }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleCategorySelect = (speciality) => {
        onCategoryClick(speciality);
        setIsOpen(false); // Close dropdown after selection on mobile
    };

    return (
        <>
            {/* Mobile Dropdown */}
            <div className="flex md:hidden mb-4 relative justify-end">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="font-medium py-2 px-4 rounded-lg bg-primary text-white flex items-center gap-2 w-auto"
                >
                    <span>
                        {selectedCategory && selectedCategory !== 'All'
                            ? selectedCategory
                            : 'Select Speciality'}
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                    <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden max-h-64 overflow-y-auto w-64 z-50">
                        {specialityData.map((data, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleCategorySelect(data.speciality)}
                                className={`w-full font-medium py-2 px-4 text-left transition-all duration-300 border-b border-gray-100 last:border-b-0 ${selectedCategory === data.speciality
                                        ? 'bg-primary text-white'
                                        : 'hover:bg-primary/10'
                                    }`}
                            >
                                {data.speciality}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:flex flex-col gap-2">
                {specialityData.map((data, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleCategorySelect(data.speciality)}
                        className={`w-full font-medium border border-base-200 cursor-pointer py-3 px-4 rounded-lg text-left transition-all duration-300 ${selectedCategory === data.speciality
                            ? 'bg-[#E2E5FF] text-base-content'
                                : 'hover:bg-primary/10'
                            }`}
                    >
                        {data.speciality}
                    </button>
                ))}
            </div>
        </>
    );
}
