"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, MapPin, Calendar, Wallet, Loader2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AIPlannerPage() {
    const [loading, setLoading] = useState(false);
    const [plan, setPlan] = useState<any>(null);
    const [budget, setBudget] = useState("");
    const [region, setRegion] = useState("");
    const [duration, setDuration] = useState("");
    const [interest, setInterest] = useState("");

    const generatePlan = async () => {
        setLoading(true);
        // Simulate AI logic by calling our search API or custom logic
        try {
            const params = new URLSearchParams({
                destination: region,
                budget: budget,
                duration: duration
            });

            const res = await fetch(`/api/trips/search?${params.toString()}`);
            const data = await res.json();

            // Artificial delay for "AI" feel
            await new Promise(r => setTimeout(r, 1500));

            if (data.trips && data.trips.length > 0) {
                const bestTrip = data.trips[0];
                setPlan({
                    recommendation: bestTrip.title,
                    reason: `Based on your budget of ${budget} PKR and interest in ${interest || 'adventure'}, ${bestTrip.title} is our top recommendation for the ${region || 'Northern'} region.`,
                    itinerary: ["Expert Guided Tour", "Luxury Accommodation", "Scenic Travel"],
                    price: `${bestTrip.price.toLocaleString()} PKR`,
                    tripId: bestTrip.id
                });
            } else {
                // Generative Mock for non-seeded cities
                setPlan({
                    recommendation: `Custom ${region || 'Pakistan'} Expedition`,
                    reason: `Hamari AI ne aap ke liye aik makhsoos plan tayaar kiya hai ${region} ke liye, kyunke abhi yahan ki fixed trips available nahi hain. Ye aik unique adventure hoga!`,
                    itinerary: [
                        `${region} City Exploration`,
                        "Local Cuisine Tasting",
                        "Off-beat Scenic Spots",
                        "Personal Guide Service"
                    ],
                    price: budget ? `${Math.floor(parseInt(budget) * 0.9).toLocaleString()} PKR` : "Custom Quote",
                    isMock: true
                });
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
                    <Sparkles className="w-4 h-4" /> AI Powered
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Your Personal <span className="text-cyan-400">AI Concierge</span></h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">Tell us your budget and preferences, and our AI will craft the perfect itinerary for you in seconds.</p>
            </div>

            <div className="bg-card border border-border rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                {/* Glow Effects */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/10 blur-[100px] rounded-full" />
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-500/10 blur-[100px] rounded-full" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                            <Wallet className="w-4 h-4 text-cyan-400" /> Maximum Budget (PKR)
                        </label>
                        <Input
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            placeholder="e.g. 50000"
                            className="bg-muted/50 h-14 rounded-2xl border-none text-lg font-bold text-white"
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-cyan-400" /> Preferred Region
                        </label>
                        <Input
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                            placeholder="e.g. Hunza"
                            className="bg-muted/50 h-14 rounded-2xl border-none text-lg font-bold text-white"
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-cyan-400" /> Duration (Days)
                        </label>
                        <Input
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            placeholder="e.g. 5"
                            className="bg-muted/50 h-14 rounded-2xl border-none text-lg font-bold text-white"
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-cyan-400" /> Interest
                        </label>
                        <Input
                            value={interest}
                            onChange={(e) => setInterest(e.target.value)}
                            placeholder="e.g. Photography, Trekking"
                            className="bg-muted/50 h-14 rounded-2xl border-none text-lg font-bold text-white"
                        />
                    </div>
                </div>

                <Button
                    onClick={generatePlan}
                    disabled={loading}
                    className="w-full h-16 bg-cyan-500 hover:bg-cyan-600 rounded-2xl text-xl font-bold shadow-[0_15px_30px_rgba(34,211,238,0.3)] transition-all flex gap-3"
                >
                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Sparkles className="w-6 h-6" /> Design My Dream Trip</>}
                </Button>

                {/* Plan Result */}
                {plan && (
                    <div className="mt-16 p-8 bg-cyan-500/5 border border-cyan-500/20 rounded-[28px] animate-in zoom-in-95 duration-700">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <Badge className="bg-cyan-500 text-white mb-2">Best Match</Badge>
                                <h3 className="text-3xl font-bold">{plan.recommendation}</h3>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-500">Estimated Total</p>
                                <p className="text-2xl font-bold text-cyan-400">{plan.price}</p>
                            </div>
                        </div>
                        <p className="text-gray-400 mb-8 italic">"{plan.reason}"</p>

                        <div className="space-y-4">
                            <p className="text-sm font-bold">Planned Highlights:</p>
                            <div className="flex flex-wrap gap-4">
                                {plan.itinerary.map((item: string, i: number) => (
                                    <div key={i} className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl text-sm">
                                        <CheckCircle2 className="w-4 h-4 text-cyan-400" /> {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Button className="w-full mt-10 h-12 bg-white text-black hover:bg-gray-200 group rounded-xl font-bold">
                            Book This Plan <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
