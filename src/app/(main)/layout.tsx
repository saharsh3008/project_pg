import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatFab } from "@/components/layout/ChatFab";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
            <ChatFab />
        </>
    );
}
