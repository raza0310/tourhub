import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, LayoutDashboard, Map as MapIcon, Users, TrendingUp, MoreVertical } from "lucide-react";
import { getDashboardStats } from "@/services/userService";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function OperatorDashboard() {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== "OPERATOR") {
        redirect("/dashboard");
    }

    const data = await getDashboardStats(session.user.id);
    if (!data) return <div>Loading...</div>;

    const userId = session.user.id;

    const user = await prisma.user.findUnique({
        where: { id: userId! },
        include: { operator: true }
    });

    const trips = await prisma.trip.findMany({
        where: { operatorId: user?.operator?.id },
        include: { _count: { select: { bookings: true } } },
        orderBy: { createdAt: "desc" }
    });

    return (
        <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto flex gap-8">
            {/* Sidebar */}
            <aside className="w-64 hidden md:block">
                <div className="space-y-2">
                    <Link
                        href="/dashboard/operator"
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "w-full justify-start gap-3 bg-cyan-500/10 text-cyan-400"
                        )}
                    >
                        <LayoutDashboard className="w-5 h-5" /> Dashboard
                    </Link>
                    <Link
                        href="/dashboard/operator/trips"
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "w-full justify-start gap-3 text-gray-400 hover:text-white"
                        )}
                    >
                        <MapIcon className="w-5 h-5" /> My Trips
                    </Link>
                    <Link
                        href="/dashboard/operator/bookings"
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "w-full justify-start gap-3 text-gray-400 hover:text-white"
                        )}
                    >
                        <Users className="w-5 h-5" /> Bookings
                    </Link>
                    <Link
                        href="/dashboard/operator/settings"
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "w-full justify-start gap-3 text-gray-400 hover:text-white"
                        )}
                    >
                        <TrendingUp className="w-5 h-5" /> Settings & Pricing
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Operator Dashboard</h1>
                    <Link href="/dashboard/operator/trips/new">
                        <Button className="bg-cyan-500 hover:bg-cyan-600 rounded-xl gap-2">
                            <Plus className="w-5 h-5" /> Create New Trip
                        </Button>
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-card border border-border p-6 rounded-2xl">
                        <p className="text-gray-500 text-sm mb-2 uppercase tracking-widest">Total Revenue</p>
                        <p className="text-3xl font-bold text-cyan-400">{data.stats.revenue?.toLocaleString()} <span className="text-sm font-normal text-gray-500">PKR</span></p>
                    </div>
                    <div className="bg-card border border-border p-6 rounded-2xl">
                        <p className="text-gray-500 text-sm mb-2 uppercase tracking-widest">Active Trips</p>
                        <p className="text-3xl font-bold">{data.stats.tripsCount}</p>
                    </div>
                    <div className="bg-card border border-border p-6 rounded-2xl">
                        <p className="text-gray-500 text-sm mb-2 uppercase tracking-widest">Total Bookings</p>
                        <p className="text-3xl font-bold">{data.stats.bookingsCount}</p>
                    </div>
                </div>

                {/* Trips Table */}
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="p-6 border-b border-border flex justify-between items-center">
                        <h3 className="font-bold">Managed Trips</h3>
                        <Link href="/dashboard/operator/trips"><Button variant="ghost" size="sm">View All</Button></Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-muted/30 text-xs text-gray-500 uppercase tracking-widest">
                                <tr>
                                    <th className="px-6 py-4">Trip Name</th>
                                    <th className="px-6 py-4">Price</th>
                                    <th className="px-6 py-4">Bookings</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {trips.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No trips found. Create your first trip!</td>
                                    </tr>
                                ) : (
                                    trips.map((trip: any) => (
                                        <tr key={trip.id} className="hover:bg-muted/10 transition-colors">
                                            <td className="px-6 py-4 font-medium">{trip.title}</td>
                                            <td className="px-6 py-4 text-cyan-400 font-bold">{trip.price.toLocaleString()} PKR</td>
                                            <td className="px-6 py-4">{trip._count.bookings} / {trip.capacity}</td>
                                            <td className="px-6 py-4">
                                                <Badge className="bg-green-500/10 text-green-500 border-none">Active</Badge>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}


