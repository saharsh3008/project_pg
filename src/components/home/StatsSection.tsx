import { STATS } from "@/lib/constants";

export function StatsSection() {
    return (
        <section className="bg-white py-8 lg:py-12">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-9">
                <div className="flex gap-3 overflow-x-auto hide-scrollbar lg:justify-between lg:overflow-visible">
                    {STATS.map((stat) => (
                        <div
                            key={stat.title}
                            className="min-w-[234px] max-w-[234px] lg:min-w-[252px] lg:max-w-[252px] p-3 flex flex-col"
                            style={{
                                background:
                                    stat.color === "red"
                                        ? "radial-gradient(50% 50% at 50% 50%, rgba(237,58,86,0.08) 0%, rgba(237,58,86,0) 100%)"
                                        : "radial-gradient(50% 50% at 50% 50%, rgba(132,225,188,0.10) 0%, rgba(132,225,188,0) 100%)",
                            }}
                        >
                            <div className="text-3xl lg:text-4xl">{stat.icon}</div>
                            <h3 className="text-sm lg:text-xl font-medium lg:font-bold text-gray-700 mt-4 leading-snug">
                                {stat.title}
                            </h3>
                            <p className="text-xs lg:text-sm text-gray-500 mt-1 lg:mt-2 leading-relaxed">
                                {stat.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
