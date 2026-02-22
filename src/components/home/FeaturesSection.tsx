import { FEATURES } from "@/lib/constants";

export function FeaturesSection() {
    return (
        <section className="bg-white py-8 lg:py-12" id="how-it-works">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-9">
                <h2 className="text-lg lg:text-2xl font-semibold lg:font-bold text-gray-800">
                    Book your Perfect Accommodation
                </h2>
                <p className="text-sm lg:text-lg text-gray-500 mt-1">
                    Take the hassle out of securing your student home for the best years of your life
                </p>

                <div className="flex gap-3 overflow-x-auto hide-scrollbar mt-7 lg:mt-8 lg:justify-between lg:overflow-visible">
                    {FEATURES.map((feat) => (
                        <div
                            key={feat.title}
                            className="min-w-[234px] max-w-[234px] lg:min-w-[252px] lg:max-w-[252px] p-3 flex flex-col"
                            style={{
                                background:
                                    feat.color === "red"
                                        ? "radial-gradient(50% 50% at 50% 50%, rgba(237,58,86,0.08) 0%, rgba(237,58,86,0) 100%)"
                                        : "radial-gradient(50% 50% at 50% 50%, rgba(132,225,188,0.10) 0%, rgba(132,225,188,0) 100%)",
                            }}
                        >
                            <div className="text-3xl">{feat.icon}</div>
                            <h3 className="text-sm lg:text-xl font-medium lg:font-bold text-gray-700 mt-4">
                                {feat.title}
                            </h3>
                            <p className="text-xs lg:text-sm text-gray-500 mt-1 lg:mt-2 leading-relaxed">
                                {feat.description}
                                {feat.cta && (
                                    <a href="#" className="block mt-0.5 text-gray-700 font-bold text-xs underline hover:text-amber-red transition-colors">
                                        {feat.cta}
                                    </a>
                                )}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
