"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TOTAL_SEATS = 20;
const ROWS = 5;
const COLS = 4; // 2 + aisle + 2

interface SeatPickerProps {
    onSelectionChange: (seats: string[]) => void;
    price: number;
}

export default function SeatPicker({ onSelectionChange, price }: SeatPickerProps) {
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [bookedSeats] = useState<string[]>(["B1", "B2", "D4"]); // Mock for now

    const toggleSeat = (seatId: string) => {
        if (bookedSeats.includes(seatId)) return;

        const newSelection = selectedSeats.includes(seatId)
            ? selectedSeats.filter(s => s !== seatId)
            : [...selectedSeats, seatId];

        setSelectedSeats(newSelection);
        onSelectionChange(newSelection);
    };

    const getSeatId = (row: number, col: number) => {
        const rowChar = String.fromCharCode(65 + row);
        return `${rowChar}${col + 1}`;
    };

    return (
        <div className="p-4 bg-muted/30 rounded-2xl border border-dashed border-border">
            <div className="flex flex-col items-center gap-4">
                {/* Steering Wheel Placeholder (Front of Bus) */}
                <div className="w-full flex justify-end px-6 mb-4">
                    <div className="w-8 h-8 rounded-full border-4 border-gray-600 border-t-cyan-500 animate-spin-slow" />
                </div>

                {/* Seat Grid */}
                <div className="grid grid-cols-5 gap-3">
                    {Array.from({ length: ROWS }).map((_, r) => (
                        <div key={r} className="contents">
                            {/* Left 2 seats */}
                            <Seat
                                id={getSeatId(r, 0)}
                                status={bookedSeats.includes(getSeatId(r, 0)) ? "booked" : selectedSeats.includes(getSeatId(r, 0)) ? "selected" : "available"}
                                onClick={() => toggleSeat(getSeatId(r, 0))}
                            />
                            <Seat
                                id={getSeatId(r, 1)}
                                status={bookedSeats.includes(getSeatId(r, 1)) ? "booked" : selectedSeats.includes(getSeatId(r, 1)) ? "selected" : "available"}
                                onClick={() => toggleSeat(getSeatId(r, 1))}
                            />

                            {/* Aisle */}
                            <div className="w-4" />

                            {/* Right 2 seats */}
                            <Seat
                                id={getSeatId(r, 2)}
                                status={bookedSeats.includes(getSeatId(r, 2)) ? "booked" : selectedSeats.includes(getSeatId(r, 2)) ? "selected" : "available"}
                                onClick={() => toggleSeat(getSeatId(r, 2))}
                            />
                            <Seat
                                id={getSeatId(r, 3)}
                                status={bookedSeats.includes(getSeatId(r, 3)) ? "booked" : selectedSeats.includes(getSeatId(r, 3)) ? "selected" : "available"}
                                onClick={() => toggleSeat(getSeatId(r, 3))}
                            />
                        </div>
                    ))}
                </div>

                {/* Legend */}
                <div className="flex gap-4 mt-6 text-[10px] uppercase font-bold text-gray-500">
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-white/20" /> Available
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.5)]" /> Selected
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-gray-800" /> Booked
                    </div>
                </div>

                {selectedSeats.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-border w-full flex justify-between items-center text-sm">
                        <span className="text-gray-400">Seats: {selectedSeats.join(", ")}</span>
                        <span className="font-bold text-cyan-400">{selectedSeats.length * 45000} PKR</span>
                    </div>
                )}
            </div>
        </div>
    );
}

function Seat({ id, status, onClick }: { id: string, status: "available" | "selected" | "booked", onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            disabled={status === "booked"}
            className={cn(
                "w-8 h-8 rounded-lg text-[9px] font-bold transition-all transform hover:scale-110 active:scale-95",
                status === "available" && "bg-white/10 hover:bg-white/20 text-gray-400",
                status === "selected" && "bg-cyan-500 text-white shadow-[0_0_15px_rgba(34,211,238,0.4)]",
                status === "booked" && "bg-gray-800 text-gray-600 cursor-not-allowed"
            )}
        >
            {id}
        </button>
    );
}
