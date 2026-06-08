import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, CheckCircle2, Star } from "lucide-react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import BookingSection from "@/components/booking-section";

export default async function TripDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const trip = await prisma.trip.findUnique({
        where: { id },
        include: {
            operator: true,
            _count: { select: { bookings: true } }
        }
    });

    if (!trip) {
        notFound();
    }

    return (
        <div className="pt-24 pb-20">
            {/* Hero Gallery */}
            <section className="h-[60vh] grid grid-cols-4 gap-2 px-4 mb-12">
                <div className="col-span-2 row-span-2 bg-slate-800 rounded-l-3xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
                </div>
                <div className="bg-slate-700 overflow-hidden" />
                <div className="bg-slate-700 rounded-tr-3xl overflow-hidden" />
                <div className="bg-slate-700 overflow-hidden" />
                <div className="bg-slate-700 rounded-br-3xl overflow-hidden" />
            </section>

            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Content */}
                <div className="lg:col-span-2 space-y-12">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Badge variant="secondary" className="bg-cyan-500/10 text-cyan-400 border-none px-3">Adventure</Badge>
                            <div className="flex items-center gap-1 text-sm font-bold">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-white">4.9 (124 reviews)</span>
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">{trip.title}</h1>
                        <div className="flex flex-wrap gap-6 text-gray-400">
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-cyan-400" />
                                <span>{trip.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-cyan-400" />
                                <span>Max {trip.capacity} People</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-cyan-400" />
                                <span>Departure: {trip.destination || "Pakistan"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold border-l-4 border-cyan-500 pl-4 text-white">Overview</h3>
                        <p className="text-gray-400 leading-relaxed">
                            {(trip as any).description}
                        </p>
                    </div>

                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold border-l-4 border-cyan-500 pl-4 text-white">Itinerary</h3>
                        <div className="space-y-8 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                            {[
                                { day: 1, title: "Departure", desc: "Start of your grand adventure." },
                                { day: 2, title: "Exploration", desc: "Discovering hidden gems and local wonders." },
                                { day: 3, title: "Cultural Immersion", desc: "Experience the local heritage and traditions." },
                            ].map((step) => (
                                <div key={step.day} className="relative pl-12">
                                    <div className="absolute left-0 top-0 w-9 h-9 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold z-10 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                                        {step.day}
                                    </div>
                                    <h4 className="text-lg font-bold mb-2 text-white">{step.title}</h4>
                                    <p className="text-gray-400 text-sm">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sticky Sidebar Booking */}
                <aside className="lg:col-span-1">
                    <BookingSection
                        tripId={trip.id}
                        price={trip.price * Number((trip.operator as any)?.fuelMultiplier || 1)}
                        capacity={trip.capacity}
                        bookedSeatsCount={trip._count.bookings}
                    />
                </aside>
            </div>
        </div>
    );
}
