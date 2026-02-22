import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatFab } from "@/components/layout/ChatFab";
import { createClient } from "@/lib/supabase/server";

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <>
            <Header user={user} />
            <main>{children}</main>
            <Footer />
            <ChatFab />
        </>
    );
}
