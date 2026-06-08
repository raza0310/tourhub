"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Search, MapPin, SlidersHorizontal, Star, CheckCircle2, CreditCard, ShieldCheck, Wallet } from "lucide-react";
import SeatPicker from "./seat-picker";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

interface BookingSectionProps {
    tripId: string;
    price: number;
    capacity: number;
    bookedSeatsCount: number;
}

export default function BookingSection({ tripId, price, capacity, bookedSeatsCount }: BookingSectionProps) {
    const [step, setStep] = useState(1);
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [cnic, setCnic] = useState("");
    const [emergencyContact, setEmergencyContact] = useState("");
    const [paymentType, setPaymentType] = useState<"FULL" | "DEPOSIT">("FULL");
    const [paymentMethod, setPaymentMethod] = useState<"EasyPaisa" | "JazzCash" | "NayaPay">("EasyPaisa");
    const router = useRouter();

    const handleBooking = async () => {
        if (!cnic || !emergencyContact) {
            alert("Please fill in your CNIC and Emergency Contact!");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/bookings/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tripId,
                    seats: selectedSeats,
                    cnic,
                    emergencyContact,
                    paymentType,
                    paymentMethod,
                    depositAmount: paymentType === "DEPOSIT" ? (price * selectedSeats.length * 0.2) : null
                }),
            });

            if (res.ok) {
                alert("Booking Successful! 🚀\nYour ticket will be generated shortly.");
                router.push("/dashboard");
                router.refresh();
            } else {
                const data = await res.json();
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            alert("Booking fail ho gayi. Dobara koshish karein.");
        } finally {
            setLoading(false);
        }
    };

    const totalPrice = price * selectedSeats.length;
    const depositPrice = totalPrice * 0.2;

    return (
        <div className="bg-card border border-border rounded-3xl p-8 sticky top-28 shadow-2xl transition-all hover:border-cyan-500/30">
            {/* Progress Header */}
            <div className="flex items-center gap-4 mb-8">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step === 1 ? "bg-cyan-500 text-white" : "bg-cyan-500/20 text-cyan-400"}`}>1</div>
                <div className="h-[2px] flex-1 bg-border relative">
                    <div className={`absolute inset-0 bg-cyan-500 transition-all duration-500 ${step === 2 ? "w-full" : "w-0"}`} />
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step === 2 ? "bg-cyan-500 text-white" : "bg-border text-gray-500"}`}>2</div>
            </div>

            {step === 1 ? (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Price per seat</p>
                            <p className="text-3xl font-bold text-cyan-400">{price.toLocaleString()} PKR</p>
                        </div>
                        <Badge className="bg-green-500/10 text-green-500 border-none">Available</Badge>
                    </div>

                    <div className="space-y-6 mb-8 text-sm">
                        <div className="flex justify-between text-gray-300">
                            <span>Departure Date</span>
                            <span className="font-bold flex items-center gap-2 text-white"><Calendar className="w-4 h-4 text-cyan-400" /> 15th July, 2026</span>
                        </div>
                        <div className="flex justify-between text-gray-300">
                            <span>Available Seats</span>
                            <span className="font-bold text-white">{capacity - bookedSeatsCount} / {capacity}</span>
                        </div>
                    </div>

                    <div className="mb-8">
                        <p className="text-sm font-bold mb-4 text-white">Select Your Seats</p>
                        <SeatPicker
                            onSelectionChange={setSelectedSeats}
                            price={price}
                        />
                    </div>

                    <Button
                        onClick={() => setStep(2)}
                        disabled={selectedSeats.length === 0}
                        className="w-full h-14 bg-cyan-500 hover:bg-cyan-600 text-lg font-bold rounded-2xl shadow-[0_10px_20px_rgba(34,211,238,0.3)] transition-all disabled:opacity-50"
                    >
                        Review & Pay
                    </Button>
                </div>
            ) : (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <ShieldCheck className="text-cyan-400 w-5 h-5" /> Verification & Security
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="text-xs text-gray-500 uppercase tracking-widest mb-1 block">CNIC Number</label>
                            <Input
                                placeholder="42101-XXXXXXX-X"
                                value={cnic}
                                onChange={(e) => setCnic(e.target.value)}
                                className="bg-muted/30 border-border rounded-xl text-white h-12"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-500 uppercase tracking-widest mb-1 block">Emergency Contact</label>
                            <Input
                                placeholder="03XXXXXXXXX"
                                value={emergencyContact}
                                onChange={(e) => setEmergencyContact(e.target.value)}
                                className="bg-muted/30 border-border rounded-xl text-white h-12"
                            />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Wallet className="text-cyan-400 w-5 h-5" /> Local Wallet Payment
                        </h3>

                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <button
                                onClick={() => setPaymentType("FULL")}
                                className={`p-4 rounded-xl border text-left transition-all ${paymentType === "FULL" ? "border-cyan-500 bg-cyan-500/10" : "border-border bg-transparent"}`}
                            >
                                <p className="text-[10px] uppercase font-bold text-gray-500">Full Payment</p>
                                <p className="text-sm font-black text-white">{totalPrice.toLocaleString()} PKR</p>
                            </button>
                            <button
                                onClick={() => setPaymentType("DEPOSIT")}
                                className={`p-4 rounded-xl border text-left transition-all ${paymentType === "DEPOSIT" ? "border-cyan-500 bg-cyan-500/10" : "border-border bg-transparent"}`}
                            >
                                <p className="text-[10px] uppercase font-bold text-cyan-400 animate-pulse">Pay 20% Deposit</p>
                                <p className="text-sm font-black text-white">{depositPrice.toLocaleString()} PKR</p>
                            </button>
                        </div>

                        <div className="flex gap-4 justify-center mb-8">
                            {["EasyPaisa", "JazzCash", "NayaPay"].map((method) => (
                                <button
                                    key={method}
                                    onClick={() => setPaymentMethod(method as any)}
                                    className={`relative p-2 rounded-lg border transition-all ${paymentMethod === method ? "border-cyan-500 scale-110" : "border-border opacity-50 grayscale hover:grayscale-0 hover:opacity-100"}`}
                                >
                                    <div className="w-12 h-6 flex items-center justify-center font-black text-[8px] text-white">
                                        {method}
                                    </div>
                                    {paymentMethod === method && <CheckCircle2 className="absolute -top-1 -right-1 w-3 h-3 text-cyan-500 fill-black" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            onClick={() => setStep(1)}
                            className="flex-1 h-12 rounded-xl border-border hover:bg-white/5"
                        >
                            Back
                        </Button>
                        <Button
                            onClick={handleBooking}
                            disabled={loading}
                            className="flex-[2] h-12 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20"
                        >
                            {loading ? "Verifying..." : `Confirm ${paymentType === "DEPOSIT" ? "Deposit" : "Payment"}`}
                        </Button>
                    </div>
                </div>
            )}

            <p className="text-center text-[10px] text-gray-500 mt-6 italic">
                {step === 1 ? "*Taxes and fees included" : "Secure transaction powered by Local Wallets"}
            </p>
        </div>
    );
}
