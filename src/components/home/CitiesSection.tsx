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
        <section className="bg-slate-50 py-16 lg:py-24" id="cities">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-9">
                {/* Header */}
                <div className="text-center mb-10">
                    <span className="text-amber-red font-bold tracking-wider text-sm uppercase mb-2 block">Global Presence</span>
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                        Popular Cities Across the Globe
                    </h2>
                    <p className="text-base lg:text-lg text-slate-500 mt-4 max-w-2xl mx-auto">
                        Book premium student accommodations near top universities around the world with exclusive perks.
                    </p>
                </div>

                {/* Country Tabs - Pill shaped */}
                <div className="flex gap-3 overflow-x-auto hide-scrollbar justify-start md:justify-center mb-10 pb-2">
                    {COUNTRIES.map((country) => (
                        <button
                            key={country.name}
                            onClick={() => setActive(country.name)}
                            className={cn(
                                "flex items-center gap-2 h-12 px-5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 shadow-sm",
                                active === country.name
                                    ? "bg-slate-900 text-white shadow-md scale-105"
                                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                            )}
                        >
                            <Image
                                src={`https://flagcdn.com/w40/${country.code}.png`}
                                alt={`${country.name} flag`}
                                width={24}
                                height={18}
                                className="rounded-sm object-cover shadow-sm"
                            />
                            {country.name}
                        </button>
                    ))}
                </div>

                {/* City Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {cities.map((city) => (
                        <a
                            key={city.name}
                            href="#"
                            className="group relative aspect-[4/5] overflow-hidden rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 block"
                            title={city.name}
                        >
                            <Image
                                src={city.image}
                                alt={city.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width:768px) 50vw, 16vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col gap-1">
                                <span className="text-white text-lg font-bold tracking-tight">
                                    {city.name}
                                </span>
                                <span className="text-amber-100 text-xs font-semibold uppercase tracking-wider">
                                    {city.propertyCount}+ homes
                                </span>
                            </div>
                        </a>
                    ))}
                </div>

                {/* View All */}
                <div className="mt-12 flex justify-center">
                    <a
                        href="#"
                        className="group flex items-center gap-2 px-8 py-4 bg-white border border-slate-200 text-slate-800 rounded-full text-sm lg:text-base font-bold shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
                    >
                        View All Destinations
                        <ArrowUpRight size={18} className="text-amber-red transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                </div>
            </div>
        </section>
    );
}
