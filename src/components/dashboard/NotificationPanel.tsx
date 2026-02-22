"use client";

import { useState } from "react";
import { Bell, CheckCircle2, MessageCircle, Home } from "lucide-react";

export function NotificationPanel() {
    const [open, setOpen] = useState(false);

    // Mock notifications for demonstration
    const notifications = [
        {
            id: 1,
            title: "Booking Confirmed",
            desc: "Your booking for the London apartment is confirmed.",
            time: "2 mins ago",
            icon: <CheckCircle2 size={16} className="text-emerald-500" />,
            bg: "bg-emerald-50",
            unread: true
        },
        {
            id: 2,
            title: "New Message",
            desc: "You have a new message from a landlord.",
            time: "1 hour ago",
            icon: <MessageCircle size={16} className="text-blue-500" />,
            bg: "bg-blue-50",
            unread: true
        },
        {
            id: 3,
            title: "Property Saved",
            desc: "Price dropped on a property in your wishlist.",
            time: "Yesterday",
            icon: <Home size={16} className="text-amber-500" />,
            bg: "bg-amber-50",
            unread: false
        }
    ];

    const unreadCount = notifications.filter(n => n.unread).length;

    return (
        <div className="relative z-50">
            <button
                onClick={() => setOpen(!open)}
                className="relative w-11 h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
            >
                <Bell size={20} className="text-slate-600" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-brand text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm">
                        {unreadCount}
                    </span>
                )}
            </button>

            {open && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}></div>
                    <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 z-50 overflow-hidden origin-top-right animate-in fade-in slide-in-from-top-4 duration-200">
                        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                            <h3 className="font-bold text-slate-800">Notifications</h3>
                            <button className="text-xs text-amber-red font-semibold hover:underline cursor-pointer">Mark all as read</button>
                        </div>
                        <div className="max-h-[360px] overflow-y-auto hide-scrollbar">
                            {notifications.length === 0 ? (
                                <div className="p-8 text-center text-slate-500 text-sm">No new notifications</div>
                            ) : (
                                notifications.map((n) => (
                                    <div key={n.id} className={`p-4 border-b border-slate-50 flex gap-3 hover:bg-slate-50/50 transition-colors cursor-pointer ${n.unread ? "bg-white" : "bg-slate-50/30"}`}>
                                        <div className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center ${n.bg}`}>
                                            {n.icon}
                                        </div>
                                        <div>
                                            <h4 className={`text-sm tracking-tight ${n.unread ? "font-bold text-slate-900" : "font-semibold text-slate-700"}`}>
                                                {n.title}
                                            </h4>
                                            <p className="text-xs text-slate-500 mt-0.5 leading-snug">{n.desc}</p>
                                            <span className="text-[10px] text-slate-400 font-medium mt-1.5 block">{n.time}</span>
                                        </div>
                                        {n.unread && (
                                            <div className="w-2 h-2 rounded-full bg-amber-red mt-1.5 shrink-0 ml-auto"></div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="p-3 text-center border-t border-slate-100 bg-white">
                            <button className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">View previous notifications</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
