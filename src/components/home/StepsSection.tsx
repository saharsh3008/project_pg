import { BOOKING_STEPS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export function StepsSection() {
    return (
        <section className="bg-gray-50 py-8 lg:py-12">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-9">
                <h2 className="text-lg lg:text-2xl font-semibold lg:font-bold text-gray-800">
                    Book your student accommodation in 3 easy steps
                </h2>
                <p className="text-sm lg:text-lg text-gray-500 mt-1">
                    Book places in major cities and universities across the globe
                </p>

                <div className="flex gap-2 md:gap-4 overflow-x-auto hide-scrollbar mt-7 lg:mt-8 md:justify-center pb-1">
                    {BOOKING_STEPS.map((step, i) => (
                        <div key={step.step} className="flex items-center gap-2 md:gap-4">
                            <div className="relative flex-shrink-0 w-[270px] md:w-auto md:flex-1 md:max-w-[350px] bg-white border border-gray-200 rounded-lg md:rounded-xl p-6 pl-10 md:p-6 flex flex-col">
                                {/* Number Circle */}
                                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center text-xl font-bold text-gray-500">
                                    {step.step}
                                </div>

                                <div className="text-3xl md:text-4xl mb-3">{step.icon}</div>
                                <h3 className="text-sm md:text-lg font-bold text-gray-900 mt-4">{step.title}</h3>
                                <p className="text-xs md:text-sm text-gray-500 mt-1 md:mt-2">{step.description}</p>
                            </div>

                            {/* Arrow between steps */}
                            {i < BOOKING_STEPS.length - 1 && (
                                <div className="flex-shrink-0 text-gray-300 text-xl md:text-3xl">
                                    <ArrowRight size={24} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
