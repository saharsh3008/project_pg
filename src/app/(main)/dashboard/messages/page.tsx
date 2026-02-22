import { getConversations, getProfile } from "@/lib/queries";
import { MessagingInterface } from "@/components/dashboard/MessagingInterface";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function MessagesPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/auth/login?redirect=dashboard/messages");
    }

    const profile = await getProfile();
    if (!profile) {
        redirect("/auth/login");
    }

    let conversations = await getConversations();

    const resolvedSearchParams = await searchParams;

    // Handle the '?start=true' flow
    if (resolvedSearchParams?.start === "true" && resolvedSearchParams.landlord) {
        const landlordId = resolvedSearchParams.landlord;
        const propertyId = resolvedSearchParams.property || "general";

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const exists = conversations.find((c: any) => c.otherUser.id === landlordId && (c.property?.id || "general") === propertyId);

        if (!exists && landlordId !== user.id) {
            const { data: llProfile } = await supabase.from("profiles").select("*").eq("id", landlordId).single();
            const { data: prop } = propertyId !== "general" ? await supabase.from("properties").select("id, title, city").eq("id", propertyId).single() : { data: null };

            if (llProfile) {
                const mockConvo = {
                    otherUser: llProfile,
                    property: prop,
                    lastMessage: { content: "Draft new message...", created_at: new Date().toISOString() },
                    unreadCount: 0
                };
                conversations = [mockConvo, ...conversations];
            }
        }
    }

    const defaultActive = resolvedSearchParams?.landlord
        ? `${resolvedSearchParams.landlord}_${resolvedSearchParams.property || "general"}`
        : undefined;

    return (
        <div className="min-h-screen bg-gray-50 pt-[88px] pb-12">
            <div className="max-w-[1400px] mx-auto px-4 lg:px-9 h-full">
                <MessagingInterface initialConversations={conversations} userProfile={profile} initialActiveId={defaultActive} />
            </div>
        </div>
    );
}
