import { STATS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function StatsSection() {
    return (
        <section className="bg-white py-8 lg:py-12">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-9">
                <div className="flex gap-3 overflow-x-auto hide-scrollbar lg:justify-between lg:overflow-visible">
                    {STATS.map((stat) => (
                        <div
                            key={stat.title}
                            className="min-w-[234px] max-w-[234px] lg:min-w-[252px] lg:max-w-[252px] p-6 flex flex-col bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group"
                        >
                            <div className={cn(
                                "w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5 shadow-inner transition-transform group-hover:scale-110",
                                stat.color === "red" ? "bg-rose-50 text-rose-500" : "bg-emerald-50 text-emerald-500"
                            )}>
                                {stat.icon}
                            </div>
                            <h3 className="text-base lg:text-xl font-bold text-slate-800 leading-snug">
                                {stat.title}
                            </h3>
                            <p className="text-xs lg:text-sm text-slate-500 mt-2 leading-relaxed font-medium">
                                {stat.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
