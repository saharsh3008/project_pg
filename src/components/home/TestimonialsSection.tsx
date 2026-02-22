"use client";

import { useRef } from "react";
import { TESTIMONIALS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export function TestimonialsSection() {
    const trackRef = useRef<HTMLDivElement>(null);

    const scroll = (dir: "left" | "right") => {
        if (!trackRef.current) return;
        trackRef.current.scrollBy({
            left: dir === "left" ? -340 : 340,
            behavior: "smooth",
        });
    };

    return (
        <section className="bg-gray-50 py-8 lg:py-12" id="reviews">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-9">
                <h2 className="text-lg lg:text-2xl font-semibold lg:font-bold text-gray-800">
                    What do students have to say about us?
                </h2>
                <p className="text-sm lg:text-lg text-gray-500 mt-1">
                    Over 1M students trust amber for their student housing needs ;)
                </p>

                {/* Trustpilot badge */}
                <div className="flex items-center gap-1.5 mt-4 lg:mt-8 mb-4 lg:mb-6 px-2 lg:px-3 py-1.5 lg:py-2 w-fit border border-gray-200 rounded-full cursor-pointer">
                    <span className="text-gray-400">☆</span>
                    <span className="text-sm lg:text-base font-medium lg:font-bold text-gray-500">Trustpilot</span>
                    <span className="px-2.5 py-1 bg-emerald-500 text-white rounded-2xl text-sm lg:text-base font-bold">
                        4.8/5
                    </span>
                </div>

                {/* Carousel */}
                <div className="relative">
                    {/* Nav buttons */}
                    <button
                        onClick={() => scroll("left")}
                        className="hidden md:flex absolute left-[-18px] top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-gray-300 shadow-sm items-center justify-center hover:bg-gray-50 cursor-pointer"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="hidden md:flex absolute right-[-18px] top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-gray-300 shadow-sm items-center justify-center hover:bg-gray-50 cursor-pointer"
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={16} />
                    </button>

                    {/* Track */}
                    <div
                        ref={trackRef}
                        className="flex gap-4 overflow-x-auto scroll-smooth hide-scrollbar pb-1"
                    >
                        {TESTIMONIALS.map((t) => (
                            <div
                                key={t.name}
                                className="flex-shrink-0 w-[315px] h-[178px] md:w-[492px] md:h-[236px] p-4 md:p-6 border border-gray-200 rounded-xl bg-white flex flex-col hover:-translate-y-0.5 hover:shadow-md transition-all"
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3 md:gap-4">
                                        <div
                                            className={cn(
                                                "w-8 h-8 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white text-xs md:text-xl font-bold flex-shrink-0 bg-gradient-to-br",
                                                t.avatarGradient
                                            )}
                                        >
                                            {t.initials}
                                        </div>
                                        <div>
                                            <div className="text-xs md:text-xl font-semibold">{t.name}</div>
                                            <div className="text-xs md:text-base text-gray-500 mt-0.5">{t.university}</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-0.5 text-orange-400 text-sm md:text-lg flex-shrink-0">
                                        {Array.from({ length: t.rating }).map((_, i) => (
                                            <span key={i}>★</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Comment */}
                                <p className="mt-2 md:mt-5 text-xs md:text-base text-gray-500 leading-relaxed line-clamp-4">
                                    {t.comment}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Read All */}
                <a
                    href="https://www.trustpilot.com/review/amberstudent.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 md:mt-8 flex items-center gap-1.5 w-full md:w-fit mx-auto justify-center px-4 md:px-6 py-3 md:py-4 border border-amber-red text-amber-red rounded text-sm md:text-base font-medium hover:bg-amber-red-light transition-colors"
                >
                    Read All Reviews
                    <ArrowRight size={16} />
                </a>
            </div>
        </section>
    );
}
