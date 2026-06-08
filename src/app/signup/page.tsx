"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Compass, Mail, Lock, User, Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("USER");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                body: JSON.stringify({ name, email, password, role }),
                headers: { "Content-Type": "application/json" },
            });

            if (res.ok) {
                router.push("/login?registered=true");
            } else {
                const data = await res.json();
                setError(data.message || "Signup failed");
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4 pt-32 pb-20 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 -left-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full" />
            </div>

            <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in duration-700">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6">
                        <div className="w-12 h-12 bg-cyan-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                            <Compass className="text-white w-7 h-7" />
                        </div>
                        <span className="text-3xl font-bold text-white tracking-tight">
                            TOUR<span className="text-cyan-400">HUB</span>
                        </span>
                    </Link>
                    <h1 className="text-2xl font-bold text-white">Create Account</h1>
                    <p className="text-gray-400">Join the adventure today</p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[32px] shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-300">Join as</label>
                            <div className="grid grid-cols-3 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setRole("USER")}
                                    className={cn(
                                        "p-2.5 rounded-xl border text-[11px] font-bold transition-all",
                                        role === "USER"
                                            ? "bg-cyan-500/20 border-cyan-500 text-cyan-400"
                                            : "bg-white/5 border-white/10 text-gray-500 hover:border-white/20"
                                    )}
                                >
                                    Traveler
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole("OPERATOR")}
                                    className={cn(
                                        "p-2.5 rounded-xl border text-[11px] font-bold transition-all",
                                        role === "OPERATOR"
                                            ? "bg-cyan-500/20 border-cyan-500 text-cyan-400"
                                            : "bg-white/5 border-white/10 text-gray-500 hover:border-white/20"
                                    )}
                                >
                                    Operator
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole("ADMIN")}
                                    className={cn(
                                        "p-2.5 rounded-xl border text-[11px] font-bold transition-all",
                                        role === "ADMIN"
                                            ? "bg-red-500/20 border-red-500 text-red-400"
                                            : "bg-white/5 border-white/10 text-gray-500 hover:border-white/20"
                                    )}
                                >
                                    Admin
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                <User className="w-4 h-4 text-cyan-400" /> Full Name
                            </label>
                            <Input
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="bg-white/5 border-white/10 h-12 rounded-xl focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                <Mail className="w-4 h-4 text-cyan-400" /> Email Address
                            </label>
                            <Input
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-white/5 border-white/10 h-12 rounded-xl focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                <Lock className="w-4 h-4 text-cyan-400" /> Password
                            </label>
                            <Input
                                type="password"
                                placeholder="min 8 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={8}
                                className="bg-white/5 border-white/10 h-12 rounded-xl focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all"
                            />
                        </div>

                        {error && (
                            <p className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20">
                                {error}
                            </p>
                        )}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-bold shadow-[0_10px_20_rgba(34,211,238,0.2)] transition-all flex gap-2"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Join TourHub <ArrowRight className="w-4 h-4" /></>}
                        </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/5 text-center">
                        <p className="text-gray-400 text-sm">
                            Already have an account?{" "}
                            <Link href="/login" className="text-cyan-400 hover:underline font-bold">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
