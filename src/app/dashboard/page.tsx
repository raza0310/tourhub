import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, Star, Compass, Plus } from "lucide-react";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    const role = (session.user as any)?.role || "USER";

    if (role === "ADMIN") {
        redirect("/dashboard/admin");
    } else if (role === "OPERATOR") {
        redirect("/dashboard/operator");
    }

    // Check if this USER has a pending operator request
    const operatorRequest = await prisma.operator.findFirst({
        where: { ownerId: session.user.id }
    });

    if (operatorRequest && operatorRequest.status === "PENDING") {
        return (
            <div className="pt-32 pb-20 px-4 max-w-xl mx-auto text-center">
                <div className="w-20 h-20 bg-cyan-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl animate-pulse">⏳</span>
                </div>
                <h1 className="text-3xl font-bold mb-4 text-white">Verification Pending</h1>
                <p className="text-gray-400 mb-8">
                    Shukriya! Aapki Operator registration request humein mil gayi hai. <br />
                    Humara admin aapki details verify kar raha hai. Isme 24-48 ghante lag sakte hain.
                </p>
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-sm text-cyan-400">
                    Verification ke baad aap Trips create kar sakenge.
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen pt-20">
            {/* Sidebar */}
            <aside className="w-64 border-r border-border bg-card/50 backdrop-blur-md p-6 hidden md:block">
                <nav className="space-y-2">
                    <Link href="/dashboard" className="flex items-center gap-3 p-3 bg-cyan-500/10 text-cyan-400 rounded-xl font-bold">
                        <LayoutDashboard className="w-5 h-5" /> Overview
                    </Link>
                    <Link href="/dashboard/my-bookings" className="flex items-center gap-3 p-3 text-gray-400 hover:text-white transition-all">
                        <Users className="w-5 h-5" /> My Bookings
                    </Link>
                    <Link href="/dashboard/favorites" className="flex items-center gap-3 p-3 text-gray-400 hover:text-white transition-all">
                        <Star className="w-5 h-5" /> Favorites
                    </Link>
                    <Link href="/dashboard/reviews" className="flex items-center gap-3 p-3 text-gray-400 hover:text-white transition-all">
                        <Compass className="w-5 h-5" /> My Reviews
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 space-y-8 overflow-y-auto">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Welcome, {session.user.name}</h1>
                        <p className="text-gray-400">Ready for your next adventure?</p>
                    </div>
                    <Link href="/">
                        <Button className="bg-cyan-500 hover:bg-cyan-600 rounded-xl flex gap-2">
                            <Plus className="w-5 h-5" /> Book a New Trip
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-card border border-border p-6 rounded-3xl">
                        <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Active Bookings</p>
                        <p className="text-3xl font-bold text-white">0</p>
                    </div>
                    <div className="bg-card border border-border p-6 rounded-3xl">
                        <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Rewards Points</p>
                        <p className="text-3xl font-bold text-cyan-400">150</p>
                    </div>
                    <div className="bg-card border border-border p-6 rounded-3xl">
                        <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Total Spent</p>
                        <p className="text-3xl font-bold text-white">0 PKR</p>
                    </div>
                </div>

                {/* Recent Bookings Table */}
                <div className="bg-card border border-border rounded-3xl overflow-hidden text-center py-20 p-8">
                    <Compass className="w-16 h-16 text-white/10 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white">No Bookings Yet</h3>
                    <p className="text-gray-500 mb-8 max-w-sm mx-auto">Explore our featured destinations and book your first adventure today!</p>
                    <Link href="/">
                        <Button variant="outline" className="rounded-xl">Explore Trips</Button>
                    </Link>
                </div>
            </main>
        </div>
    );
}
