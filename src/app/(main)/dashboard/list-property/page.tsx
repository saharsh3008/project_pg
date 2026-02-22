import { getProfile } from "@/lib/queries";
import { ListPropertyForm } from "@/components/dashboard/ListPropertyForm";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function ListPropertyPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/auth/login");
    }

    const profile = await getProfile();

    if (profile?.role !== "landlord") {
        // Only landlords can access this page
        return (
            <div className="min-h-screen bg-gray-50 pt-20 pb-12">
                <div className="max-w-[1200px] mx-auto px-4 lg:px-9">
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center">
                        You must be registered as a Landlord to list properties.
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-16">
            <div className="max-w-3xl mx-auto px-4 lg:px-9">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">List a New Property</h1>
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
                    <ListPropertyForm />
                </div>
            </div>
        </div>
    );
}
