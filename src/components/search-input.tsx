"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchInput() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("destination") || "");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams);
        if (query) {
            params.set("destination", query);
        } else {
            params.delete("destination");
        }
        router.push(`/trips?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSearch} className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search trips..."
                className="pl-10 rounded-xl bg-card border-border text-white focus:ring-cyan-500"
            />
        </form>
    );
}
