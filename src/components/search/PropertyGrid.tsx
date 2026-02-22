"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, SlidersHorizontal, MapPin, Star, Heart, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Property } from "@/types";

const PRICE_RANGES = [
    { label: "Any Price", min: 0, max: Infinity },
    { label: "Under £500", min: 0, max: 500 },
    { label: "£500 - £800", min: 500, max: 800 },
    { label: "£800 - £1000", min: 800, max: 1000 },
    { label: "£1000 - £1500", min: 1000, max: 1500 },
    { label: "£1500+", min: 1500, max: Infinity },
];

const ROOM_TYPES = ["All", "studio", "apartment", "shared", "hostel", "pg"];

// Fallback sample data when no DB properties exist
const FALLBACK_PROPERTIES: Property[] = [
    {
        id: "sample-1", landlord_id: "", title: "Moonraker Point", description: "",
        type: "studio", room_types: [], city: "London", country: "United Kingdom",
        address: "58 Southwark Bridge Road, SE1", latitude: null, longitude: null,
        price_per_month: 1200, currency: "GBP",
        amenities: ["WiFi", "Gym", "Laundry", "CCTV", "Study Room"],
        images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop"],
        rooms_total: 120, rooms_available: 15, rating: 4.6, review_count: 89,
        is_verified: true, is_featured: true, nearby_university: "King's College London",
        distance_to_uni_km: 0.5, created_at: "", updated_at: "",
    },
    {
        id: "sample-2", landlord_id: "", title: "Chapter Kings Cross", description: "",
        type: "apartment", room_types: [], city: "London", country: "United Kingdom",
        address: "200 Pentonville Road, N1", latitude: null, longitude: null,
        price_per_month: 980, currency: "GBP",
        amenities: ["WiFi", "Gym", "Cinema Room", "Furnished"],
        images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop"],
        rooms_total: 200, rooms_available: 8, rating: 4.8, review_count: 156,
        is_verified: true, is_featured: true, nearby_university: "UCL",
        distance_to_uni_km: 1.2, created_at: "", updated_at: "",
    },
    {
        id: "sample-3", landlord_id: "", title: "iQ Shoreditch", description: "",
        type: "shared", room_types: [], city: "London", country: "United Kingdom",
        address: "20 Commercial Street, E1", latitude: null, longitude: null,
        price_per_month: 750, currency: "GBP",
        amenities: ["WiFi", "Laundry", "Common Room"],
        images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop"],
        rooms_total: 80, rooms_available: 22, rating: 4.3, review_count: 67,
        is_verified: true, is_featured: false, nearby_university: "Queen Mary University",
        distance_to_uni_km: 1.8, created_at: "", updated_at: "",
    },
    {
        id: "sample-4", landlord_id: "", title: "Vita Student Manchester", description: "",
        type: "studio", room_types: [], city: "Manchester", country: "United Kingdom",
        address: "First Street, M15", latitude: null, longitude: null,
        price_per_month: 850, currency: "GBP",
        amenities: ["WiFi", "Gym", "Cinema Room", "Laundry", "Furnished"],
        images: ["https://images.unsplash.com/photo-1515263487990-61b07816b324?w=600&h=400&fit=crop"],
        rooms_total: 90, rooms_available: 12, rating: 4.7, review_count: 78,
        is_verified: true, is_featured: true, nearby_university: "University of Manchester",
        distance_to_uni_km: 0.8, created_at: "", updated_at: "",
    },
    {
        id: "sample-5", landlord_id: "", title: "The Collective Canary Wharf", description: "",
        type: "studio", room_types: [], city: "London", country: "United Kingdom",
        address: "20 Crossharbour Plaza, E14", latitude: null, longitude: null,
        price_per_month: 1100, currency: "GBP",
        amenities: ["WiFi", "Gym", "Swimming Pool", "Terrace", "Furnished"],
        images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop"],
        rooms_total: 150, rooms_available: 5, rating: 4.5, review_count: 42,
        is_verified: true, is_featured: false, nearby_university: "University of East London",
        distance_to_uni_km: 3.2, created_at: "", updated_at: "",
    },
    {
        id: "sample-6", landlord_id: "", title: "Unite Students Emily Bowes Court", description: "",
        type: "hostel", room_types: [], city: "London", country: "United Kingdom",
        address: "Osborne Road, N4", latitude: null, longitude: null,
        price_per_month: 820, currency: "GBP",
        amenities: ["WiFi", "Laundry", "Study Room", "CCTV"],
        images: ["https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=600&h=400&fit=crop"],
        rooms_total: 250, rooms_available: 30, rating: 4.1, review_count: 103,
        is_verified: true, is_featured: false, nearby_university: "Middlesex University",
        distance_to_uni_km: 2.5, created_at: "", updated_at: "",
    },
];

const currencySymbols: Record<string, string> = {
    GBP: "£", USD: "$", EUR: "€", AUD: "A$", CAD: "C$",
};

export function PropertyGrid({ initialProperties }: { initialProperties: Property[] }) {
    const properties = initialProperties.length > 0 ? initialProperties : FALLBACK_PROPERTIES;

    const [query, setQuery] = useState("");
    const [priceRange, setPriceRange] = useState(0);
    const [roomType, setRoomType] = useState("All");
    const [sortBy, setSortBy] = useState<string>("relevance");
    const [showFilters, setShowFilters] = useState(false);
    const [wishlisted, setWishlisted] = useState<Set<string>>(new Set());

    const toggleWishlist = (id: string) => {
        setWishlisted((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const filtered = useMemo(() => {
        let results = properties;

        if (query) {
            const q = query.toLowerCase();
            results = results.filter(
                (p) =>
                    p.title.toLowerCase().includes(q) ||
                    p.city.toLowerCase().includes(q) ||
                    p.nearby_university?.toLowerCase().includes(q)
            );
        }

        const range = PRICE_RANGES[priceRange];
        results = results.filter((p) => p.price_per_month >= range.min && p.price_per_month <= range.max);

        if (roomType !== "All") {
            results = results.filter((p) => p.type === roomType);
        }

        if (sortBy === "price_asc") results = [...results].sort((a, b) => a.price_per_month - b.price_per_month);
        if (sortBy === "price_desc") results = [...results].sort((a, b) => b.price_per_month - a.price_per_month);
        if (sortBy === "rating") results = [...results].sort((a, b) => b.rating - a.rating);

        return results;
    }, [query, priceRange, roomType, sortBy, properties]);

    return (
        <>
            {/* Search Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6 mb-6">
                <div className="flex flex-col lg:flex-row gap-3">
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
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={cn(
                            "flex items-center gap-2 h-12 px-5 rounded-xl border text-sm font-medium transition-all cursor-pointer",
                            showFilters ? "bg-amber-red text-white border-amber-red" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
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

                {showFilters && (
                    <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col lg:flex-row gap-4">
                        <div className="flex-1">
                            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Price Range</label>
                            <div className="flex flex-wrap gap-2">
                                {PRICE_RANGES.map((range, i) => (
                                    <button
                                        key={range.label}
                                        onClick={() => setPriceRange(i)}
                                        className={cn(
                                            "px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer",
                                            priceRange === i ? "bg-amber-red text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        )}
                                    >
                                        {range.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Room Type</label>
                            <div className="flex gap-2">
                                {ROOM_TYPES.map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setRoomType(type)}
                                        className={cn(
                                            "px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer capitalize",
                                            roomType === type ? "bg-amber-red text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        )}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>
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
                    {initialProperties.length === 0 && <span className="text-xs text-amber-500 ml-2">(showing sample data)</span>}
                </p>
                <div className="relative">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
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

            {/* Grid */}
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
                            className="group relative bg-white rounded-3xl border border-gray-100/80 overflow-hidden hover:shadow-[0_8px_30px_rgb(244,63,94,0.12)] hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="relative h-[220px] overflow-hidden m-2 rounded-2xl">
                                <Image
                                    src={property.images?.[0] || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop"}
                                    alt={property.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                                    {property.is_featured && (
                                        <span className="px-2.5 py-1 text-white bg-gradient-to-r from-amber-yellow to-orange-500 text-[10px] font-bold rounded-lg shadow-sm">FEATURED</span>
                                    )}
                                    {property.is_verified && (
                                        <span className="px-2.5 py-1 bg-amber-green/90 backdrop-blur-md text-white text-[10px] font-bold rounded-lg shadow-sm">✓ VERIFIED</span>
                                    )}
                                </div>
                                <button
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(property.id); }}
                                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center hover:bg-white hover:border-white transition-colors cursor-pointer z-10"
                                >
                                    <Heart size={16} className={cn("transition-colors", wishlisted.has(property.id) ? "fill-amber-red text-amber-red" : "text-white")} />
                                </button>
                                <div className="absolute bottom-3 left-3 z-10">
                                    <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold rounded-lg capitalize">{property.type}</span>
                                </div>
                            </div>
                            <div className="p-5 pt-3 relative">
                                <h3 className="text-[17px] font-bold text-gray-900 group-hover:text-amber-red transition-colors line-clamp-1">{property.title}</h3>
                                <div className="flex items-center gap-1.5 mt-1.5 text-[13px] text-gray-500 font-medium">
                                    <MapPin size={14} className="text-gray-400" />
                                    <span className="truncate">{property.address || `${property.city}, ${property.country}`}</span>
                                </div>
                                {property.nearby_university && (
                                    <div className="flex items-center gap-1.5 mt-2 text-[12px] font-semibold text-indigo-600 bg-indigo-50 w-fit px-2 py-1 rounded-md">
                                        <span>🎓</span>
                                        <span>{property.nearby_university} • {property.distance_to_uni_km} km</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-1.5 mt-4 overflow-hidden">
                                    {(property.amenities || []).slice(0, 3).map((a) => (
                                        <span key={a} className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-slate-600 font-medium text-[11px] rounded-lg whitespace-nowrap">{a}</span>
                                    ))}
                                    {(property.amenities || []).length > 3 && (
                                        <span className="text-[11px] text-gray-400 font-medium px-1">+{property.amenities.length - 3}</span>
                                    )}
                                </div>
                                <div className="flex items-end justify-between mt-5 pt-4 border-t border-gray-50">
                                    <div>
                                        <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700">{currencySymbols[property.currency] || "£"}{property.price_per_month}</span>
                                        <span className="text-xs text-slate-400 font-medium ml-1">/month</span>
                                    </div>
                                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                                        <Star size={14} className="fill-amber-500 text-amber-500" />
                                        <span className="text-[13px] font-bold text-amber-900">{property.rating}</span>
                                        <span className="text-[11px] text-amber-700/60 font-medium">({property.review_count})</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
}
