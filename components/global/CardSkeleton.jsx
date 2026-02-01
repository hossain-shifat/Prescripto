export default function CardSkeleton({ sm = 1, md = 3, lg = 4, count = 8 }) {
    const gridColsMap = {
        sm: {
            1: 'sm:grid-cols-1',
            2: 'sm:grid-cols-2',
            3: 'sm:grid-cols-3',
            4: 'sm:grid-cols-4',
            5: 'sm:grid-cols-5',
            6: 'sm:grid-cols-6',
        },
        md: {
            1: 'md:grid-cols-1',
            2: 'md:grid-cols-2',
            3: 'md:grid-cols-3',
            4: 'md:grid-cols-4',
            5: 'md:grid-cols-5',
            6: 'md:grid-cols-6',
        },
        lg: {
            1: 'lg:grid-cols-1',
            2: 'lg:grid-cols-2',
            3: 'lg:grid-cols-3',
            4: 'lg:grid-cols-4',
            5: 'lg:grid-cols-5',
            6: 'lg:grid-cols-6',
        }
    }

    const gridClasses = `grid gap-4 ${gridColsMap.sm[sm]} ${gridColsMap.md[md]} ${gridColsMap.lg[lg]} mx-5 md:mx-0`;

    return (
        <div className={gridClasses}>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="bg-base-100 rounded-2xl overflow-hidden border border-base-200 animate-pulse">
                    <div className="bg-gray-300 h-52 w-full"></div>
                    <div className="flex flex-col py-4 gap-2">
                        <div className="flex items-center gap-0 px-4">
                            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                            <div className="w-20 h-4 bg-gray-300 rounded ml-2"></div>
                        </div>
                        <div className="px-4 space-y-2">
                            <div className="w-3/4 h-5 bg-gray-300 rounded"></div>
                            <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
