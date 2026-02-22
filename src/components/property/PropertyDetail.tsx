"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Star, MapPin, Heart, Share2, CheckCircle, Wifi, Dumbbell,
    Shirt, Video, BookOpen, Shield, ChevronLeft, ChevronRight, Calendar,
    MessageCircle, Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Property } from "@/types";

const amenityIcons: Record<string, React.ReactNode> = {
    WiFi: <Wifi size={16} />, Gym: <Dumbbell size={16} />,
    Laundry: <Shirt size={16} />, CCTV: <Video size={16} />,
    "Study Room": <BookOpen size={16} />, Furnished: <CheckCircle size={16} />,
    "24/7 Reception": <Shield size={16} />,
};

const currencySymbols: Record<string, string> = {
    GBP: "£", USD: "$", EUR: "€", AUD: "A$", CAD: "C$",
};

export function PropertyDetail({ property }: { property: Property }) {
    const [currentImg, setCurrentImg] = useState(0);
    const [wishlisted, setWishlisted] = useState(false);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const images = property.images?.length > 0
        ? property.images
        : ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&h=600&fit=crop"];
    const sym = currencySymbols[property.currency] || "£";

    const nextImg = () => setCurrentImg((p) => (p + 1) % images.length);
    const prevImg = () => setCurrentImg((p) => (p - 1 + images.length) % images.length);

    return (
        <div className="min-h-screen bg-gray-50 pt-[72px]">
            {/* Breadcrumb */}
            <div className="max-w-[1440px] mx-auto px-4 lg:px-9 py-3">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Link href="/" className="hover:text-gray-600">Home</Link>
                    <span>/</span>
                    <Link href="/search" className="hover:text-gray-600">Search</Link>
                    <span>/</span>
                    <Link href={`/search?city=${property.city}`} className="hover:text-gray-600">{property.city}</Link>
                    <span>/</span>
                    <span className="text-gray-700 font-medium">{property.title}</span>
                </div>
            </div>

            {/* Image Gallery */}
            <div className="max-w-[1440px] mx-auto px-4 lg:px-9">
                <div className="relative h-[300px] md:h-[450px] rounded-2xl overflow-hidden group">
                    <Image src={images[currentImg]} alt={`${property.title} - Photo ${currentImg + 1}`} fill className="object-cover" priority sizes="100vw" />
                    <button onClick={prevImg} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"><ChevronLeft size={20} /></button>
                    <button onClick={nextImg} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"><ChevronRight size={20} /></button>
                    <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-lg text-white text-xs font-medium">{currentImg + 1} / {images.length}</div>
                    <div className="absolute bottom-4 left-4 flex gap-2">
                        {images.map((img, i) => (
                            <button key={i} onClick={() => setCurrentImg(i)} className={cn("w-12 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer", currentImg === i ? "border-white scale-110" : "border-transparent opacity-60 hover:opacity-100")}>
                                <Image src={img} alt="" width={48} height={48} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-[1440px] mx-auto px-4 lg:px-9 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left */}
                    <div className="flex-1 space-y-6">
                        <div>
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        {property.is_verified && <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-md">✓ Verified</span>}
                                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-md capitalize">{property.type}</span>
                                    </div>
                                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{property.title}</h1>
                                    <div className="flex items-center gap-1 mt-1 text-sm text-gray-500"><MapPin size={14} /><span>{property.address || `${property.city}, ${property.country}`}</span></div>
                                    {property.nearby_university && (
                                        <div className="flex items-center gap-1 mt-1 text-sm text-indigo-600">🎓 {property.nearby_university} • {property.distance_to_uni_km} km away</div>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => setWishlisted(!wishlisted)} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 cursor-pointer">
                                        <Heart size={18} className={wishlisted ? "fill-amber-red text-amber-red" : "text-gray-400"} />
                                    </button>
                                    <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 cursor-pointer"><Share2 size={18} className="text-gray-400" /></button>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 mt-3">
                                <div className="flex items-center gap-1 px-3 py-1 bg-amber-50 rounded-lg"><Star size={16} className="fill-amber-400 text-amber-400" /><span className="text-sm font-bold text-gray-900">{property.rating}</span></div>
                                <span className="text-sm text-gray-500">{property.review_count} reviews</span>
                                <span className="text-sm text-emerald-600 font-medium">{property.rooms_available} rooms available</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 mb-3">About this property</h2>
                            <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{property.description || "No description available."}</div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Amenities</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {(property.amenities || []).map((amenity) => (
                                    <div key={amenity} className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl">
                                        <div className="text-amber-red">{amenityIcons[amenity] || <CheckCircle size={16} />}</div>
                                        <span className="text-sm text-gray-700 font-medium">{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Booking Sidebar */}
                    <div className="lg:w-[380px] flex-shrink-0">
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-24 space-y-5">
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-gray-900">{sym}{property.price_per_month}</span>
                                <span className="text-sm text-gray-400">/month</span>
                            </div>
                            <p className="text-xs text-gray-500 -mt-2">Bills included • No hidden fees</p>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-xs font-medium text-gray-500 block mb-1">Move-in Date</label>
                                    <div className="relative">
                                        <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="date"
                                            value={checkIn}
                                            onChange={(e) => setCheckIn(e.target.value)}
                                            className="w-full h-11 pl-10 pr-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:ring-2 focus:ring-amber-red/20 focus:border-amber-red"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-gray-500 block mb-1">Move-out Date</label>
                                    <div className="relative">
                                        <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="date"
                                            value={checkOut}
                                            onChange={(e) => setCheckOut(e.target.value)}
                                            className="w-full h-11 pl-10 pr-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:ring-2 focus:ring-amber-red/20 focus:border-amber-red"
                                        />
                                    </div>
                                </div>
                            </div>
                            <Link
                                href={`/property/${property.id}/book?checkIn=${checkIn}&checkOut=${checkOut}`}
                                className="w-full h-12 rounded-xl bg-amber-red text-white font-semibold text-sm hover:bg-amber-red-hover transition-colors flex items-center justify-center cursor-pointer"
                            >
                                Continue to Book
                            </Link>
                            <Link
                                href={`/dashboard/messages?start=true&property=${property.id}&landlord=${property.landlord_id}`}
                                className="w-full mt-4 h-12 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <MessageCircle size={16} /> Contact Landlord
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
