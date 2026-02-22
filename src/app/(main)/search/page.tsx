"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, SlidersHorizontal, MapPin, Star, Heart, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample property data (will come from Supabase later)
const SAMPLE_PROPERTIES = [
    {
        id: "1",
        title: "Moonraker Point",
        type: "Studio",
        city: "London",
        country: "United Kingdom",
        address: "58 Southwark Bridge Road, SE1",
        price_per_month: 1200,
        currency: "£",
        images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop"],
        rating: 4.6,
        review_count: 89,
        is_verified: true,
        is_featured: true,
        nearby_university: "King's College London",
        distance_to_uni_km: 0.5,
        amenities: ["WiFi", "Gym", "Laundry", "CCTV", "Study Room"],
        rooms_available: 15,
    },
    {
        id: "2",
        title: "Chapter Kings Cross",
        type: "Ensuite",
        city: "London",
        country: "United Kingdom",
        address: "200 Pentonville Road, N1",
        price_per_month: 980,
        currency: "£",
        images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop"],
        rating: 4.8,
        review_count: 156,
        is_verified: true,
        is_featured: true,
        nearby_university: "UCL",
        distance_to_uni_km: 1.2,
        amenities: ["WiFi", "Gym", "Cinema Room", "Furnished"],
        rooms_available: 8,
    },
    {
        id: "3",
        title: "iQ Shoreditch",
        type: "Shared",
        city: "London",
        country: "United Kingdom",
        address: "20 Commercial Street, E1",
        price_per_month: 750,
        currency: "£",
        images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop"],
        rating: 4.3,
        review_count: 67,
        is_verified: true,
        is_featured: false,
        nearby_university: "Queen Mary University",
        distance_to_uni_km: 1.8,
        amenities: ["WiFi", "Laundry", "Common Room"],
        rooms_available: 22,
    },
    {
        id: "4",
        title: "The Collective Canary Wharf",
        type: "Studio",
        city: "London",
        country: "United Kingdom",
        address: "20 Crossharbour Plaza, E14",
        price_per_month: 1100,
        currency: "£",
        images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop"],
        rating: 4.5,
        review_count: 42,
        is_verified: true,
        is_featured: false,
        nearby_university: "University of East London",
        distance_to_uni_km: 3.2,
        amenities: ["WiFi", "Gym", "Swimming Pool", "Terrace", "Furnished"],
        rooms_available: 5,
    },
    {
        id: "5",
        title: "Unite Students Emily Bowes Court",
        type: "Ensuite",
        city: "London",
        country: "United Kingdom",
        address: "Osborne Road, N4",
        price_per_month: 820,
        currency: "£",
        images: ["https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=600&h=400&fit=crop"],
        rating: 4.1,
        review_count: 103,
        is_verified: true,
        is_featured: false,
        nearby_university: "Middlesex University",
        distance_to_uni_km: 2.5,
        amenities: ["WiFi", "Laundry", "Study Room", "CCTV"],
        rooms_available: 30,
    },
    {
        id: "6",
        title: "Vita Student Manchester",
        type: "Studio",
        city: "Manchester",
        country: "United Kingdom",
        address: "First Street, M15",
        price_per_month: 850,
        currency: "£",
        images: ["https://images.unsplash.com/photo-1515263487990-61b07816b324?w=600&h=400&fit=crop"],
        rating: 4.7,
        review_count: 78,
        is_verified: true,
        is_featured: true,
        nearby_university: "University of Manchester",
        distance_to_uni_km: 0.8,
        amenities: ["WiFi", "Gym", "Cinema Room", "Laundry", "Furnished"],
        rooms_available: 12,
    },
];

const PRICE_RANGES = [
    { label: "Any Price", min: 0, max: Infinity },
    { label: "Under £500", min: 0, max: 500 },
    { label: "£500 - £800", min: 500, max: 800 },
    { label: "£800 - £1000", min: 800, max: 1000 },
    { label: "£1000 - £1500", min: 1000, max: 1500 },
    { label: "£1500+", min: 1500, max: Infinity },
];

const ROOM_TYPES = ["All", "Studio", "Ensuite", "Shared"];

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [priceRange, setPriceRange] = useState(0);
    const [roomType, setRoomType] = useState("All");
    const [sortBy, setSortBy] = useState<"relevance" | "price_asc" | "price_desc" | "rating">("relevance");
    const [showFilters, setShowFilters] = useState(false);
    const [wishlisted, setWishlisted] = useState<Set<string>>(new Set());

    const toggleWishlist = (id: string) => {
        setWishlisted((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const filtered = useMemo(() => {
        let results = SAMPLE_PROPERTIES;

        // Search
        if (query) {
            const q = query.toLowerCase();
            results = results.filter(
                (p) =>
                    p.title.toLowerCase().includes(q) ||
                    p.city.toLowerCase().includes(q) ||
                    p.nearby_university?.toLowerCase().includes(q)
            );
        }

        // Price
        const range = PRICE_RANGES[priceRange];
        results = results.filter((p) => p.price_per_month >= range.min && p.price_per_month <= range.max);

        // Room type
        if (roomType !== "All") {
            results = results.filter((p) => p.type === roomType);
        }

        // Sort
        if (sortBy === "price_asc") results = [...results].sort((a, b) => a.price_per_month - b.price_per_month);
        if (sortBy === "price_desc") results = [...results].sort((a, b) => b.price_per_month - a.price_per_month);
        if (sortBy === "rating") results = [...results].sort((a, b) => b.rating - a.rating);

        return results;
    }, [query, priceRange, roomType, sortBy]);

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-9 pb-16">
                {/* Search Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6 mb-6">
                    <div className="flex flex-col lg:flex-row gap-3">
                        {/* Search input */}
                        <div className="relative flex-1">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search by city, university or property name..."
                                className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-amber-red/20 focus:border-amber-red outline-none"
                            />
                        </div>

                        {/* Filter toggle */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={cn(
                                "flex items-center gap-2 h-12 px-5 rounded-xl border text-sm font-medium transition-all cursor-pointer",
                                showFilters
                                    ? "bg-amber-red text-white border-amber-red"
                                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                            )}
                        >
                            <SlidersHorizontal size={16} />
                            Filters
                            {(priceRange > 0 || roomType !== "All") && (
                                <span className="ml-1 w-5 h-5 rounded-full bg-white text-amber-red text-xs flex items-center justify-center font-bold">
                                    {(priceRange > 0 ? 1 : 0) + (roomType !== "All" ? 1 : 0)}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Expandable filters */}
                    {showFilters && (
                        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col lg:flex-row gap-4">
                            {/* Price Range */}
                            <div className="flex-1">
                                <label className="text-xs font-medium text-gray-500 mb-1.5 block">Price Range</label>
                                <div className="flex flex-wrap gap-2">
                                    {PRICE_RANGES.map((range, i) => (
                                        <button
                                            key={range.label}
                                            onClick={() => setPriceRange(i)}
                                            className={cn(
                                                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer",
                                                priceRange === i
                                                    ? "bg-amber-red text-white"
                                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                            )}
                                        >
                                            {range.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Room Type */}
                            <div>
                                <label className="text-xs font-medium text-gray-500 mb-1.5 block">Room Type</label>
                                <div className="flex gap-2">
                                    {ROOM_TYPES.map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setRoomType(type)}
                                            className={cn(
                                                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer",
                                                roomType === type
                                                    ? "bg-amber-red text-white"
                                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                            )}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Clear */}
                            <button
                                onClick={() => { setPriceRange(0); setRoomType("All"); }}
                                className="flex items-center gap-1 text-xs text-gray-400 hover:text-amber-red cursor-pointer self-end"
                            >
                                <X size={14} /> Clear all
                            </button>
                        </div>
                    )}
                </div>

                {/* Results header */}
                <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-500">
                        <span className="font-semibold text-gray-900">{filtered.length}</span> properties found
                    </p>
                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                            className="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm text-gray-700 cursor-pointer outline-none"
                        >
                            <option value="relevance">Relevance</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Property Grid */}
                {filtered.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-5xl mb-4">🏠</div>
                        <h3 className="text-lg font-semibold text-gray-900">No properties found</h3>
                        <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filtered.map((property) => (
                            <Link
                                key={property.id}
                                href={`/property/${property.id}`}
                                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                            >
                                {/* Image */}
                                <div className="relative h-[200px] overflow-hidden">
                                    <Image
                                        src={property.images[0]}
                                        alt={property.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                                    />

                                    {/* Badges */}
                                    <div className="absolute top-3 left-3 flex gap-1.5">
                                        {property.is_featured && (
                                            <span className="px-2 py-1 bg-amber-red text-white text-[10px] font-bold rounded-md">
                                                FEATURED
                                            </span>
                                        )}
                                        {property.is_verified && (
                                            <span className="px-2 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-md">
                                                ✓ VERIFIED
                                            </span>
                                        )}
                                    </div>

                                    {/* Wishlist */}
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            toggleWishlist(property.id);
                                        }}
                                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
                                    >
                                        <Heart
                                            size={16}
                                            className={cn(
                                                "transition-colors",
                                                wishlisted.has(property.id)
                                                    ? "fill-amber-red text-amber-red"
                                                    : "text-gray-600"
                                            )}
                                        />
                                    </button>

                                    {/* Room type */}
                                    <div className="absolute bottom-3 left-3">
                                        <span className="px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-md">
                                            {property.type}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-amber-red transition-colors line-clamp-1">
                                        {property.title}
                                    </h3>

                                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                                        <MapPin size={12} />
                                        <span>{property.address}</span>
                                    </div>

                                    {property.nearby_university && (
                                        <div className="flex items-center gap-1 mt-1 text-xs text-indigo-600">
                                            <span>🎓</span>
                                            <span>{property.nearby_university} • {property.distance_to_uni_km} km</span>
                                        </div>
                                    )}

                                    {/* Amenities */}
                                    <div className="flex items-center gap-1.5 mt-3 overflow-hidden">
                                        {property.amenities.slice(0, 3).map((a) => (
                                            <span key={a} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[11px] rounded-md whitespace-nowrap">
                                                {a}
                                            </span>
                                        ))}
                                        {property.amenities.length > 3 && (
                                            <span className="text-[11px] text-gray-400">+{property.amenities.length - 3}</span>
                                        )}
                                    </div>

                                    {/* Price + Rating */}
                                    <div className="flex items-end justify-between mt-4 pt-3 border-t border-gray-100">
                                        <div>
                                            <span className="text-lg font-bold text-gray-900">
                                                {property.currency}{property.price_per_month}
                                            </span>
                                            <span className="text-xs text-gray-400">/month</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star size={14} className="fill-amber-400 text-amber-400" />
                                            <span className="text-sm font-semibold text-gray-900">{property.rating}</span>
                                            <span className="text-xs text-gray-400">({property.review_count})</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
