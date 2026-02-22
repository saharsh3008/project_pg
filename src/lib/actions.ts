"use client";

import { createClient } from "@/lib/supabase/client";

/* ============================================
   CLIENT-SIDE ACTIONS (mutations)
   ============================================ */

/** Toggle wishlist for a property */
export async function toggleWishlist(propertyId: string): Promise<boolean> {
    const supabase = createClient();
    if (!supabase) return false;

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        window.location.href = "/auth/login";
        return false;
    }

    // Check if already wishlisted
    const { data: existing } = await supabase
        .from("wishlists")
        .select("id")
        .eq("student_id", user.id)
        .eq("property_id", propertyId)
        .single();

    if (existing) {
        // Remove
        await supabase.from("wishlists").delete().eq("id", existing.id);
        return false;
    } else {
        // Add
        await supabase.from("wishlists").insert({
            student_id: user.id,
            property_id: propertyId,
        });
        return true;
    }
}

/** Create a booking */
export async function createBooking(data: {
    property_id: string;
    room_type: string;
    check_in: string;
    check_out: string;
    total_amount: number;
}): Promise<{ success: boolean; error?: string; bookingId?: string }> {
    const supabase = createClient();
    if (!supabase) return { success: false, error: "Supabase not configured" };

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, error: "Not authenticated" };
    }

    const { data: booking, error } = await supabase
        .from("bookings")
        .insert({
            student_id: user.id,
            property_id: data.property_id,
            room_type: data.room_type,
            check_in: data.check_in,
            check_out: data.check_out,
            total_amount: data.total_amount,
            status: "pending",
            payment_status: "pending",
        })
        .select("id")
        .single();

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true, bookingId: booking?.id };
}

/** Submit a review */
export async function submitReview(data: {
    property_id: string;
    booking_id?: string;
    rating: number;
    comment: string;
}): Promise<{ success: boolean; error?: string }> {
    const supabase = createClient();
    if (!supabase) return { success: false, error: "Supabase not configured" };

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, error: "Not authenticated" };
    }

    const { error } = await supabase.from("reviews").insert({
        student_id: user.id,
        property_id: data.property_id,
        booking_id: data.booking_id || null,
        rating: data.rating,
        comment: data.comment,
    });

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true };
}

/** Update user profile */
export async function updateProfile(data: {
    full_name?: string;
    phone?: string;
    university?: string;
    city?: string;
}): Promise<{ success: boolean; error?: string }> {
    const supabase = createClient();
    if (!supabase) return { success: false, error: "Supabase not configured" };

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, error: "Not authenticated" };
    }

    const { error } = await supabase
        .from("profiles")
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq("id", user.id);

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true };
}

/** Sign out */
export async function signOut(): Promise<void> {
    const supabase = createClient();
    if (!supabase) return;

    await supabase.auth.signOut();
    window.location.href = "/";
}

/** Get current user */
export async function getCurrentUser() {
    const supabase = createClient();
    if (!supabase) return null;

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return user;
}
