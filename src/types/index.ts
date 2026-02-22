/* ============================================
   Database Types — mirrors Supabase tables
   ============================================ */

export type UserRole = "student" | "landlord" | "admin";

export interface Profile {
    id: string;
    email: string;
    full_name: string;
    avatar_url: string | null;
    phone: string | null;
    role: UserRole;
    university: string | null;
    city: string | null;
    created_at: string;
    updated_at: string;
}

export type PropertyType = "pg" | "apartment" | "hostel" | "studio" | "shared";

export type RoomType = "single" | "double" | "triple" | "shared";

export interface Property {
    id: string;
    landlord_id: string;
    title: string;
    description: string;
    type: PropertyType;
    room_types: RoomType[];
    city: string;
    country: string;
    address: string;
    latitude: number | null;
    longitude: number | null;
    price_per_month: number;
    currency: string;
    amenities: string[];
    images: string[];
    rooms_total: number;
    rooms_available: number;
    rating: number;
    review_count: number;
    is_verified: boolean;
    is_featured: boolean;
    nearby_university: string | null;
    distance_to_uni_km: number | null;
    created_at: string;
    updated_at: string;
    // Joined
    landlord?: Profile;
}

export type BookingStatus =
    | "pending"
    | "confirmed"
    | "active"
    | "completed"
    | "cancelled";

export type PaymentStatus = "pending" | "paid" | "refunded" | "failed";

export interface Booking {
    id: string;
    student_id: string;
    property_id: string;
    room_type: RoomType;
    check_in: string;
    check_out: string;
    total_amount: number;
    payment_status: PaymentStatus;
    status: BookingStatus;
    notes: string | null;
    created_at: string;
    updated_at: string;
    // Joined
    property?: Property;
    student?: Profile;
}

export interface Review {
    id: string;
    student_id: string;
    property_id: string;
    booking_id: string | null;
    rating: number;
    comment: string;
    photos: string[];
    is_verified: boolean;
    created_at: string;
    // Joined
    student?: Profile;
}

export interface Message {
    id: string;
    sender_id: string;
    receiver_id: string;
    property_id: string | null;
    content: string;
    is_read: boolean;
    created_at: string;
    // Joined
    sender?: Profile;
    receiver?: Profile;
}

export interface Wishlist {
    id: string;
    student_id: string;
    property_id: string;
    created_at: string;
    // Joined
    property?: Property;
}

/* ============================================
   UI / Component Types
   ============================================ */

export interface SearchFilters {
    query: string;
    city: string;
    country: string;
    priceMin: number;
    priceMax: number;
    propertyType: PropertyType | "";
    roomType: RoomType | "";
    amenities: string[];
    sortBy: "price_asc" | "price_desc" | "rating" | "newest";
}

export interface CityData {
    name: string;
    country: string;
    image: string;
    propertyCount: number;
}

export interface TestimonialData {
    name: string;
    university: string;
    rating: number;
    comment: string;
    avatarGradient: string;
    initials: string;
}
