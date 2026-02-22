import { getLandlordProperties, getProfile } from "@/lib/queries";
import { LandlordPropertyList } from "@/components/dashboard/LandlordPropertyList";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function LandlordPropertiesPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/auth/login");
    }

    // Get user profile to check role
    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (profile?.role !== "landlord") {
        // Only landlords can access this page
        return (
            <div className="min-h-screen bg-gray-50 pt-20 pb-12">
                <div className="max-w-[1200px] mx-auto px-4 lg:px-9">
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center">
                        You must be registered as a Landlord to view properties.
                    </div>
                </div>
            </div>
        );
    }

    const properties = await getLandlordProperties();

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12">
            <div className="max-w-[1200px] mx-auto px-4 lg:px-9">
                <LandlordPropertyList initialProperties={properties} />
            </div>
        </div>
    );
}
