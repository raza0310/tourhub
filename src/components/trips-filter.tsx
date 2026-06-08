"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SlidersHorizontal } from "lucide-react";

const destinations = ["Hunza", "Skardu", "Swat", "Naran", "Kashmir"];

export default function TripsFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [dest, setDest] = useState(searchParams.get("destination") || "");
    const [budget, setBudget] = useState(searchParams.get("budget") || "");

    const applyFilters = () => {
        const params = new URLSearchParams();
        if (dest) params.set("destination", dest);
        if (budget) params.set("budget", budget);
        router.push(`/trips?${params.toString()}`);
    };

    return (
        <aside className="w-full md:w-72 space-y-8">
            <div className="bg-card border border-border p-6 rounded-2xl sticky top-28 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg text-white">Filters</h3>
                    <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                </div>

                {/* Destination Filter */}
                <div className="space-y-4 mb-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">Destination</p>
                    <div className="space-y-4">
                        <Input
                            placeholder="Type city or region..."
                            value={dest}
                            onChange={(e) => setDest(e.target.value)}
                            className="bg-muted/30 border-border rounded-xl text-white focus:ring-cyan-500"
                        />
                        <div className="flex flex-wrap gap-2">
                            {destinations.map((d) => (
                                <button
                                    key={d}
                                    onClick={() => setDest(d)}
                                    className={`text-[10px] px-2 py-1 rounded-md border transition-all ${dest.toLowerCase() === d.toLowerCase()
                                            ? "bg-cyan-500/20 border-cyan-500 text-cyan-400"
                                            : "border-border text-gray-500 hover:border-gray-400"
                                        }`}
                                >
                                    {d}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Budget Range */}
                <div className="space-y-4 mb-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">Max Budget (PKR)</p>
                    <Input
                        type="number"
                        placeholder="e.g. 50000"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="bg-muted/30 border-border rounded-xl text-white focus:ring-cyan-500"
                    />
                </div>

                <Button
                    onClick={applyFilters}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl shadow-lg shadow-cyan-500/20 font-bold h-12 transition-all active:scale-95"
                >
                    Apply Filters
                </Button>
            </div>
        </aside>
    );
}
