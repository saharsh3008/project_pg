import { getPropertyById } from "@/lib/queries";
import { BookingCheckout } from "@/components/booking/BookingCheckout";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function BookingPage({
    params,
    searchParams
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ checkIn?: string; checkOut?: string }>;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/auth/login?redirect=checkout");
    }

    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;

    const property = await getPropertyById(resolvedParams.id);

    if (!property) {
        redirect("/search");
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-4 lg:px-9">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Confirm Your Booking</h1>
                <BookingCheckout
                    property={property}
                    initialCheckIn={resolvedSearchParams.checkIn}
                    initialCheckOut={resolvedSearchParams.checkOut}
                    user={user}
                />
            </div>
        </div>
    );
}
