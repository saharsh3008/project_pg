"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { SEARCH_WORDS } from "@/lib/constants";

export function HeroSection() {
    const [activeWord, setActiveWord] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveWord((prev) => (prev + 1) % SEARCH_WORDS.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            className="relative w-full min-h-[520px] flex items-end justify-center px-4 pb-12 bg-cover bg-center bg-no-repeat text-white"
            style={{
                backgroundImage: `linear-gradient(360deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 65%), url('https://images.unsplash.com/photo-1523050854058-8df90110c476?w=1600&h=900&fit=crop')`,
            }}
        >
            <div className="relative z-2 flex flex-col items-center w-full max-w-[700px]">
                {/* Heading */}
                <h1 className="text-2xl md:text-[56px] font-semibold leading-tight md:leading-[1.1] text-center">
                    Your Ideal PG Space, Just a Click Away!
                </h1>
                <p className="text-sm md:text-xl font-normal text-center opacity-95 mt-1">
                    Book student accommodations near top universities and cities across the globe.
                </p>

                {/* Badges */}
                <div className="flex items-center justify-center flex-wrap gap-1 md:gap-4 mt-1 md:mt-2">
                    {[
                        { icon: "✓", text: "Verified Properties" },
                        { icon: "☎", text: "24x7 Assistance" },
                        { icon: "💰", text: "Price Match Guarantee" },
                    ].map((b) => (
                        <div
                            key={b.text}
                            className="inline-flex items-center gap-1 px-2 py-1 md:px-4 md:py-2 rounded-2xl bg-black/50 backdrop-blur-sm text-[10px] md:text-sm text-white"
                        >
                            <span className="text-amber-red">{b.icon}</span>
                            <span>{b.text}</span>
                        </div>
                    ))}
                </div>

                {/* Search Bar */}
                <div className="w-full mt-4">
                    <div className="relative flex items-center min-h-[54px] md:min-h-[76px] bg-white rounded-full px-2 pr-3.5 shadow-lg">
                        {/* Animated placeholder */}
                        {!isFocused && (
                            <div className="absolute left-5 md:left-6 flex items-center gap-1 text-gray-400 text-sm md:text-lg pointer-events-none overflow-hidden whitespace-nowrap">
                                <span>Search by</span>
                                <span className="font-medium text-gray-500 ml-1">
                                    {SEARCH_WORDS[activeWord]}
                                </span>
                            </div>
                        )}

                        <input
                            ref={inputRef}
                            type="text"
                            className="w-full h-full border-none outline-none bg-transparent pl-3 pr-4 text-sm md:text-lg text-gray-500 rounded-full"
                            aria-label="Search for student accommodation"
                            onFocus={() => setIsFocused(true)}
                            onBlur={(e) => { if (!e.target.value) setIsFocused(false); }}
                        />

                        <button
                            className="flex-shrink-0 flex items-center justify-center w-[38px] h-[38px] md:w-[50px] md:h-[50px] rounded-full bg-amber-red text-white hover:bg-amber-red-hover transition-colors cursor-pointer"
                            aria-label="Search"
                        >
                            <Search size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
