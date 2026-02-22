"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Chrome } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const supabase = createClient();
        if (!supabase) {
            setError("Supabase is not configured. Please add your credentials to .env.local");
            setLoading(false);
            return;
        }

        const { error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) {
            setError(authError.message);
            setLoading(false);
            return;
        }

        router.push("/dashboard");
        router.refresh();
    };

    const handleGoogleLogin = async () => {
        const supabase = createClient();
        if (!supabase) {
            setError("Supabase is not configured.");
            return;
        }

        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: { redirectTo: `${window.location.origin}/auth/callback` },
        });
    };

    return (
        <div className="min-h-screen flex">
            {/* Left: Illustration */}
            <div
                className="hidden lg:flex lg:w-[55%] relative items-end justify-start p-12 bg-cover bg-center"
                style={{
                    backgroundImage: `linear-gradient(180deg, rgba(237,58,86,0.15) 0%, rgba(237,58,86,0.6) 100%), url('https://images.unsplash.com/photo-1523050854058-8df90110c476?w=1200&h=900&fit=crop')`,
                }}
            >
                <div className="text-white max-w-lg">
                    <h2 className="text-4xl font-bold leading-tight">
                        Find your <span className="text-nivaas-200">perfect student home</span> with ease
                    </h2>
                    <p className="mt-3 text-lg text-white/80">
                        Join over 1M+ students who trust Nivaas for hassle-free accommodation booking.
                    </p>
                    <div className="flex gap-6 mt-6 text-sm text-white/70">
                        <span>✓ 250+ Cities</span>
                        <span>✓ Verified Listings</span>
                        <span>✓ 24/7 Support</span>
                    </div>
                </div>
            </div>

            {/* Right: Form */}
            <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gray-50">
                <div className="w-full max-w-[420px]">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-1.5 mb-8">
                        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
                            <rect width="32" height="32" rx="8" fill="#ED3A56" />
                            <path d="M16 6L24 24H8L16 6Z" fill="white" opacity="0.9" />
                            <circle cx="16" cy="20" r="3" fill="white" />
                        </svg>
                        <span className="text-[22px] font-bold text-amber-red tracking-tight">nivaas</span>
                    </Link>

                    <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
                    <p className="text-gray-500 mt-1">
                        Sign in to your account to continue
                    </p>

                    {/* Google Login */}
                    <button
                        onClick={handleGoogleLogin}
                        className="mt-6 w-full flex items-center justify-center gap-2.5 h-12 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                        <Chrome size={18} />
                        Continue with Google
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-xs text-gray-400 uppercase tracking-wide">or</span>
                        <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        {/* Email */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1.5">Email</label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@university.edu"
                                    required
                                    className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-amber-red/20 focus:border-amber-red outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="text-sm font-medium text-gray-700">Password</label>
                                <a href="#" className="text-xs text-amber-red hover:underline">Forgot password?</a>
                            </div>
                            <div className="relative">
                                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full h-12 pl-11 pr-12 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-amber-red/20 focus:border-amber-red outline-none transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={cn(
                                "w-full h-12 rounded-lg text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all cursor-pointer",
                                loading ? "bg-gray-400 cursor-not-allowed" : "bg-amber-red hover:bg-amber-red-hover"
                            )}
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight size={16} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Sign up link */}
                    <p className="mt-6 text-center text-sm text-gray-500">
                        Don&apos;t have an account?{" "}
                        <Link href="/auth/signup" className="font-semibold text-amber-red hover:underline">
                            Create one for free
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
