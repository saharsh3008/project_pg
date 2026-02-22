"use client";

import { useState } from "react";
import Image from "next/image";
import { COUNTRIES, CITIES_BY_COUNTRY } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

export function CitiesSection() {
    const [active, setActive] = useState<string>(COUNTRIES[0].name);
    const cities = CITIES_BY_COUNTRY[active] || [];

    return (
        <section className="bg-white py-8 lg:py-12" id="cities">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-9">
                {/* Header */}
                <h2 className="text-lg lg:text-2xl font-semibold lg:font-bold text-gray-800 leading-tight">
                    Popular Cities Across the Globe
                </h2>
                <p className="text-sm lg:text-lg text-gray-500 mt-1">
                    Book student accommodations near top cities and universities around the world
                </p>

                {/* Country Tabs */}
                <div className="flex gap-2 overflow-x-auto hide-scrollbar mt-7 pb-1">
                    {COUNTRIES.map((country) => (
                        <button
                            key={country.name}
                            onClick={() => setActive(country.name)}
                            className={cn(
                                "flex items-center gap-1.5 h-10 px-3 lg:px-4 border rounded text-sm lg:text-base whitespace-nowrap transition-all cursor-pointer",
                                active === country.name
                                    ? "border-gray-800 text-gray-800 font-medium"
                                    : "border-gray-200 text-gray-500 hover:bg-gray-50"
                            )}
                        >
                            <Image
                                src={`https://flagcdn.com/w40/${country.code}.png`}
                                alt={`${country.name} flag`}
                                width={22}
                                height={16}
                                className="rounded-sm object-cover"
                            />
                            {country.name}
                        </button>
                    ))}
                </div>

                {/* City Grid */}
                <div className="mt-5 flex flex-wrap gap-0 md:gap-0">
                    {cities.map((city) => (
                        <a
                            key={city.name}
                            href="#"
                            className="relative flex-shrink-0 w-[165px] h-[165px] md:w-[calc(100%/6)] md:h-auto md:aspect-square overflow-hidden rounded group"
                            title={city.name}
                        >
                            <Image
                                src={city.image}
                                alt={city.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="(max-width:768px) 165px, 16.66vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10">
                                <span className="px-3 py-1.5 md:px-5 md:py-2 rounded bg-black/60 text-white text-xs md:text-sm font-semibold md:font-medium whitespace-nowrap">
                                    {city.name}
                                </span>
                            </div>
                            <div className="absolute top-2 right-2 z-10">
                                <span className="px-1.5 py-0.5 rounded bg-amber-red text-white text-[10px] font-semibold">
                                    {city.propertyCount}+ homes
                                </span>
                            </div>
                        </a>
                    ))}
                </div>

                {/* View All */}
                <a
                    href="#"
                    className="mt-6 md:mt-8 flex items-center gap-1.5 w-full md:w-fit mx-auto justify-center px-4 md:px-6 py-2.5 md:py-4 border border-amber-red text-amber-red rounded text-sm md:text-base font-medium hover:bg-amber-red-light transition-colors"
                >
                    View All Cities
                    <ArrowUpRight size={16} className="rotate-45" />
                </a>
            </div>
        </section>
    );
}
