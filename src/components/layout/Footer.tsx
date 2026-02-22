import Link from "next/link";
import { FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import { Linkedin, Facebook, Instagram, Youtube, Twitter } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
    linkedin: <Linkedin size={18} />,
    facebook: <Facebook size={18} />,
    instagram: <Instagram size={18} />,
    youtube: <Youtube size={18} />,
    twitter: <Twitter size={18} />,
};

export function Footer() {
    return (
        <footer className="bg-white py-14 border-t border-gray-100">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-9">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
                    {/* Brand Column */}
                    <div className="lg:w-[35%] lg:pr-10 flex-shrink-0">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-1.5">
                            <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
                                <rect width="32" height="32" rx="8" fill="#ED3A56" />
                                <path d="M16 6L24 24H8L16 6Z" fill="white" opacity="0.9" />
                                <circle cx="16" cy="20" r="3" fill="white" />
                            </svg>
                            <span className="text-[22px] font-bold text-amber-red tracking-tight">amber</span>
                        </Link>
                        <p className="mt-2 text-sm text-gray-500">amber © 2024 All rights reserved</p>

                        {/* Trustpilot */}
                        <div className="mt-4 bg-gray-50 rounded-lg p-4 cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <span key={i} className="w-5 h-5 bg-emerald-500 text-white text-xs flex items-center justify-center rounded-sm">★</span>
                                    ))}
                                </div>
                                <div className="w-0.5 h-7 bg-gray-300" />
                                <span className="text-base font-bold text-gray-800 underline">4.8/5 on Trustpilot</span>
                            </div>
                            <p className="mt-3 text-sm text-gray-500 text-center lg:text-left">
                                Rated as &ldquo;Excellent&rdquo; • <strong>4800+</strong> Reviews by students
                            </p>
                        </div>

                        {/* App & Payment */}
                        <div className="mt-4 bg-gray-50 rounded-lg p-4 flex items-center gap-4">
                            <div className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-gray-500">Get the app</span>
                                <div className="flex gap-3">
                                    <div className="w-5 h-5 bg-gray-300 rounded" />
                                    <div className="w-5 h-5 bg-gray-300 rounded" />
                                </div>
                            </div>
                            <div className="w-0.5 h-14 bg-gray-300 flex-shrink-0" />
                            <div className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-gray-500">Payment Options</span>
                                <div className="flex gap-2 items-center">
                                    <span className="text-xs font-bold text-blue-800 bg-white px-1 rounded border">VISA</span>
                                    <span className="text-xs font-bold text-red-600 bg-white px-1 rounded border">MC</span>
                                    <span className="text-xs font-bold text-blue-500 bg-white px-1 rounded border">AMEX</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Link Columns */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                        {/* Company */}
                        <div className="flex flex-col gap-3">
                            <h4 className="text-sm font-bold text-gray-900 mb-1">Company</h4>
                            {FOOTER_LINKS.company.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm text-gray-500 hover:text-amber-red transition-colors flex items-center gap-2"
                                >
                                    {link.label}
                                    {link.badge && (
                                        <span className="px-1.5 py-0.5 rounded-full bg-amber-red-light text-amber-red text-xs font-medium">
                                            {link.badge}
                                        </span>
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Discover */}
                        <div className="flex flex-col gap-3">
                            <h4 className="text-sm font-bold text-gray-900 mb-1">Discover</h4>
                            {FOOTER_LINKS.discover.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm text-gray-500 hover:text-amber-red transition-colors flex items-center gap-2"
                                >
                                    {link.label}
                                    {link.badge && (
                                        <span className="px-1.5 py-0.5 rounded-full bg-amber-red-light text-amber-red text-xs font-medium">
                                            {link.badge}
                                        </span>
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Support */}
                        <div className="flex flex-col gap-3">
                            <h4 className="text-sm font-bold text-gray-900 mb-1">Support</h4>
                            {FOOTER_LINKS.support.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm text-gray-500 hover:text-amber-red transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Social */}
                        <div className="flex flex-col gap-3">
                            <h4 className="text-sm font-bold text-gray-900 mb-1">Follow us</h4>
                            <div className="flex gap-3">
                                {SOCIAL_LINKS.map((social) => (
                                    <a
                                        key={social.icon}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-gray-500 hover:bg-amber-red-light hover:text-amber-red transition-all"
                                    >
                                        {iconMap[social.icon]}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
