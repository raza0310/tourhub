"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, CreditCard, Ticket, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function BookingPage() {
    const [step, setStep] = useState(1);

    return (
        <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-12 relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -z-10" />
                {[1, 2, 3].map((s) => (
                    <div
                        key={s}
                        className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
                            step >= s ? "bg-cyan-500 text-white shadow-[0_0_15px_rgba(34,211,238,0.4)]" : "bg-card text-gray-500 border border-border"
                        )}
                    >
                        {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
                    </div>
                ))}
            </div>

            <div className="bg-card border border-border rounded-3xl p-8 shadow-xl">
                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <h2 className="text-2xl font-bold mb-6">Traveler Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Full Name</label>
                                <Input placeholder="John Doe" className="bg-muted/50 rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Email Address</label>
                                <Input placeholder="john@example.com" type="email" className="bg-muted/50 rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Phone Number</label>
                                <Input placeholder="+92 3XX XXXXXXX" className="bg-muted/50 rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">CNIC / Passport (Optional)</label>
                                <Input placeholder="XXXXX-XXXXXXX-X" className="bg-muted/50 rounded-xl" />
                            </div>
                        </div>
                        <Button onClick={() => setStep(2)} className="w-full bg-cyan-500 hover:bg-cyan-600 rounded-xl h-12 font-bold">
                            Continue to Payment
                        </Button>
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
                        <div className="space-y-4 mb-8">
                            <div className="p-4 border-2 border-cyan-500 bg-cyan-500/5 rounded-2xl flex items-center gap-4 cursor-pointer">
                                <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center">
                                    <CreditCard className="text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold">Online Payment</p>
                                    <p className="text-xs text-gray-500">Credit / Debit Card, JazzCash, EasyPaisa</p>
                                </div>
                                <CheckCircle2 className="text-cyan-500" />
                            </div>
                            <div className="p-4 border border-border bg-muted/20 rounded-2xl flex items-center gap-4 opacity-50 cursor-not-allowed">
                                <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center">
                                    <ShieldCheck className="text-gray-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold">Pay at Office</p>
                                    <p className="text-xs text-gray-500">Visit our branch to pay cash</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Button variant="ghost" onClick={() => setStep(1)} className="flex-1">Back</Button>
                            <Button onClick={() => setStep(3)} className="flex-[2] bg-cyan-500 hover:bg-cyan-600 rounded-xl h-12 font-bold">
                                Confirm & Pay
                            </Button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="text-center animate-in zoom-in-95 duration-500">
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                            <CheckCircle2 className="text-white w-12 h-12" />
                        </div>
                        <h2 className="text-3xl font-bold mb-2">Booking Confirmed!</h2>
                        <p className="text-gray-400 mb-8">Your adventure to Hunza Valley is officially booked.</p>

                        <div className="bg-muted/30 border border-dashed border-border p-6 rounded-2xl mb-8 flex items-center justify-between max-w-sm mx-auto">
                            <div className="text-left">
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Ticket ID</p>
                                <p className="font-mono font-bold text-lg text-cyan-400">THP-2026-001</p>
                            </div>
                            <Ticket className="w-10 h-10 text-cyan-500 opacity-20" />
                        </div>

                        <div className="flex flex-col gap-3">
                            <Button className="bg-cyan-500 hover:bg-cyan-600 rounded-xl h-12 font-bold">
                                Download PDF Ticket
                            </Button>
                            <Button variant="ghost" onClick={() => window.location.href = '/'}>
                                Return Home
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

import { cn } from "@/lib/utils";
