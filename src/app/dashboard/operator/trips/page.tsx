import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function OperatorTripsPage() {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "OPERATOR") redirect("/dashboard");

    const operator = await prisma.operator.findUnique({
        where: { ownerId: session.user.id }
    });

    const trips = await prisma.trip.findMany({
        where: { operatorId: operator?.id },
        include: { _count: { select: { bookings: true } } },
        orderBy: { createdAt: "desc" }
    });

    return (
        <div className="pt-24 pb-20 px-4 max-w-5xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/operator">
                        <Button variant="ghost" size="icon" className="rounded-full border border-border">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-white">My Trips</h1>
                        <p className="text-gray-400 text-sm">{trips.length} trips published</p>
                    </div>
                </div>
                <Link href="/dashboard/operator/trips/new">
                    <Button className="bg-cyan-500 hover:bg-cyan-600 rounded-xl gap-2">
                        <Plus className="w-4 h-4" /> New Trip
                    </Button>
                </Link>
            </div>

            <div className="bg-card border border-border rounded-3xl overflow-hidden">
                {trips.length === 0 ? (
                    <div className="py-20 text-center space-y-4">
                        <p className="text-gray-500">You haven't created any trips yet.</p>
                        <Link href="/dashboard/operator/trips/new">
                            <Button className="bg-cyan-500 hover:bg-cyan-600 rounded-xl gap-2">
                                <Plus className="w-4 h-4" /> Create your first trip
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-muted/30 text-xs text-gray-500 uppercase tracking-widest">
                            <tr>
                                <th className="px-6 py-4">Trip</th>
                                <th className="px-6 py-4">Destination</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Bookings</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {trips.map((trip: any) => (
                                <tr key={trip.id} className="hover:bg-muted/10 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white">{trip.title}</td>
                                    <td className="px-6 py-4 text-sm text-gray-400">{trip.destination || "—"}</td>
                                    <td className="px-6 py-4 text-cyan-400 font-bold text-sm">{trip.price.toLocaleString()} PKR</td>
                                    <td className="px-6 py-4 text-sm text-gray-300">{trip._count.bookings} / {trip.capacity}</td>
                                    <td className="px-6 py-4">
                                        <Badge className="bg-green-500/10 text-green-500 border-none text-xs">Active</Badge>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link href={`/trips/${trip.id}`}>
                                            <Button variant="ghost" size="sm" className="text-xs text-cyan-400">View</Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
