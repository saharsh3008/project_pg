import Link from "next/link";
import { Home, Search, Heart, Calendar, MessageCircle, Settings, Bell, Plus } from "lucide-react";
import { getBookings } from "@/lib/queries";
import { createClient } from "@/lib/supabase/server";
import { NotificationPanel } from "@/components/dashboard/NotificationPanel";

export const dynamic = "force-dynamic";

const QUICK_ACTIONS = [
    { icon: <Search size={20} />, label: "Find Properties", href: "/search", color: "bg-blue-50 text-blue-600" },
    { icon: <Heart size={20} />, label: "Wishlisted", href: "/dashboard/wishlists", color: "bg-pink-50 text-pink-600" },
    { icon: <Calendar size={20} />, label: "My Bookings", href: "/dashboard/bookings", color: "bg-emerald-50 text-emerald-600" },
    { icon: <MessageCircle size={20} />, label: "Messages", href: "/dashboard/messages", color: "bg-purple-50 text-purple-600" },
    { icon: <Settings size={20} />, label: "Settings", href: "/dashboard/settings", color: "bg-gray-100 text-gray-600" },
    { icon: <Plus size={20} />, label: "List Property", href: "/dashboard/list-property", color: "bg-amber-50 text-amber-600" },
];

const RECENT_BOOKINGS = [
    { id: "1", property: "Moonraker Point", city: "London", status: "confirmed", date: "Sep 2025 - Jun 2026", price: "£1,200/mo" },
    { id: "2", property: "Chapter Kings Cross", city: "London", status: "pending", date: "Oct 2025 - Jul 2026", price: "£980/mo" },
];

const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-emerald-100 text-emerald-700",
    active: "bg-blue-100 text-blue-700",
    completed: "bg-gray-100 text-gray-600",
    cancelled: "bg-red-100 text-red-600",
};

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Auth check
    if (!user) {
        return <div className="p-8 text-center text-red-500">Not authenticated</div>;
    }

    const bookings = await getBookings();
    const recentBookings = bookings.slice(0, 3); // top 3

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12">
            <div className="max-w-[1200px] mx-auto px-4 lg:px-9">
                {/* Welcome */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Welcome back! 👋</h1>
                        <p className="text-sm text-gray-500 mt-1">Here&apos;s what&apos;s happening with your account</p>
                    </div>
                    <NotificationPanel />
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: "Saved Properties", value: "12", icon: <Heart size={18} />, color: "text-pink-500" },
                        { label: "Active Bookings", value: bookings.length.toString(), icon: <Calendar size={18} />, color: "text-emerald-500" },
                        { label: "Unread Messages", value: "3", icon: <MessageCircle size={18} />, color: "text-blue-500" },
                        { label: "Reviews Given", value: "5", icon: <Home size={18} />, color: "text-amber-500" },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-white rounded-xl p-4 border border-gray-100">
                            <div className={`${stat.color} mb-2`}>{stat.icon}</div>
                            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                            <div className="text-xs text-gray-500">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Quick Actions */}
                    <div className="lg:col-span-1">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-2 gap-3">
                            {QUICK_ACTIONS.map((action) => (
                                <Link
                                    key={action.label}
                                    href={action.href}
                                    className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all"
                                >
                                    <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center`}>
                                        {action.icon}
                                    </div>
                                    <span className="text-xs font-medium text-gray-700">{action.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Recent Bookings */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
                            <Link href="/dashboard/bookings" className="text-xs text-amber-red font-medium hover:underline">
                                View all →
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {recentBookings.map((booking) => {
                                const sym = booking.property?.currency === 'GBP' ? '£' : (booking.property?.currency || '£');
                                return (
                                    <div key={booking.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:shadow-sm transition-shadow gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-red/20 to-amber-red/5 flex items-center justify-center text-amber-red shrink-0">
                                                <Home size={20} />
                                            </div>
                                            <div>
                                                <Link href={`/property/${booking.property_id}`} className="text-sm font-semibold text-gray-900 hover:text-amber-red hover:underline">
                                                    {booking.property?.title}
                                                </Link>
                                                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                                                    <span>{booking.property?.city}</span>
                                                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                                    <span>{booking.check_in} — {booking.check_out}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 self-end sm:self-auto">
                                            <span className="text-sm font-semibold text-gray-900">{sym}{booking.total_amount.toLocaleString()} <span className="text-xs text-gray-400 font-normal">total</span></span>
                                            <span className={`px-2.5 py-1 text-[11px] font-semibold rounded-md capitalize ${statusColors[booking.status]}`}>
                                                {booking.status}
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}

                            {recentBookings.length === 0 && (
                                <div className="text-center py-8 bg-white rounded-xl border border-gray-100">
                                    <div className="text-4xl mb-2">📋</div>
                                    <p className="text-sm text-gray-500">No bookings yet</p>
                                    <Link href="/search" className="text-sm text-amber-red font-medium hover:underline mt-1 inline-block">
                                        Browse properties →
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
