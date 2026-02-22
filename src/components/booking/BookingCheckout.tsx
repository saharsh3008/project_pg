"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createBooking } from "@/lib/actions";
import { Calendar, CreditCard, ShieldCheck, MapPin } from "lucide-react";
import type { Property } from "@/types";

export function BookingCheckout({
    property,
    initialCheckIn,
    initialCheckOut,
    user
}: {
    property: Property;
    initialCheckIn?: string;
    initialCheckOut?: string;
    user: any;
}) {
    const router = useRouter();

    const [checkIn, setCheckIn] = useState(initialCheckIn || "");
    const [checkOut, setCheckOut] = useState(initialCheckOut || "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    // Calculate duration in months (roughly) and total cost
    const { months, total, deposit } = useMemo(() => {
        if (!checkIn || !checkOut) return { months: 0, total: 0, deposit: 0 };

        const start = new Date(checkIn);
        const end = new Date(checkOut);

        // Calculate difference in months
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        let m = Math.max(1, Math.round(diffDays / 30));

        // Don't allow negative or over 48 months
        if (m < 0) m = 0;
        if (m > 48) m = 48;

        const t = m * property.price_per_month;
        return {
            months: m,
            total: t,
            deposit: property.price_per_month // Usually 1 month rent as deposit
        };
    }, [checkIn, checkOut, property.price_per_month]);

    const currencySymbols: Record<string, string> = { GBP: "£", USD: "$", EUR: "€", AUD: "A$", CAD: "C$" };
    const sym = currencySymbols[property.currency] || "£";

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!checkIn || !checkOut) {
            setError("Please select both check-in and check-out dates.");
            return;
        }

        setLoading(true);
        setError(null);

        // Creates the booking in the generic "pending" state (Simulating a successful checkout)
        const { success, error: apiError } = await createBooking({
            property_id: property.id,
            room_type: "single", // Defaulting to single for now
            check_in: checkIn,
            check_out: checkOut,
            total_amount: total,
        });

        if (success) {
            setSuccess(true);
            setTimeout(() => {
                router.push("/dashboard");
            }, 3000);
        } else {
            setError(apiError || "Failed to process booking");
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="bg-white rounded-2xl p-12 border border-gray-100 shadow-sm text-center">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck size={40} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    Your booking for {property.title} has been successfully submitted. We've notified the landlord.
                </p>
                <p className="text-sm font-semibold text-gray-400">Redirecting to your dashboard...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Form */}
            <div className="flex-1 space-y-6">
                {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
                        {error}
                    </div>
                )}

                <form id="checkout-form" onSubmit={handleBooking} className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-8">

                    {/* 1. Dates */}
                    <section>
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-gray-100 text-gray-900 flex items-center justify-center text-sm">1</span>
                            Your Trip
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                                <div className="relative">
                                    <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input required type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full h-12 pl-10 pr-4 border border-gray-200 rounded-xl text-sm focus:border-amber-red focus:ring-1 focus:ring-amber-red outline-none bg-white" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                                <div className="relative">
                                    <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input required type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full h-12 pl-10 pr-4 border border-gray-200 rounded-xl text-sm focus:border-amber-red focus:ring-1 focus:ring-amber-red outline-none bg-white" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 2. Guest Info */}
                    <section className="pt-6 border-t border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-gray-100 text-gray-900 flex items-center justify-center text-sm">2</span>
                            Guest Details
                        </h3>
                        <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-600">
                            <p>Booking as <strong>{user?.email}</strong></p>
                            <p className="mt-1 text-xs">If you need to update your profile information, you can do so from your Dashboard settings later.</p>
                        </div>
                    </section>

                    {/* 3. Payment Method (Mocked) */}
                    <section className="pt-6 border-t border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-gray-100 text-gray-900 flex items-center justify-center text-sm">3</span>
                            Payment Method
                        </h3>
                        <div className="border border-gray-200 rounded-xl overflow-hidden mb-4">
                            <div className="p-4 flex items-center gap-4 border-b border-gray-200 bg-gray-50">
                                <input type="radio" checked readOnly className="w-4 h-4 text-amber-red focus:ring-amber-red accent-amber-red" />
                                <div className="flex items-center gap-2 flex-1">
                                    <CreditCard size={20} className="text-gray-500" />
                                    <span className="font-medium text-gray-900 text-sm">Credit or Debit Card</span>
                                </div>
                            </div>
                            <div className="p-4 space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Card Number</label>
                                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full h-12 px-4 border border-gray-200 rounded-lg text-sm bg-gray-50 cursor-not-allowed" disabled />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Expiration</label>
                                        <input type="text" placeholder="MM/YY" className="w-full h-12 px-4 border border-gray-200 rounded-lg text-sm bg-gray-50 cursor-not-allowed" disabled />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">CVC</label>
                                        <input type="text" placeholder="123" className="w-full h-12 px-4 border border-gray-200 rounded-lg text-sm bg-gray-50 cursor-not-allowed" disabled />
                                    </div>
                                </div>
                                <p className="text-xs text-amber-600 bg-amber-50 p-3 rounded-lg flex items-start gap-2">
                                    <span className="shrink-0 mt-0.5">ℹ️</span>
                                    <span><strong>Test Mode:</strong> No actual payment details are required right now. Clicking "Confirm & Pay" will create the booking and mark the payment as pending.</span>
                                </p>
                            </div>
                        </div>
                    </section>

                </form>
            </div>

            {/* Right: Summary Sidebar */}
            <div className="lg:w-[400px]">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm sticky top-24 overflow-hidden">
                    {/* Property Card Info */}
                    <div className="p-6 border-b border-gray-100 flex gap-4">
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
                            <Image
                                src={property.images?.[0] || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop"}
                                alt="Property" fill className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{property.title}</h3>
                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><MapPin size={12} /> {property.city}, {property.country}</p>
                            <div className="mt-2 inline-block px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-medium rounded capitalize">
                                {property.type}
                            </div>
                        </div>
                    </div>

                    {/* Pricing breakdown */}
                    <div className="p-6 space-y-4">
                        <h3 className="font-bold text-gray-900 text-lg mb-4">Price Details</h3>

                        <div className="flex justify-between text-sm text-gray-600">
                            <span>{sym}{property.price_per_month} x {months} months</span>
                            <span>{sym}{total.toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Service Fee</span>
                            <span>{sym}0</span>
                        </div>

                        <div className="flex justify-between text-sm text-gray-600 border-b border-gray-100 pb-4">
                            <span>Taxes</span>
                            <span>Included</span>
                        </div>

                        <div className="flex justify-between items-end pt-2">
                            <span className="font-bold text-gray-900">Total (GBP)</span>
                            <span className="text-xl font-bold text-gray-900">{sym}{total.toLocaleString()}</span>
                        </div>

                        {/* Pay Now vs Pay Later logic */}
                        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mt-6">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-semibold text-emerald-800 text-sm">Due Now (Deposit)</span>
                                <span className="font-bold text-emerald-800 text-lg">{sym}{(deposit).toLocaleString()}</span>
                            </div>
                            <p className="text-xs text-emerald-600">Pay the first month now to secure your room. The rest is due based on your tenancy agreement.</p>
                        </div>

                        <button
                            type="submit"
                            form="checkout-form"
                            disabled={loading || total === 0}
                            className="w-full h-12 mt-6 rounded-xl bg-amber-red text-white font-semibold text-sm hover:bg-amber-red-hover transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Processing..." : `Confirm & Pay ${sym}${deposit.toLocaleString()}`}
                        </button>
                        <p className="text-[11px] text-gray-400 text-center mt-3 flex items-center justify-center gap-1">
                            <ShieldCheck size={14} /> Secure Booking Guarantee
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
