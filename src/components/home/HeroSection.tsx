"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { SEARCH_WORDS } from "@/lib/constants";

export function HeroSection() {
    const router = useRouter();
    const [activeWord, setActiveWord] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        } else {
            router.push("/search");
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveWord((prev) => (prev + 1) % SEARCH_WORDS.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center px-4 overflow-hidden">
            {/* Background Image & Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1523050854058-8df90110c476?w=2000&h=1000&fit=crop')`,
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/90" />

            <div className="relative z-10 flex flex-col items-center w-full max-w-[800px] mt-16">
                {/* Badges */}
                <div className="flex items-center justify-center flex-wrap gap-2 md:gap-3 mb-6">
                    {[
                        { icon: "✓", text: "Verified Properties" },
                        { icon: "🛡️", text: "Secure Booking" },
                        { icon: "💎", text: "Price Match Guarantee" },
                    ].map((b) => (
                        <div
                            key={b.text}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] md:text-sm text-white font-medium shadow-xl"
                        >
                            <span className="text-amber-red">{b.icon}</span>
                            <span>{b.text}</span>
                        </div>
                    ))}
                </div>

                {/* Heading */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-center text-white mb-4 drop-shadow-lg tracking-tight">
                    Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-red">Perfect Home</span> Away From Home
                </h1>
                <p className="text-base md:text-xl font-medium text-center text-slate-200 max-w-[600px] mb-10 drop-shadow-md">
                    Book student accommodations near top universities across the globe with zero hassle.
                </p>

                {/* Search Bar - Glassmorphism */}
                <div className="w-full relative">
                    <div className="absolute -inset-1 bg-gradient-brand rounded-[2rem] blur-md opacity-30"></div>
                    <form onSubmit={handleSearch} className="relative flex items-center min-h-[64px] md:min-h-[80px] bg-white/95 backdrop-blur-xl rounded-[2rem] pl-6 pr-2 py-2 shadow-2xl border border-white/50">
                        {/* Animated placeholder */}
                        {!isFocused && !query && (
                            <div className="absolute left-6 flex items-center gap-1.5 text-slate-400 text-sm md:text-lg pointer-events-none overflow-hidden whitespace-nowrap">
                                <span>Search by</span>
                                <span className="font-semibold text-slate-600 ml-1">
                                    {SEARCH_WORDS[activeWord]}
                                </span>
                            </div>
                        )}

                        <input
                            ref={inputRef}
                            type="text"
                            className="w-full h-full border-none outline-none bg-transparent pr-4 text-base md:text-lg text-slate-700 font-medium"
                            aria-label="Search for student accommodation"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={(e) => { if (!e.target.value) setIsFocused(false); }}
                        />

                        <button
                            type="submit"
                            className="flex-shrink-0 flex items-center justify-center w-[48px] h-[48px] md:w-[64px] md:h-[64px] rounded-full bg-gradient-brand text-white hover:bg-gradient-brand-hover hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
                            aria-label="Search"
                        >
                            <Search size={24} className="ml-0.5" />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
