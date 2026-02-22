import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Sample properties to seed
const SAMPLE_PROPERTIES = [
    {
        title: "Moonraker Point",
        description: "Experience luxury student living at Moonraker Point, a premium accommodation located in the heart of London. Modern studios come fully furnished with private bathroom, kitchenette, high-speed WiFi, and stunning city views.\n\nAll bills included — WiFi, electricity, water, and contents insurance.",
        type: "studio",
        room_types: ["single"],
        city: "London",
        country: "United Kingdom",
        address: "58 Southwark Bridge Road, London SE1 0AS",
        latitude: 51.5055,
        longitude: -0.0935,
        price_per_month: 1200,
        currency: "GBP",
        amenities: ["WiFi", "Gym", "Laundry", "CCTV", "Study Room", "Furnished", "Elevator", "24/7 Reception"],
        images: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
        ],
        rooms_total: 120,
        rooms_available: 15,
        rating: 4.6,
        review_count: 89,
        is_verified: true,
        is_featured: true,
        nearby_university: "King's College London",
        distance_to_uni_km: 0.5,
    },
    {
        title: "Chapter Kings Cross",
        description: "State-of-the-art student living in the heart of Kings Cross. Ensuite rooms with modern furnishings, cinema room, gym, and rooftop terrace with panoramic views of London.\n\nPerfect for students at UCL, LSE, or any central London university.",
        type: "apartment",
        room_types: ["single", "double"],
        city: "London",
        country: "United Kingdom",
        address: "200 Pentonville Road, London N1 9JP",
        latitude: 51.5308,
        longitude: -0.1139,
        price_per_month: 980,
        currency: "GBP",
        amenities: ["WiFi", "Gym", "Laundry", "CCTV", "Furnished", "Common Room", "Kitchen"],
        images: [
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
        ],
        rooms_total: 200,
        rooms_available: 8,
        rating: 4.8,
        review_count: 156,
        is_verified: true,
        is_featured: true,
        nearby_university: "UCL",
        distance_to_uni_km: 1.2,
    },
    {
        title: "iQ Shoreditch",
        description: "Affordable shared accommodation in vibrant Shoreditch. Great transport links, close to Queen Mary University, and surrounded by cafes and markets.",
        type: "shared",
        room_types: ["shared", "double"],
        city: "London",
        country: "United Kingdom",
        address: "20 Commercial Street, London E1 6LP",
        latitude: 51.5165,
        longitude: -0.0711,
        price_per_month: 750,
        currency: "GBP",
        amenities: ["WiFi", "Laundry", "Common Room", "CCTV", "Kitchen"],
        images: [
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&h=600&fit=crop",
        ],
        rooms_total: 80,
        rooms_available: 22,
        rating: 4.3,
        review_count: 67,
        is_verified: true,
        is_featured: false,
        nearby_university: "Queen Mary University",
        distance_to_uni_km: 1.8,
    },
    {
        title: "The Collective Canary Wharf",
        description: "Premium co-living space with swimming pool, rooftop terrace, gym, and spa. Located in the financial district with excellent DLR and Jubilee line connections.",
        type: "studio",
        room_types: ["single"],
        city: "London",
        country: "United Kingdom",
        address: "20 Crossharbour Plaza, London E14 9YF",
        latitude: 51.4957,
        longitude: -0.0168,
        price_per_month: 1100,
        currency: "GBP",
        amenities: ["WiFi", "Gym", "Swimming Pool", "Terrace", "Furnished", "Elevator", "Parking"],
        images: [
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800&h=600&fit=crop",
        ],
        rooms_total: 150,
        rooms_available: 5,
        rating: 4.5,
        review_count: 42,
        is_verified: true,
        is_featured: false,
        nearby_university: "University of East London",
        distance_to_uni_km: 3.2,
    },
    {
        title: "Vita Student Manchester",
        description: "Award-winning student accommodation in the heart of Manchester. Luxury studios with en-suite, fully equipped kitchen, cinema room, and 24/7 concierge.\n\nJust 10 minutes walk to University of Manchester campus.",
        type: "studio",
        room_types: ["single"],
        city: "Manchester",
        country: "United Kingdom",
        address: "First Street, Manchester M15 4FN",
        latitude: 53.4709,
        longitude: -2.2462,
        price_per_month: 850,
        currency: "GBP",
        amenities: ["WiFi", "Gym", "Laundry", "Furnished", "Common Room", "CCTV", "Study Room"],
        images: [
            "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
        ],
        rooms_total: 90,
        rooms_available: 12,
        rating: 4.7,
        review_count: 78,
        is_verified: true,
        is_featured: true,
        nearby_university: "University of Manchester",
        distance_to_uni_km: 0.8,
    },
    {
        title: "Unite Students Emily Bowes Court",
        description: "Well-connected student hall in North London. Modern ensuite rooms with excellent communal facilities including laundry, study rooms, and a bike store.",
        type: "hostel",
        room_types: ["single", "shared"],
        city: "London",
        country: "United Kingdom",
        address: "Osborne Road, London N4 3SQ",
        latitude: 51.5684,
        longitude: -0.1065,
        price_per_month: 820,
        currency: "GBP",
        amenities: ["WiFi", "Laundry", "Study Room", "CCTV", "Parking", "Kitchen"],
        images: [
            "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
        ],
        rooms_total: 250,
        rooms_available: 30,
        rating: 4.1,
        review_count: 103,
        is_verified: true,
        is_featured: false,
        nearby_university: "Middlesex University",
        distance_to_uni_km: 2.5,
    },
    {
        title: "Student Roost Melbourne",
        description: "Modern student living in the heart of Melbourne CBD. Walking distance to University of Melbourne and RMIT. Fully furnished with private study areas.",
        type: "apartment",
        room_types: ["single", "double"],
        city: "Melbourne",
        country: "Australia",
        address: "500 Elizabeth Street, Melbourne VIC 3000",
        latitude: -37.8066,
        longitude: 144.9605,
        price_per_month: 1400,
        currency: "AUD",
        amenities: ["WiFi", "Gym", "Laundry", "Study Room", "Furnished", "Air Conditioning", "Common Room"],
        images: [
            "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        ],
        rooms_total: 100,
        rooms_available: 18,
        rating: 4.4,
        review_count: 52,
        is_verified: true,
        is_featured: true,
        nearby_university: "University of Melbourne",
        distance_to_uni_km: 0.6,
    },
    {
        title: "Nido West Hampstead",
        description: "Boutique student residence in leafy West Hampstead. Premium studios with kitchenette, ensuite bathroom, and stunning views. 20 min to central London.",
        type: "studio",
        room_types: ["single"],
        city: "London",
        country: "United Kingdom",
        address: "190 Iverson Road, London NW6 2HL",
        latitude: 51.5471,
        longitude: -0.1889,
        price_per_month: 1050,
        currency: "GBP",
        amenities: ["WiFi", "Gym", "Laundry", "CCTV", "Furnished", "Garden", "Common Room"],
        images: [
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
        ],
        rooms_total: 60,
        rooms_available: 7,
        rating: 4.5,
        review_count: 34,
        is_verified: true,
        is_featured: false,
        nearby_university: "University of Westminster",
        distance_to_uni_km: 4.0,
    },
];

export async function POST() {
    try {
        const supabase = await createClient();

        // Check if user is authenticated
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { error: "You must be logged in to seed data. Sign up first, then hit this endpoint." },
                { status: 401 }
            );
        }

        // Use the current user as the landlord for all sample properties
        const landlordId = user.id;

        // Update user role to landlord (for seeding purposes)
        await supabase
            .from("profiles")
            .update({ role: "landlord" })
            .eq("id", landlordId);

        // Insert properties
        const propertiesWithLandlord = SAMPLE_PROPERTIES.map((p) => ({
            ...p,
            landlord_id: landlordId,
        }));

        const { data, error } = await supabase
            .from("properties")
            .insert(propertiesWithLandlord)
            .select("id, title");

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: `Seeded ${data?.length || 0} properties!`,
            properties: data,
        });
    } catch (err) {
        return NextResponse.json(
            { error: err instanceof Error ? err.message : "Unexpected error" },
            { status: 500 }
        );
    }
}
