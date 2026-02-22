"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { sendMessage } from "@/lib/actions";
import Image from "next/image";
import { Search, Send, ArrowLeft, MessageCircle } from "lucide-react";

export function MessagingInterface({
    initialConversations,
    userProfile,
    initialActiveId
}: {
    initialConversations: any[],
    userProfile: any,
    initialActiveId?: string
}) {
    const [conversations, setConversations] = useState(initialConversations);
    const [activeConvoId, setActiveConvoId] = useState<string | null>(initialActiveId || null);
    const [messages, setMessages] = useState<any[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [loadingMsg, setLoadingMsg] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const supabase = createClient();

    const activeConvo = conversations.find(
        c => `${c.otherUser.id}_${c.property?.id || "general"}` === activeConvoId
    );

    // Fetch messages when a conversation is selected
    useEffect(() => {
        if (!activeConvoId || !activeConvo) return;

        const fetchMsgs = async () => {
            setLoadingMsg(true);
            const propertyIdStr = activeConvo.property?.id ? `&propertyId=${activeConvo.property.id}` : "";

            // Instead of an API route, we can just do a direct supabase query here
            // since RLS protects it, but we already have getMessages in queries.ts!
            // However, we are in a client component, so let's just query directly
            if (!supabase) return;

            let q = supabase
                .from("messages")
                .select(`*, sender:profiles!sender_id(id, full_name, avatar_url, role)`)
                .or(`and(sender_id.eq.${userProfile.id},receiver_id.eq.${activeConvo.otherUser.id}),and(sender_id.eq.${activeConvo.otherUser.id},receiver_id.eq.${userProfile.id})`);

            if (activeConvo.property?.id) {
                q = q.eq("property_id", activeConvo.property.id);
            } else {
                q = q.is("property_id", null);
            }

            const { data } = await q.order("created_at", { ascending: true });
            if (data) setMessages(data);
            setLoadingMsg(false);

            // Mark as read
            const unreadIds = data?.filter(m => m.receiver_id === userProfile.id && !m.is_read).map(m => m.id) || [];
            if (unreadIds.length > 0) {
                await supabase.from("messages").update({ is_read: true }).in("id", unreadIds);

                // Update local convo state
                setConversations(prev => prev.map(c =>
                    `${c.otherUser.id}_${c.property?.id || "general"}` === activeConvoId
                        ? { ...c, unreadCount: 0 }
                        : c
                ));
            }
        };

        fetchMsgs();
    }, [activeConvoId]);

    // Realtime subscription
    useEffect(() => {
        if (!supabase) return;

        const channel = supabase.channel('schema-db-changes')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `receiver_id=eq.${userProfile.id}`
                },
                async (payload) => {
                    const newMsg = payload.new;

                    // Check if we need to fetch sender info (it won't be in payload)
                    // For simplicity, we just add it to active if it's for current convo
                    const isForActiveConvo = activeConvo &&
                        newMsg.sender_id === activeConvo.otherUser.id &&
                        (newMsg.property_id === activeConvo.property?.id || (!newMsg.property_id && !activeConvo.property));

                    if (isForActiveConvo) {
                        // we know the sender
                        setMessages(prev => [...prev, { ...newMsg, sender: activeConvo.otherUser }]);
                        // mark as read
                        await supabase.from("messages").update({ is_read: true }).eq("id", newMsg.id);
                    } else {
                        // Just refresh page to get updated convos list (lazy approach for now)
                        window.location.reload();
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase, activeConvo, userProfile.id]);

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || !activeConvo) return;

        const tempMsg = {
            id: "temp-" + Date.now(),
            sender_id: userProfile.id,
            receiver_id: activeConvo.otherUser.id,
            content: inputValue,
            created_at: new Date().toISOString(),
            sender: userProfile
        };

        setMessages(prev => [...prev, tempMsg]);
        setInputValue("");

        await sendMessage({
            receiver_id: activeConvo.otherUser.id,
            property_id: activeConvo.property?.id || "general",
            content: tempMsg.content
        });
    };

    return (
        <div className="flex h-[calc(100vh-140px)] bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">

            {/* Sidebar */}
            <div className={`w-full md:w-[320px] lg:w-[380px] border-r border-gray-200 flex flex-col ${activeConvoId ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            className="w-full h-10 pl-9 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-amber-red focus:ring-1 focus:ring-amber-red outline-none"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {conversations.length === 0 ? (
                        <div className="p-8 text-center text-gray-500 text-sm">No messages yet.</div>
                    ) : (
                        conversations.map(convo => {
                            const id = `${convo.otherUser.id}_${convo.property?.id || "general"}`;
                            const isActive = activeConvoId === id;

                            return (
                                <button
                                    key={id}
                                    onClick={() => setActiveConvoId(id)}
                                    className={`w-full p-4 flex gap-3 text-left border-b border-gray-100 transition-colors hover:bg-gray-50 ${isActive ? 'bg-gray-50' : ''}`}
                                >
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 bg-gray-100">
                                        {convo.otherUser.avatar_url ? (
                                            <Image src={convo.otherUser.avatar_url} alt="" fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold bg-amber-100">
                                                {convo.otherUser.full_name?.charAt(0) || convo.otherUser.email?.charAt(0) || 'U'}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <h3 className="text-sm font-semibold text-gray-900 truncate pr-2">{convo.otherUser.full_name || 'User'}</h3>
                                            <span className="text-[10px] text-gray-400 shrink-0">
                                                {new Date(convo.lastMessage.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        {convo.property && (
                                            <p className="text-[11px] font-medium text-amber-600 mb-1 truncate">{convo.property.title}</p>
                                        )}
                                        <p className={`text-xs truncate ${convo.unreadCount > 0 ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
                                            {convo.lastMessage.content}
                                        </p>
                                    </div>
                                    {convo.unreadCount > 0 && (
                                        <div className="w-5 h-5 rounded-full bg-amber-red text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-1">
                                            {convo.unreadCount}
                                        </div>
                                    )}
                                </button>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className={`flex-1 flex flex-col bg-gray-50 ${activeConvoId ? 'flex' : 'hidden md:flex'}`}>
                {!activeConvoId ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                        <MessageCircle size={48} className="mb-4 opacity-20" />
                        <p>Select a conversation to start messaging</p>
                    </div>
                ) : (
                    <>
                        <div className="h-16 border-b border-gray-200 bg-white flex items-center px-4 shrink-0 gap-3">
                            <button
                                onClick={() => setActiveConvoId(null)}
                                className="md:hidden p-2 text-gray-500 hover:bg-gray-50 rounded-lg"
                            >
                                <ArrowLeft size={20} />
                            </button>

                            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-gray-100">
                                {activeConvo.otherUser.avatar_url ? (
                                    <Image src={activeConvo.otherUser.avatar_url} alt="" fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold bg-amber-100">
                                        {activeConvo.otherUser.full_name?.charAt(0) || 'U'}
                                    </div>
                                )}
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-gray-900">{activeConvo.otherUser.full_name}</h3>
                                {activeConvo.property && (
                                    <p className="text-xs text-gray-500">Inquiry for: {activeConvo.property.title}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {loadingMsg ? (
                                <div className="flex justify-center py-4 text-gray-400"><span className="animate-pulse">Loading messages...</span></div>
                            ) : messages.map((msg, i) => {
                                const isMe = msg.sender_id === userProfile.id;
                                return (
                                    <div key={msg.id || i} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${isMe ? 'bg-amber-red text-white rounded-tr-sm' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm'
                                            }`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="p-4 bg-white border-t border-gray-200 shrink-0">
                            <form onSubmit={handleSend} className="flex gap-2 relative">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 h-12 pl-4 pr-12 border border-gray-200 rounded-xl text-sm focus:border-amber-red focus:ring-1 focus:ring-amber-red outline-none"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-amber-red text-white rounded-lg disabled:opacity-50 hover:bg-amber-red-hover transition-colors"
                                >
                                    <Send size={14} />
                                </button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
