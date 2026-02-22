import { createClient } from "@/lib/supabase/server";
import type { Property, Profile, Review, Booking } from "@/types";

/* ============================================
   PROPERTY QUERIES (Server-side)
   ============================================ */

export async function getProperties(filters?: {
    city?: string;
    country?: string;
    priceMin?: number;
    priceMax?: number;
    type?: string;
    search?: string;
    sortBy?: string;
    limit?: number;
    offset?: number;
}): Promise<Property[]> {
    const supabase = await createClient();

    let query = supabase
        .from("properties")
        .select("*, landlord:profiles!landlord_id(id, full_name, avatar_url)");

    if (filters?.city) {
        query = query.ilike("city", `%${filters.city}%`);
    }
    if (filters?.country) {
        query = query.eq("country", filters.country);
    }
    if (filters?.priceMin) {
        query = query.gte("price_per_month", filters.priceMin);
    }
    if (filters?.priceMax) {
        query = query.lte("price_per_month", filters.priceMax);
    }
    if (filters?.type) {
        query = query.eq("type", filters.type);
    }
    if (filters?.search) {
        query = query.or(
            `title.ilike.%${filters.search}%,city.ilike.%${filters.search}%,nearby_university.ilike.%${filters.search}%`
        );
    }

    // Sorting
    switch (filters?.sortBy) {
        case "price_asc":
            query = query.order("price_per_month", { ascending: true });
            break;
        case "price_desc":
            query = query.order("price_per_month", { ascending: false });
            break;
        case "rating":
            query = query.order("rating", { ascending: false });
            break;
        default:
            query = query.order("is_featured", { ascending: false }).order("created_at", { ascending: false });
    }

    if (filters?.limit) {
        query = query.limit(filters.limit);
    }
    if (filters?.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 20) - 1);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Error fetching properties:", error);
        return [];
    }

    return (data as Property[]) || [];
}

export async function getPropertyById(id: string): Promise<Property | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("properties")
        .select("*, landlord:profiles!landlord_id(id, full_name, avatar_url)")
        .eq("id", id)
        .single();

    if (error) {
        console.error("Error fetching property:", error);
        return null;
    }

    return data as Property;
}

export async function getFeaturedProperties(limit = 6): Promise<Property[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("is_featured", true)
        .order("rating", { ascending: false })
        .limit(limit);

    if (error) {
        console.error("Error fetching featured properties:", error);
        return [];
    }

    return (data as Property[]) || [];
}

/* ============================================
   LANDLORD QUERIES
   ============================================ */

export async function getLandlordProperties(): Promise<Property[]> {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return [];

    const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("landlord_id", user.id)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching landlord properties:", error);
        return [];
    }

    return (data as Property[]) || [];
}

/* ============================================
   REVIEW QUERIES
   ============================================ */

export async function getReviewsByProperty(propertyId: string): Promise<Review[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("reviews")
        .select("*, student:profiles!student_id(id, full_name, avatar_url)")
        .eq("property_id", propertyId)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching reviews:", error);
        return [];
    }

    return (data as Review[]) || [];
}

/* ============================================
   PROFILE QUERIES
   ============================================ */

export async function getProfile(): Promise<Profile | null> {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (error) {
        console.error("Error fetching profile:", error);
        return null;
    }

    return data as Profile;
}

/* ============================================
   BOOKING QUERIES
   ============================================ */

export async function getBookings(): Promise<Booking[]> {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return [];

    const { data, error } = await supabase
        .from("bookings")
        .select("*, property:properties(*)")
        .eq("student_id", user.id)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching bookings:", error);
        return [];
    }

    return (data as Booking[]) || [];
}

/* ============================================
   WISHLIST QUERIES
   ============================================ */

export async function getWishlists(): Promise<Property[]> {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return [];

    const { data, error } = await supabase
        .from("wishlists")
        .select("property:properties(*)")
        .eq("student_id", user.id)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching wishlists:", error);
        return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (data?.map((w: any) => w.property) as Property[]) || [];
}

/* ============================================
   MESSAGE QUERIES
   ============================================ */

export async function getConversations() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    // Get all messages where user is sender or receiver
    const { data, error } = await supabase
        .from("messages")
        .select(`
            *,
            sender:profiles!sender_id(id, full_name, avatar_url, role),
            receiver:profiles!receiver_id(id, full_name, avatar_url, role),
            property:properties(id, title, city)
        `)
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching conversations:", error);
        return [];
    }

    // Group by other user + property
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const convos = new Map<string, any>();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?.forEach((msg: any) => {
        const otherUser = msg.sender_id === user.id ? msg.receiver : msg.sender;
        const propId = msg.property_id || "general";
        const key = `${otherUser.id}_${propId}`;

        if (!convos.has(key)) {
            convos.set(key, {
                otherUser,
                property: msg.property,
                lastMessage: msg,
                unreadCount: msg.receiver_id === user.id && !msg.is_read ? 1 : 0
            });
        } else {
            if (msg.receiver_id === user.id && !msg.is_read) {
                convos.get(key).unreadCount++;
            }
        }
    });

    return Array.from(convos.values());
}

export async function getMessages(otherUserId: string, propertyId?: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    let query = supabase
        .from("messages")
        .select(`
            *,
            sender:profiles!sender_id(id, full_name, avatar_url, role)
        `)
        .or(`and(sender_id.eq.${user.id},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${user.id})`);

    if (propertyId && propertyId !== "general") {
        query = query.eq("property_id", propertyId);
    } else {
        query = query.is("property_id", null);
    }

    const { data, error } = await query.order("created_at", { ascending: true });

    if (error) {
        console.error("Error fetching messages:", error);
        return [];
    }

    // Mark as read
    const unreadIds = data.filter(m => m.receiver_id === user.id && !m.is_read).map(m => m.id);
    if (unreadIds.length > 0) {
        await supabase.from("messages").update({ is_read: true }).in("id", unreadIds);
    }

    return data;
}
