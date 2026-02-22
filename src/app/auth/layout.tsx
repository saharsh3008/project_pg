export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Auth pages have their own layout (no header/footer)
    return <>{children}</>;
}
