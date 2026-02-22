"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Chrome } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export default function SignupPage() {
    const router = useRouter();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState<"student" | "landlord">("student");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            setLoading(false);
            return;
        }

        const supabase = createClient();
        if (!supabase) {
            setError("Supabase is not configured. Please add your credentials to .env.local");
            setLoading(false);
            return;
        }

        const { error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    role,
                },
            },
        });

        if (authError) {
            setError(authError.message);
            setLoading(false);
            return;
        }

        setSuccess(true);
        setLoading(false);
    };

    const handleGoogleSignup = async () => {
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

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="max-w-md text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center text-3xl">✅</div>
                    <h2 className="text-2xl font-bold text-gray-900">Check your email!</h2>
                    <p className="text-gray-500 mt-2">
                        We&apos;ve sent a confirmation link to <strong>{email}</strong>.
                        Click the link in the email to activate your account.
                    </p>
                    <Link
                        href="/auth/login"
                        className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-lg bg-amber-red text-white font-semibold hover:bg-amber-red-hover transition-colors"
                    >
                        Go to Login
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex">
            {/* Left: Illustration */}
            <div
                className="hidden lg:flex lg:w-[55%] relative items-end justify-start p-12 bg-cover bg-center"
                style={{
                    backgroundImage: `linear-gradient(180deg, rgba(237,58,86,0.15) 0%, rgba(237,58,86,0.6) 100%), url('https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&h=900&fit=crop')`,
                }}
            >
                <div className="text-white max-w-lg">
                    <h2 className="text-4xl font-bold leading-tight">
                        Start your <span className="text-amber-200">new chapter</span> today
                    </h2>
                    <p className="mt-3 text-lg text-white/80">
                        Create your free account and discover thousands of verified student accommodations worldwide.
                    </p>
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
                        <span className="text-[22px] font-bold text-amber-red tracking-tight">amber</span>
                    </Link>

                    <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
                    <p className="text-gray-500 mt-1">Join 1M+ students finding their perfect home</p>

                    {/* Google Login */}
                    <button
                        onClick={handleGoogleSignup}
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

                    {/* Role Selector */}
                    <div className="flex gap-2 mb-4">
                        <button
                            type="button"
                            onClick={() => setRole("student")}
                            className={cn(
                                "flex-1 h-10 rounded-lg text-sm font-medium transition-all cursor-pointer",
                                role === "student"
                                    ? "bg-amber-red text-white"
                                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                            )}
                        >
                            🎓 I&apos;m a Student
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole("landlord")}
                            className={cn(
                                "flex-1 h-10 rounded-lg text-sm font-medium transition-all cursor-pointer",
                                role === "landlord"
                                    ? "bg-amber-red text-white"
                                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                            )}
                        >
                            🏠 I&apos;m a Landlord
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSignup} className="flex flex-col gap-4">
                        {/* Name */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1.5">Full Name</label>
                            <div className="relative">
                                <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="John Doe"
                                    required
                                    className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-amber-red/20 focus:border-amber-red outline-none transition-all"
                                />
                            </div>
                        </div>

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
                            <label className="text-sm font-medium text-gray-700 block mb-1.5">Password</label>
                            <div className="relative">
                                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Min 6 characters"
                                    required
                                    minLength={6}
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
                            {/* Strength indicator */}
                            <div className="flex gap-1 mt-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "h-1 flex-1 rounded-full transition-colors",
                                            password.length >= i * 3
                                                ? password.length >= 10 ? "bg-green-500" : password.length >= 6 ? "bg-amber-400" : "bg-red-400"
                                                : "bg-gray-200"
                                        )}
                                    />
                                ))}
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
                                    Create Account
                                    <ArrowRight size={16} />
                                </>
                            )}
                        </button>

                        <p className="text-xs text-gray-400 text-center">
                            By signing up, you agree to our{" "}
                            <a href="/terms" className="text-amber-red hover:underline">Terms</a> and{" "}
                            <a href="/privacy" className="text-amber-red hover:underline">Privacy Policy</a>
                        </p>
                    </form>

                    {/* Login link */}
                    <p className="mt-6 text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link href="/auth/login" className="font-semibold text-amber-red hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
