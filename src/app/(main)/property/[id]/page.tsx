import { getPropertyById } from "@/lib/queries";
import { PropertyDetail } from "@/components/property/PropertyDetail";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const property = await getPropertyById(id);

    if (!property) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-16">
                <div className="text-center">
                    <div className="text-5xl mb-4">🏠</div>
                    <h2 className="text-xl font-bold text-gray-900">Property not found</h2>
                    <p className="text-gray-500 mt-1">This property might have been removed or is no longer available.</p>
                    <Link href="/search" className="inline-flex items-center gap-2 mt-4 text-amber-red font-semibold hover:underline">
                        <ArrowLeft size={16} /> Back to search
                    </Link>
                </div>
            </div>
        );
    }

    return <PropertyDetail property={property} />;
}
