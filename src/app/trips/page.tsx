import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, SlidersHorizontal, Star, Calendar, Clock } from "lucide-react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import TripsFilter from "@/components/trips-filter";
import SearchInput from "@/components/search-input";

export default async function TripsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;
    const dest = params.destination as string;
    const budget = params.budget as string;
    const duration = params.duration as string;

    const trips = await prisma.trip.findMany({
        where: {
            AND: [
                dest ? {
                    OR: [
                        { title: { contains: dest, mode: "insensitive" } },
                        { destination: { contains: dest, mode: "insensitive" } }
                    ]
                } : {},
                budget ? { price: { lte: parseInt(budget) } } : {},
                duration ? { duration: { contains: duration, mode: "insensitive" } } : {},
            ]
        },
        include: {
            operator: true,
            _count: { select: { bookings: true } }
        },
        orderBy: { createdAt: "desc" }
    });

    return (
        <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters */}
                <TripsFilter />

                {/* Results Grid */}
                <main className="flex-1">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-white">
                                {trips.length} Adventures Found
                            </h2>
                            {dest && <p className="text-sm text-cyan-400">Searching in {dest}</p>}
                        </div>
                        <SearchInput />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {trips.length === 0 ? (
                            <div className="col-span-full space-y-12">
                                <div className="py-20 text-center bg-card border border-dashed border-border rounded-3xl">
                                    <MapPin className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-white mb-2">Abhi yahan koi fixed trip nahi hai</h3>
                                    <p className="text-gray-500 mb-6 max-w-md mx-auto">Lekin pareshan na hon! Aap hamare AI Planner se apni marzi ka plan tayaar karwa sakte hain.</p>
                                    <Link href="/ai-planner">
                                        <Button className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl px-8 font-bold">
                                            AI Planner Use Karein
                                        </Button>
                                    </Link>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-white mb-6 border-l-4 border-cyan-500 pl-4 uppercase tracking-widest text-sm">Recommended Adventures</h3>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        {(await prisma.trip.findMany({ take: 4, include: { operator: true } })).map((trip) => (
                                            <TripCard key={trip.id} trip={trip} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            trips.map((trip) => <TripCard key={trip.id} trip={trip} />)
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

function TripCard({ trip }: { trip: any }) {
    const basePrice = trip.price;
    const multiplier = Number(trip.operator?.fuelMultiplier || 1);
    const adjustedPrice = basePrice * multiplier;

    return (
        <div className="group flex flex-col sm:flex-row bg-card border border-border rounded-3xl overflow-hidden hover:border-cyan-500/50 transition-all hover:shadow-2xl hover:shadow-cyan-500/10">
            <div className="sm:w-56 h-56 sm:h-auto bg-slate-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                <div className="absolute top-4 left-4 z-20 bg-cyan-500 text-white px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-cyan-500/40">
                    {trip.duration}
                </div>
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> {trip.destination || "Pakistan"}
                            </span>
                            <p className="text-[10px] text-gray-500 flex items-center gap-1 font-medium">
                                <Clock className="w-3 h-3" /> By {trip.operator?.companyName || "Verified Operator"}
                            </p>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded-lg">
                            <Star className="w-3 h-3 fill-current" />
                            <span className="text-xs font-bold">4.8</span>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors leading-tight">{trip.title}</h3>
                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed"> {(trip as any).description} </p>
                </div>

                <div className="flex justify-between items-end mt-6">
                    <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Starting from</p>
                        <div className="text-xl font-black text-cyan-400">
                            {adjustedPrice.toLocaleString()} <span className="text-[10px] text-gray-400 font-bold ml-0.5">PKR</span>
                            {multiplier > 1 && (
                                <span className="text-[8px] text-yellow-500 bg-yellow-500/10 px-1 rounded ml-1 animate-pulse">Fuel Adj.</span>
                            )}
                        </div>
                    </div>
                    <Link href={`/trips/${trip.id}`}>
                        <Button className="bg-white text-black hover:bg-cyan-500 hover:text-white rounded-xl text-xs font-bold transition-all px-6">
                            Explore
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
