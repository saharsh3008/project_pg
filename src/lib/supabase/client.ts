import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key || url === "your_supabase_project_url" || key === "your_supabase_anon_key") {
        // Return a mock client that won't crash the app when Supabase is not configured
        return null;
    }

    return createBrowserClient(url, key);
}
