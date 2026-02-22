import { getProperties } from "@/lib/queries";
import { PropertyGrid } from "@/components/search/PropertyGrid";

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const params = await searchParams;

    const properties = await getProperties({
        search: params.q,
        city: params.city,
        type: params.type,
        priceMin: params.priceMin ? Number(params.priceMin) : undefined,
        priceMax: params.priceMax ? Number(params.priceMax) : undefined,
        sortBy: params.sort,
        limit: 20,
    });

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-9 pb-16">
                <PropertyGrid initialProperties={properties} initialQuery={params.q} />
            </div>
        </div>
    );
}
