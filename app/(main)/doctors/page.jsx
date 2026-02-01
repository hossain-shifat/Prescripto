'use client'
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Card from '@/components/global/Card';
import { doctors } from '@/assets/assets_frontend/assets';
import { SpecialitySidebar } from '@/components/frontend/Speciality';

export default function AllDoctorsPage() {
    const searchParams = useSearchParams();
    const specialityFromURL = searchParams.get('speciality');

    const [selectedCategory, setSelectedCategory] = useState(specialityFromURL || 'All');

    // Update selected category when URL changes
    useEffect(() => {
        if (specialityFromURL) {
            setSelectedCategory(specialityFromURL);
        }
    }, [specialityFromURL]);

    // Filter doctors based on selected category
    const filteredDoctors = selectedCategory === 'All'
        ? doctors
        : doctors.filter(doctor => doctor.speciality === selectedCategory);

    return (
        <div className="container mx-auto py-8">
            <div className="mb-6">
                <h3 className="text-xl font-semibold">
                    {selectedCategory === 'All'
                        ? 'All Doctors'
                        : `${selectedCategory} Specialists`}
                </h3>
                <p className="text-gray-500 mt-1">
                    Showing {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''}
                </p>
            </div>

            <div className="grid md:grid-cols-4 lg:grid-cols-5 gap-6">
                {/* Left Sidebar - Takes 1 column */}
                <div className="md:col-span-1">
                    <SpecialitySidebar
                        onCategoryClick={setSelectedCategory}
                        selectedCategory={selectedCategory}
                    />
                </div>

                {/* Right Content - Takes remaining columns */}
                <div className="md:col-span-3 lg:col-span-4">
                    <Card
                        datas={filteredDoctors}
                        sm={1}
                        md={3}
                        lg={4}
                    />
                </div>
            </div>
        </div>
    );
}
