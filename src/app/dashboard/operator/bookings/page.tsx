import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function OperatorBookingsPage() {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "OPERATOR") redirect("/dashboard");

    const operator = await prisma.operator.findUnique({
        where: { ownerId: session.user.id },
        include: {
            trips: {
                include: {
                    bookings: {
                        include: { user: true }
                    }
                }
            }
        }
    });

    const allBookings = operator?.trips.flatMap((t) =>
        t.bookings.map((b) => ({ ...b, tripTitle: t.title, tripPrice: t.price }))
    ) || [];

    return (
        <div className="pt-24 pb-20 px-4 max-w-5xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/operator">
                    <Button variant="ghost" size="icon" className="rounded-full border border-border">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-white">All Bookings</h1>
                    <p className="text-gray-400 text-sm">{allBookings.length} total bookings across your trips</p>
                </div>
            </div>

            <div className="bg-card border border-border rounded-3xl overflow-hidden">
                {allBookings.length === 0 ? (
                    <div className="py-20 text-center">
                        <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-500">No bookings yet. Share your trips to get started!</p>
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-muted/30 text-xs text-gray-500 uppercase tracking-widest">
                            <tr>
                                <th className="px-6 py-4">Traveler</th>
                                <th className="px-6 py-4">Trip</th>
                                <th className="px-6 py-4">Seats</th>
                                <th className="px-6 py-4">CNIC</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {allBookings.map((booking: any) => (
                                <tr key={booking.id} className="hover:bg-muted/10 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-white">{booking.user?.name || "Anonymous"}</p>
                                        <p className="text-xs text-gray-500">{booking.user?.email}</p>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-300">{booking.tripTitle}</td>
                                    <td className="px-6 py-4 text-sm text-cyan-400 font-bold">
                                        {Array.isArray(booking.seats) ? booking.seats.join(", ") : booking.seats}
                                    </td>
                                    <td className="px-6 py-4 text-xs text-gray-400 font-mono">
                                        {(booking as any).cnic || "—"}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-white">
                                        {((booking.depositAmount || booking.tripPrice) as number).toLocaleString()} PKR
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge className="bg-green-500/10 text-green-500 border-none text-xs">
                                            {booking.status}
                                        </Badge>
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
