"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProperty } from "@/lib/actions";
import { Plus, X, Upload } from "lucide-react";
import Image from "next/image";

const AMENITIES_LIST = [
    "WiFi", "Gym", "Laundry", "CCTV", "Study Room",
    "Furnished", "24/7 Reception", "Cinema Room", "Swimming Pool", "Terrace"
];

const DEFAULT_IMAGES = [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&fit=crop",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&fit=crop",
    "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800&fit=crop"
];

export function ListPropertyForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        type: "studio",
        city: "",
        address: "",
        price_per_month: "",
        nearby_university: "",
        distance_to_uni_km: "",
        rooms_total: 1,
        rooms_available: 1,
    });

    const [amenities, setAmenities] = useState<string[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const [imageUrlInput, setImageUrlInput] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleAmenity = (amenity: string) => {
        setAmenities(prev =>
            prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
        );
    };

    const addImageUrl = () => {
        if (imageUrlInput.trim() && !images.includes(imageUrlInput.trim())) {
            setImages([...images, imageUrlInput.trim()]);
            setImageUrlInput("");
        }
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const addRandomSampleImage = (e: React.MouseEvent) => {
        e.preventDefault();
        const randomImg = DEFAULT_IMAGES[Math.floor(Math.random() * DEFAULT_IMAGES.length)];
        if (!images.includes(randomImg)) {
            setImages([...images, randomImg]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Prepare data
        const submissionData = {
            ...formData,
            price_per_month: Number(formData.price_per_month),
            distance_to_uni_km: formData.distance_to_uni_km ? Number(formData.distance_to_uni_km) : null,
            amenities,
            images: images.length > 0 ? images : [DEFAULT_IMAGES[0]], // fallback image
            room_types: ["single"], // simplifying for form
        };

        const { success, error: apiError } = await createProperty(submissionData);

        if (success) {
            router.push("/dashboard/properties");
            router.refresh(); // Ensure the new property appears in the list
        } else {
            setError(apiError || "Failed to list property");
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
                    {error}
                </div>
            )}

            {/* Basic Info */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Basic Info</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Property Title *</label>
                        <input required name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Vita Student Manchester" className="w-full h-11 px-4 border border-gray-200 rounded-xl text-sm focus:border-amber-red focus:ring-1 focus:ring-amber-red outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                        <select name="type" value={formData.type} onChange={handleChange} className="w-full h-11 px-4 border border-gray-200 rounded-xl text-sm focus:border-amber-red focus:ring-1 focus:ring-amber-red outline-none bg-white">
                            <option value="pg">PG</option>
                            <option value="apartment">Apartment</option>
                            <option value="hostel">Hostel</option>
                            <option value="studio">Studio</option>
                            <option value="shared">Shared Room</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                    <textarea required name="description" value={formData.description} onChange={handleChange} placeholder="Describe the property..." rows={4} className="w-full p-4 border border-gray-200 rounded-xl text-sm focus:border-amber-red focus:ring-1 focus:ring-amber-red outline-none resize-none" />
                </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Location</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                        <input required name="city" value={formData.city} onChange={handleChange} placeholder="e.g. London" className="w-full h-11 px-4 border border-gray-200 rounded-xl text-sm focus:border-amber-red focus:ring-1 focus:ring-amber-red outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Address *</label>
                        <input required name="address" value={formData.address} onChange={handleChange} placeholder="e.g. 58 Southwark Bridge Road, SE1" className="w-full h-11 px-4 border border-gray-200 rounded-xl text-sm focus:border-amber-red focus:ring-1 focus:ring-amber-red outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nearby University</label>
                        <input name="nearby_university" value={formData.nearby_university} onChange={handleChange} placeholder="e.g. King's College London" className="w-full h-11 px-4 border border-gray-200 rounded-xl text-sm focus:border-amber-red focus:ring-1 focus:ring-amber-red outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Distance to Uni (km)</label>
                        <input type="number" step="0.1" name="distance_to_uni_km" value={formData.distance_to_uni_km} onChange={handleChange} placeholder="e.g. 0.5" className="w-full h-11 px-4 border border-gray-200 rounded-xl text-sm focus:border-amber-red focus:ring-1 focus:ring-amber-red outline-none" />
                    </div>
                </div>
            </div>

            {/* Pricing & Rooms */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Pricing & Rooms</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price / Month (£) *</label>
                        <input required type="number" name="price_per_month" value={formData.price_per_month} onChange={handleChange} placeholder="1200" className="w-full h-11 px-4 border border-gray-200 rounded-xl text-sm focus:border-amber-red focus:ring-1 focus:ring-amber-red outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Total Rooms</label>
                        <input required type="number" min="1" name="rooms_total" value={formData.rooms_total} onChange={handleChange} className="w-full h-11 px-4 border border-gray-200 rounded-xl text-sm focus:border-amber-red focus:ring-1 focus:ring-amber-red outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rooms Available *</label>
                        <input required type="number" min="1" name="rooms_available" value={formData.rooms_available} onChange={handleChange} className="w-full h-11 px-4 border border-gray-200 rounded-xl text-sm focus:border-amber-red focus:ring-1 focus:ring-amber-red outline-none" />
                    </div>
                </div>
            </div>

            {/* Amenities */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                    {AMENITIES_LIST.map((amenity) => (
                        <button
                            key={amenity}
                            type="button"
                            onClick={() => toggleAmenity(amenity)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${amenities.includes(amenity)
                                    ? "bg-amber-red text-white border-amber-red"
                                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                                }`}
                        >
                            {amenity}
                        </button>
                    ))}
                </div>
            </div>

            {/* Images */}
            <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <h3 className="text-lg font-bold text-gray-900">Images</h3>
                    <button onClick={addRandomSampleImage} className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                        Use sample image
                    </button>
                </div>

                <div className="flex gap-2">
                    <input
                        type="url"
                        value={imageUrlInput}
                        onChange={(e) => setImageUrlInput(e.target.value)}
                        placeholder="Paste image URL here..."
                        className="flex-1 h-11 px-4 border border-gray-200 rounded-xl text-sm focus:border-amber-red outline-none"
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addImageUrl())}
                    />
                    <button
                        type="button"
                        onClick={addImageUrl}
                        className="h-11 px-5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors flex items-center gap-2"
                    >
                        <Upload size={16} /> Add Image
                    </button>
                </div>

                {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        {images.map((url, i) => (
                            <div key={i} className="relative aspect-video rounded-xl border border-gray-200 overflow-hidden group">
                                <Image src={url} alt={`Preview ${i}`} fill className="object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removeImage(i)}
                                    className="absolute top-2 right-2 p-1.5 bg-white/90 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Submit */}
            <div className="pt-6 border-t border-gray-100 w-full flex justify-end gap-3">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-amber-red text-white font-semibold rounded-xl hover:bg-amber-red-hover transition-colors disabled:opacity-70 flex items-center gap-2"
                >
                    {loading ? "Saving..." : <><Plus size={18} /> Publish Property</>}
                </button>
            </div>
        </form>
    );
}
