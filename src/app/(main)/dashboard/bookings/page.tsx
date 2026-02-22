import { getBookings } from "@/lib/queries";
import Link from "next/link";
import { Home, Calendar, CreditCard, ChevronLeft } from "lucide-react";
import Image from "next/image";

const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-emerald-100 text-emerald-700",
    active: "bg-blue-100 text-blue-700",
    completed: "bg-gray-100 text-gray-600",
    cancelled: "bg-red-100 text-red-600",
};

export default async function MyBookingsPage() {
    const bookings = await getBookings();

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12">
            <div className="max-w-[1000px] mx-auto px-4 lg:px-9">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/dashboard" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white text-gray-500 hover:text-gray-900 transition-colors">
                        <ChevronLeft size={18} />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
                </div>

                {bookings.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <div className="text-6xl mb-4">🏠</div>
                        <h2 className="text-xl font-bold text-gray-900">No bookings yet</h2>
                        <p className="text-gray-500 text-sm mt-2 mb-6 max-w-sm mx-auto">
                            You haven't booked any properties yet. Browse our selection of premium student accommodations to get started.
                        </p>
                        <Link href="/search" className="px-6 py-3 bg-amber-red text-white font-semibold rounded-xl hover:bg-amber-red-hover transition-colors inline-block">
                            Browse Properties
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {bookings.map((booking) => {
                            const sym = booking.property?.currency === 'GBP' ? '£' : (booking.property?.currency || '£');

                            return (
                                <div key={booking.id} className="bg-white rounded-2xl p-4 md:p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6">
                                    {/* Image */}
                                    <Link href={`/property/${booking.property_id}`} className="block relative w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0 group">
                                        <Image
                                            src={booking.property?.images?.[0] || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop"}
                                            alt={booking.property?.title || "Property"}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform"
                                        />
                                    </Link>

                                    {/* Details */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <Link href={`/property/${booking.property_id}`} className="text-lg font-bold text-gray-900 hover:text-amber-red transition-colors line-clamp-1">
                                                        {booking.property?.title}
                                                    </Link>
                                                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                                                        <Home size={14} /> {booking.property?.city}, {booking.property?.country}
                                                    </p>
                                                </div>
                                                <span className={`px-2.5 py-1 text-xs font-bold rounded-lg capitalize tracking-wide ${statusColors[booking.status]}`}>
                                                    {booking.status}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 mt-4">
                                                <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                                                    <p className="text-xs font-medium text-gray-500 flex items-center gap-1.5 mb-1"><Calendar size={12} /> Check In</p>
                                                    <p className="text-sm font-semibold text-gray-900">{booking.check_in}</p>
                                                </div>
                                                <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                                                    <p className="text-xs font-medium text-gray-500 flex items-center gap-1.5 mb-1"><Calendar size={12} /> Check Out</p>
                                                    <p className="text-sm font-semibold text-gray-900">{booking.check_out}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className={`p-1.5 rounded-md ${booking.payment_status === 'paid' ? 'bg-emerald-100 text-emerald-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                                    <CreditCard size={14} />
                                                </div>
                                                <span className="text-sm font-medium text-gray-700 capitalize">
                                                    Payment {booking.payment_status}
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-gray-500 font-medium">Total Amount</p>
                                                <p className="text-lg font-bold text-gray-900">{sym}{(booking.total_amount).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
