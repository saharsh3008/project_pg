import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Discover the Best Student Accommodation | Amber Clone",
  description:
    "Browse from 10000+ student accommodations, apartments, and rooms with verified reviews, photos and amenities. Find your perfect home away from home.",
  keywords: "student accommodation, student housing, PG, paying guest, apartments, off campus, private halls",
  openGraph: {
    title: "Discover the Best Student Accommodation | Amber Clone",
    description: "Browse 10000+ student accommodations globally.",
    images: ["https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&h=630&fit=crop"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
