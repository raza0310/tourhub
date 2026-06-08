"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { Compass, Menu, User, LogOut, LayoutDashboard } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
    const { data: session, status } = useSession();
    const loading = status === "loading";

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-lg border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center">
                        <Compass className="text-white w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold text-white">
                        TOUR<span className="text-cyan-400">HUB</span>
                    </span>
                </Link>

                <div className="flex items-center gap-4">
                    {!session ? (
                        <>
                            <Link href="/login">
                                <Button variant="ghost">Login</Button>
                            </Link>

                            <Link href="/signup">
                                <Button className="bg-cyan-500 hover:bg-cyan-600 rounded-xl">Get Started</Button>
                            </Link>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard" className="hidden md:block">
                                <Button variant="ghost">Dashboard</Button>
                            </Link>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-10 w-10 rounded-full bg-white/5 p-0">
                                        <User className="h-5 w-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56 bg-black/90 backdrop-blur-xl border-white/10" align="end">
                                    <DropdownMenuItem asChild className="cursor-pointer text-white hover:bg-white/5">
                                        <Link href="/dashboard" className="flex items-center gap-2">
                                            <LayoutDashboard className="w-4 h-4" /> Dashboard
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => signOut()}
                                        className="cursor-pointer text-red-400 hover:bg-red-500/10 flex items-center gap-2"
                                    >
                                        <LogOut className="w-4 h-4" /> Sign Out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )}

                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu />
                    </Button>
                </div>
            </div>
        </nav>
    );
}