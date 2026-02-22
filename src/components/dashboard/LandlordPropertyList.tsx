"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, MapPin, Edit, Trash2 } from "lucide-react";
import type { Property } from "@/types";
import { deleteProperty } from "@/lib/actions";

export function LandlordPropertyList({ initialProperties }: { initialProperties: Property[] }) {
    const [properties, setProperties] = useState(initialProperties);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this property? This action cannot be undone.")) return;

        setIsDeleting(id);
        const { success, error } = await deleteProperty(id);

        if (success) {
            setProperties(properties.filter(p => p.id !== id));
        } else {
            alert("Failed to delete: " + error);
        }
        setIsDeleting(null);
    };

    if (properties.length === 0) {
        return (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                <div className="text-5xl mb-4">🏢</div>
                <h3 className="text-lg font-bold text-gray-900">No properties yet</h3>
                <p className="text-sm text-gray-500 mt-1 mb-6">You haven&apos;t listed any properties. Let&apos;s change that!</p>
                <Link
                    href="/dashboard/list-property"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-red text-white font-semibold rounded-xl hover:bg-amber-red-hover transition-colors"
                >
                    <Plus size={18} /> List your first property
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">My Properties ({properties.length})</h2>
                <Link
                    href="/dashboard/list-property"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-amber-red text-white text-sm font-semibold rounded-xl hover:bg-amber-red-hover transition-colors"
                >
                    <Plus size={16} /> Add New
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {properties.map((property) => (
                    <div key={property.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col">
                        <div className="relative h-48">
                            <Image
                                src={property.images?.[0] || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop"}
                                alt={property.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute top-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold rounded-md">
                                {property.is_verified ? "VERIFIED" : "PENDING"}
                            </div>
                        </div>

                        <div className="p-4 flex-1 flex flex-col">
                            <h3 className="text-base font-semibold text-gray-900 line-clamp-1">{property.title}</h3>
                            <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 mb-4">
                                <MapPin size={12} />
                                <span className="line-clamp-1">{property.address || `${property.city}, ${property.country}`}</span>
                            </div>

                            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                <div>
                                    <span className="text-sm font-bold text-gray-900">{property.currency === 'GBP' ? '£' : property.currency}{property.price_per_month}</span>
                                    <span className="text-xs text-gray-500">/mo</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Link
                                        href={`/property/${property.id}`}
                                        target="_blank"
                                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                        title="View Property"
                                    >
                                        <Edit size={16} />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(property.id)}
                                        disabled={isDeleting === property.id}
                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                        title="Delete Property"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
