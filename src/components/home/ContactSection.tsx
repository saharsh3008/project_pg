export function ContactSection() {
    return (
        <section className="bg-gray-50 py-8 lg:py-12" id="contact">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-9">
                <div className="flex flex-col lg:flex-row gap-7 items-baseline">
                    {/* Text */}
                    <div>
                        <h3 className="text-lg lg:text-2xl font-semibold lg:font-bold text-gray-800">
                            Need Help? Connect with us!
                        </h3>
                        <p className="text-sm lg:text-xl text-gray-500 mt-1">
                            Feel free to contact us in case you have any queries.
                        </p>
                    </div>

                    {/* Contact Cards */}
                    <div className="flex gap-4 flex-wrap flex-1 lg:justify-end">
                        {/* Live Chat */}
                        <a
                            href="#"
                            className="relative rounded-xl h-[88px] lg:h-[117px] w-[165px] bg-white border border-rose-300 flex flex-col items-center justify-center gap-2 lg:gap-3 hover:-translate-y-0.5 transition-transform"
                        >
                            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs border px-2 py-1 rounded bg-amber-red text-white flex items-center gap-1 whitespace-nowrap">
                                <span className="w-[7px] h-[7px] rounded-full bg-white" />
                                2 Mins Reply
                            </span>
                            <span className="text-2xl">💬</span>
                            <span className="text-sm font-medium text-gray-500">Live Chat</span>
                        </a>

                        {/* WhatsApp */}
                        <a
                            href="https://wa.me/447888863490"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative rounded-xl h-[88px] lg:h-[117px] w-[165px] bg-white border border-emerald-200 flex flex-col items-center justify-center gap-2 lg:gap-3 hover:-translate-y-0.5 transition-transform"
                        >
                            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs border px-2 py-1 rounded bg-emerald-500 text-white flex items-center gap-1 whitespace-nowrap">
                                <span className="w-[7px] h-[7px] rounded-full bg-white" />
                                2 Mins Reply
                            </span>
                            <span className="text-2xl">📱</span>
                            <span className="text-sm font-medium text-gray-500">Chat on WhatsApp</span>
                        </a>

                        {/* Email */}
                        <a
                            href="mailto:contact@amberstudent.com"
                            className="relative rounded-xl h-[88px] lg:h-[117px] w-[165px] bg-white border border-gray-100 flex flex-col items-center justify-center gap-2 lg:gap-3 hover:-translate-y-0.5 transition-transform"
                        >
                            <span className="text-2xl">✉️</span>
                            <span className="text-sm font-medium text-gray-500">Email Us</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
