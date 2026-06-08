import { Search, MapPin, Calendar, DollarSign, Star } from "lucide-react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeroSearch from "@/components/hero-search";

export default async function Home() {
  const featuredTrips = await prisma.trip.findMany({
    take: 3,
    include: { operator: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2070&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-black/50 z-10" />

        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Adventure Awaits <br />
            <span className="text-cyan-400">Beyond the Horizon</span>
          </h1>
          <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
            Discover breathtaking destinations, curated tours, and unforgettable experiences with TourHub.
          </p>

          <HeroSearch />
        </div>
      </section>

      {/* Featured Trips Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Adventures</h2>
            <p className="text-gray-500">Handpicked tours for your perfect getaway</p>
          </div>
          <Link href="/trips">
            <Button variant="ghost" className="text-cyan-500 hover:text-cyan-600">View all</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredTrips.map((trip) => (
            <div key={trip.id} className="group rounded-2xl overflow-hidden bg-card border border-border transition-all hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/10">
              <div className="aspect-[16/10] bg-muted relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <div className="absolute top-4 left-4 z-20 bg-cyan-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {trip.duration}
                </div>
                <div className="w-full h-full bg-slate-800 bg-[url('https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4 text-white">
                  <h3 className="text-xl font-bold group-hover:text-cyan-400 transition-colors">{trip.title}</h3>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold">4.9</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                  {(trip as any).description}
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Starting from</p>
                    <p className="text-lg font-bold text-cyan-400">{(trip.price * Number(trip.operator?.fuelMultiplier || 1)).toLocaleString()} <span className="text-xs">PKR</span></p>
                  </div>
                  <Link href={`/trips/${trip.id}`}>
                    <Button variant="outline" className="rounded-xl border-cyan-500/50 text-cyan-400 hover:bg-cyan-500 hover:text-white">Explore</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
