"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Calendar, DollarSign } from "lucide-react";

export default function HeroSearch() {
    const [destination, setDestination] = useState("");
    const [budget, setBudget] = useState("");
    const [duration, setDuration] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (destination) params.set("destination", destination);
        if (budget) params.set("budget", budget);
        if (duration) params.set("duration", duration);
        router.push(`/trips?${params.toString()}`);
    };

    return (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-4 items-center animate-in fade-in slide-in-from-bottom-12 duration-1200">
            <div className="flex items-center gap-2 bg-white/5 rounded-xl px-4 py-2 flex-1 w-full text-white">
                <MapPin className="text-cyan-400 w-5 h-5 flex-shrink-0" />
                <Input
                    placeholder="Where to?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="bg-transparent border-none text-white placeholder:text-gray-400 focus-visible:ring-0"
                />
            </div>
            <div className="flex items-center gap-2 bg-white/5 rounded-xl px-4 py-2 flex-1 w-full text-white">
                <DollarSign className="text-cyan-400 w-5 h-5 flex-shrink-0" />
                <Input
                    placeholder="Budget (PKR)"
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="bg-transparent border-none text-white placeholder:text-gray-400 focus-visible:ring-0"
                />
            </div>
            <div className="flex items-center gap-2 bg-white/5 rounded-xl px-4 py-2 flex-1 w-full text-white">
                <Calendar className="text-cyan-400 w-5 h-5 flex-shrink-0" />
                <Input
                    placeholder="Duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="bg-transparent border-none text-white placeholder:text-gray-400 focus-visible:ring-0"
                />
            </div>
            <Button
                onClick={handleSearch}
                size="lg"
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-xl px-8 w-full md:w-auto transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)]"
            >
                <Search className="mr-2 w-5 h-5" /> Search
            </Button>
        </div>
    );
}
