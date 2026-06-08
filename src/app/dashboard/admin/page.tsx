import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, ShieldCheck, Map, BarChart3, Bell, Settings } from "lucide-react";
import { getDashboardStats } from "@/services/userService";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import VerifyButton from "@/components/admin/verify-button";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== "ADMIN") {
        redirect("/dashboard");
    }

    const data = await getDashboardStats(session.user.id);
    if (!data) return <div>Loading...</div>;

    const pendingOperators = await prisma.operator.findMany({
        where: { status: "PENDING" },
        include: { user: true },
        take: 5
    });

    return (
        <div className="flex min-h-screen pt-20">
            {/* Sidebar */}
            <aside className="w-64 border-r border-border bg-card/50 backdrop-blur-md p-6 hidden md:block">
                <nav className="space-y-2">
                    <Link href="/dashboard/admin" className="flex items-center gap-3 p-3 bg-cyan-500/10 text-cyan-400 rounded-xl font-bold">
                        <ShieldCheck className="w-5 h-5" /> Admin Console
                    </Link>
                    <Link href="/dashboard/admin/users" className="flex items-center gap-3 p-3 text-gray-400 hover:text-white transition-all">
                        <Users className="w-5 h-5" /> Manage Users
                    </Link>
                    <Link href="/dashboard/admin/operators" className="flex items-center gap-3 p-3 text-gray-400 hover:text-white transition-all">
                        <Map className="w-5 h-5" /> Operators List
                    </Link>
                    <Link href="/dashboard/admin/reports" className="flex items-center gap-3 p-3 text-gray-400 hover:text-white transition-all">
                        <BarChart3 className="w-5 h-5" /> Analytics
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 space-y-8 overflow-y-auto">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Admin Console</h1>
                        <p className="text-gray-400">Monitor and manage the TourHub ecosystem</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { label: "Total Users", val: data.stats.totalUsers?.toLocaleString() || "0", icon: Users, color: "text-blue-500" },
                        { label: "Verified Operators", val: data.stats.verifiedOperators?.toLocaleString() || "0", icon: ShieldCheck, color: "text-green-500" },
                        { label: "Total Volume", val: `${data.stats.totalVolume?.toLocaleString() || "0"} PKR`, icon: BarChart3, color: "text-cyan-500" },
                        { label: "Active Trips", val: data.stats.activeTrips?.toLocaleString() || "0", icon: Map, color: "text-orange-500" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-card border border-border p-6 rounded-3xl group hover:border-cyan-500/50 transition-all">
                            <stat.icon className={cn("w-8 h-8 mb-4", stat.color)} />
                            <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className="text-2xl font-bold">{stat.val}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Pending Verifications */}
                    <div className="lg:col-span-2 bg-card border border-border rounded-3xl overflow-hidden">
                        <div className="p-6 border-b border-border flex justify-between items-center">
                            <h3 className="font-bold">Pending Operator Verifications</h3>
                            <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-none">{pendingOperators.length} Active</Badge>
                        </div>
                        <div className="p-6 space-y-6">
                            {pendingOperators.length === 0 ? (
                                <p className="text-center py-8 text-gray-500">No pending verifications.</p>
                            ) : (
                                pendingOperators.map((op: any) => (
                                    <div key={op.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-2xl">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-white font-bold">
                                                {op.companyName.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm text-white">{op.companyName}</p>
                                                <p className="text-xs text-gray-500 italic">{op.user.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <VerifyButton operatorId={op.id} />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* System Health */}
                    <div className="lg:col-span-1 bg-card border border-border rounded-3xl p-6">
                        <h3 className="font-bold mb-6">System Health</h3>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-medium">
                                    <span>API Performance</span>
                                    <span className="text-green-500">99.9%</span>
                                </div>
                                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-[99%]" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-medium">
                                    <span>Database Load</span>
                                    <span className="text-cyan-500">Optimal</span>
                                </div>
                                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-cyan-500 w-[12%]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}


