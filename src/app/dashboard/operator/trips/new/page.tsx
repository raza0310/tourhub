"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, MapPin, Clock, Users, DollarSign, FileText, Send } from "lucide-react";
import Link from "next/link";

export default function CreateTripPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        title: "",
        destination: "",
        duration: "",
        price: "",
        capacity: "",
        description: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title || !form.destination || !form.price || !form.capacity) {
            alert("Please fill all required fields!");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/operator/trips", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    price: parseInt(form.price),
                    capacity: parseInt(form.capacity),
                }),
            });

            if (res.ok) {
                alert("Trip created successfully! 🚀");
                router.push("/dashboard/operator");
                router.refresh();
            } else {
                const data = await res.json();
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            alert("Failed to create trip");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-28 pb-20 px-4 max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/dashboard/operator">
                    <Button variant="ghost" size="icon" className="rounded-full border border-border">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-white">Create New Trip</h1>
                    <p className="text-gray-400 text-sm">Fill in the details to list your trip on TourHub</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-3xl p-8 space-y-6">
                <div className="space-y-2">
                    <label className="text-xs text-gray-500 uppercase tracking-widest flex items-center gap-2">
                        <FileText className="w-3 h-3" /> Trip Title *
                    </label>
                    <Input
                        name="title"
                        placeholder="e.g. Hunza Valley 5-Day Adventure"
                        value={form.title}
                        onChange={handleChange}
                        className="bg-muted/30 border-border h-12 rounded-xl text-white"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs text-gray-500 uppercase tracking-widest flex items-center gap-2">
                            <MapPin className="w-3 h-3" /> Destination *
                        </label>
                        <Input
                            name="destination"
                            placeholder="e.g. Hunza, Gilgit"
                            value={form.destination}
                            onChange={handleChange}
                            className="bg-muted/30 border-border h-12 rounded-xl text-white"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-gray-500 uppercase tracking-widest flex items-center gap-2">
                            <Clock className="w-3 h-3" /> Duration *
                        </label>
                        <Input
                            name="duration"
                            placeholder="e.g. 5 Days / 4 Nights"
                            value={form.duration}
                            onChange={handleChange}
                            className="bg-muted/30 border-border h-12 rounded-xl text-white"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs text-gray-500 uppercase tracking-widest flex items-center gap-2">
                            <DollarSign className="w-3 h-3" /> Price per Seat (PKR) *
                        </label>
                        <Input
                            name="price"
                            type="number"
                            placeholder="e.g. 45000"
                            value={form.price}
                            onChange={handleChange}
                            className="bg-muted/30 border-border h-12 rounded-xl text-white"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-gray-500 uppercase tracking-widest flex items-center gap-2">
                            <Users className="w-3 h-3" /> Seat Capacity *
                        </label>
                        <Input
                            name="capacity"
                            type="number"
                            placeholder="e.g. 30"
                            value={form.capacity}
                            onChange={handleChange}
                            className="bg-muted/30 border-border h-12 rounded-xl text-white"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs text-gray-500 uppercase tracking-widest">Description</label>
                    <Textarea
                        name="description"
                        placeholder="Describe the trip, what's included, highlights..."
                        value={form.description}
                        onChange={handleChange}
                        rows={5}
                        className="bg-muted/30 border-border rounded-xl text-white resize-none"
                    />
                </div>

                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-cyan-500/20 flex gap-2"
                >
                    <Send className="w-5 h-5" />
                    {loading ? "Publishing Trip..." : "Publish Trip"}
                </Button>
            </form>
        </div>
    );
}
