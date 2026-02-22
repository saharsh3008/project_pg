"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { User } from "@supabase/supabase-js";

export function Header({ user }: { user?: User | null }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-500",
                    scrolled
                        ? "glass-panel"
                        : "bg-transparent"
                )}
            >
                <div className="flex items-center justify-between h-full max-w-[1440px] mx-auto px-4 lg:px-9">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 z-10 group">
                        <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-lg group-hover:shadow-amber-red/30 transition-shadow">
                            <svg className="w-5 h-5 text-white" viewBox="0 0 32 32" fill="none">
                                <path d="M16 6L24 24H8L16 6Z" fill="currentColor" opacity="0.9" />
                                <circle cx="16" cy="20" r="3" fill="currentColor" />
                            </svg>
                        </div>
                        <span
                            className={cn(
                                "text-2xl font-extrabold tracking-tight transition-colors duration-300",
                                scrolled ? "text-gray-900" : "text-white"
                            )}
                        >
                            Nivaas
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium relative transition-colors duration-200",
                                    "after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-amber-red after:transition-all after:duration-300 hover:after:w-full",
                                    scrolled
                                        ? "text-gray-500 hover:text-amber-red"
                                        : "text-white/90 hover:text-white"
                                )}
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                        {user ? (
                            <Link
                                href="/dashboard"
                                className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all"
                            >
                                <div className="w-5 h-5 rounded-full bg-gradient-brand flex items-center justify-center text-[10px] text-white font-bold">
                                    {user.email?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href="/auth/login"
                                className="hidden md:inline-flex items-center px-6 py-2.5 rounded-full text-sm font-semibold bg-gradient-brand text-white hover:bg-gradient-brand-hover shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
                            >
                                Login / Sign Up
                            </Link>
                        )}

                        {/* Hamburger */}
                        <button
                            className="flex md:hidden flex-col gap-[5px] p-1 z-10"
                            onClick={() => setMobileOpen(true)}
                            aria-label="Open menu"
                        >
                            <span className={cn("w-[22px] h-0.5 rounded transition-colors", scrolled ? "bg-gray-900" : "bg-white")} />
                            <span className={cn("w-[22px] h-0.5 rounded transition-colors", scrolled ? "bg-gray-900" : "bg-white")} />
                            <span className={cn("w-[22px] h-0.5 rounded transition-colors", scrolled ? "bg-gray-900" : "bg-white")} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile nav drawer */}
            <div
                className={cn(
                    "fixed inset-0 z-50 bg-black/40 transition-opacity duration-300",
                    mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setMobileOpen(false)}
            />
            <aside
                className={cn(
                    "fixed top-0 right-0 z-50 w-72 h-screen bg-white shadow-xl transition-transform duration-300 flex flex-col p-6 pt-20 gap-5",
                    mobileOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <button
                    className="absolute top-5 right-5 text-gray-400 hover:text-gray-700"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close menu"
                >
                    <X size={24} />
                </button>
                {NAV_LINKS.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        className="text-base font-medium text-gray-700 py-3 border-b border-gray-100 hover:text-amber-red transition-colors"
                        onClick={() => setMobileOpen(false)}
                    >
                        {link.label}
                    </a>
                ))}
                {user ? (
                    <Link
                        href="/dashboard"
                        className="text-base font-semibold text-amber-red py-3 flex items-center gap-2"
                        onClick={() => setMobileOpen(false)}
                    >
                        <div className="w-6 h-6 rounded-full bg-gradient-brand flex items-center justify-center text-white text-xs">
                            {user.email?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        My Dashboard
                    </Link>
                ) : (
                    <Link
                        href="/auth/login"
                        className="text-base font-semibold text-amber-red py-3"
                        onClick={() => setMobileOpen(false)}
                    >
                        Login / Sign Up
                    </Link>
                )}
            </aside>
        </>
    );
}
