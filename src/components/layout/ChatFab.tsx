"use client";

import { MessageCircle } from "lucide-react";

export function ChatFab() {
    return (
        <button
            className="fixed bottom-4 right-4 z-[999] w-16 h-16 rounded-full bg-amber-red text-white flex items-center justify-center shadow-[0_4px_16px_rgba(237,58,86,0.35)] hover:scale-105 hover:shadow-[0_6px_24px_rgba(237,58,86,0.45)] transition-all duration-200 cursor-pointer"
            aria-label="Open chat"
        >
            <MessageCircle size={28} fill="white" stroke="white" />
        </button>
    );
}
