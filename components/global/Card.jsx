'use client'
import { Dot } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Card({ datas = [], limit, step = 10, sm = 1, md = 3, lg = 4 }) {

    const isLimited = typeof limit === 'number'
    const [visible, setVisible] = useState(
        isLimited ? limit : datas.length
    )

    const showMore = () => {
        setVisible((prev) => prev + step)
    }

    const showLess = () => {
        setVisible(limit)
    }

    const visibleData = isLimited
        ? datas.slice(0, visible)
        : datas

    return (
        <>
            <div className={`grid gap-4 grid-cols-${sm} md:grid-cols-${md} lg:grid-cols-${lg} mx-4 md:mx-0`}>
                {
                    visibleData.map(data => (
                        <div key={data._id} className="bg-base-100 rounded-2xl overflow-hidden border border-base-200 hover:-translate-y-1 transition duration-300">
                            <div className="bg-[#C9D8FF]">
                                <Image className="w-full h-52 object-cover object-top" src={data.image} alt='' />
                            </div>
                            <div className="flex flex-col py-4 gap-2">
                                <p className={`font-medium flex items-center gap-0 ${data.status === 'Available' ? 'text-green-500' : 'text-red-500'}`}>
                                    <Dot className="-mr-3.5" size={50} />
                                    {data.status}
                                </p>
                                <div className="px-4">
                                    <p className="text-base-content  font-semibold text-xl md:text-base lg:text-lg leading-tight">{data.name}</p>
                                    <p className="text-base-content text-xs sm:text-sm mt-1">{data.speciality}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            {isLimited && (
                <div className="flex justify-center gap-4 mt-8">
                    {visible < datas.length && (
                        <button
                            onClick={showMore}
                            className="bg-transparent btn text-base-content font-medium px-8 py-2 rounded-full transition"
                        >
                            More
                        </button>
                    )}

                    {visible > limit && (
                        <button
                            onClick={showLess}
                            className="btn bg-transparent text-base-content font-medium px-8 py-2 rounded-full transition"
                        >
                            Less
                        </button>
                    )}
                </div>
            )}
        </>
    );
};
