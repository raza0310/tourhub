"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Fuel, Save, AlertTriangle, TrendingUp, Info } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function OperatorSettings() {
    const { data: session } = useSession();
    const [multiplier, setMultiplier] = useState("1.0");
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchSettings = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/operator/settings");
                if (res.ok) {
                    const data = await res.json();
                    setMultiplier(data.fuelMultiplier.toString());
                }
            } catch (error) {
                console.error("Failed to fetch settings");
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch("/api/operator/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fuelMultiplier: parseFloat(multiplier) }),
            });
            if (res.ok) {
                alert("Settings updated! All your trips are now dynamically priced.");
                router.refresh();
            }
        } catch (error) {
            alert("Failed to save settings");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-20 text-center animate-pulse text-cyan-400">Loading settings...</div>;

    return (
        <div className="pt-24 pb-20 px-4 max-w-4xl mx-auto space-y-8">
            <div className="flex justify-between items-center bg-card border border-border p-8 rounded-3xl overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <TrendingUp className="w-40 h-40 text-cyan-500" />
                </div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold text-white mb-2">Dynamic Pricing Control</h1>
                    <p className="text-gray-400">Adjust your prices based on market fuel rates and inflation.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-card border border-border p-8 rounded-3xl space-y-6">
                    <div className="flex items-center gap-3 text-cyan-400 mb-2">
                        <Fuel className="w-6 h-6" />
                        <h3 className="font-bold text-xl text-white">Fuel Multiplier</h3>
                    </div>

                    <p className="text-sm text-gray-400 leading-relaxed">
                        Setting this value above 1.0 will increase your trip prices platform-wide.
                        Example: <span className="text-white font-bold">1.10</span> means a <span className="text-cyan-400 font-bold">10% increase</span> on all listings.
                    </p>

                    <div className="space-y-4">
                        <div className="relative">
                            <Input
                                type="number"
                                step="0.01"
                                value={multiplier}
                                onChange={(e) => setMultiplier(e.target.value)}
                                className="h-14 bg-muted/30 border-border rounded-xl px-12 text-xl font-bold text-white focus:border-cyan-500 transition-all"
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-black">X</div>
                        </div>

                        <Button
                            onClick={handleSave}
                            disabled={saving}
                            className="w-full h-14 bg-cyan-500 hover:bg-cyan-600 text-lg font-bold rounded-xl shadow-lg shadow-cyan-500/20"
                        >
                            {saving ? "Updating Prices..." : "Save Settings"}
                        </Button>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-yellow-500/10 border border-yellow-500/20 p-6 rounded-2xl flex gap-4">
                        <AlertTriangle className="w-10 h-10 text-yellow-500 shrink-0" />
                        <div className="text-sm text-yellow-500/90 italic">
                            <span className="font-bold underline block mb-1">Warning:</span>
                            Market rates in Pakistan are volatile. Changes applied here will reflect on all your active trips instantly.
                        </div>
                    </div>

                    <div className="bg-cyan-500/10 border border-cyan-500/20 p-6 rounded-2xl flex gap-4">
                        <Info className="w-10 h-10 text-cyan-400 shrink-0" />
                        <div className="text-sm text-cyan-400/90 leading-relaxed">
                            <span className="font-bold underline block mb-1">Startup Tip:</span>
                            Maintain a multiplier of <span className="text-white font-bold">1.05</span> during peak season (Summer) in Hunza/Skardu to cover additional transport overheads.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
