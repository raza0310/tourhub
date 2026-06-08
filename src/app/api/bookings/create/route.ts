import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    try {
        const {
            tripId,
            seats,
            cnic,
            emergencyContact,
            paymentType,
            paymentMethod,
            depositAmount
        } = await req.json();

        if (!tripId || !seats || !Array.isArray(seats) || !cnic || !emergencyContact) {
            return NextResponse.json({ message: "Invalid booking data or missing fields" }, { status: 400 });
        }

        // Use transaction to ensure atomicity
        const result = await prisma.$transaction(async (tx) => {
            // 1. Get trip with current bookings for capacity check
            const trip = await tx.trip.findUnique({
                where: { id: tripId },
                include: { bookings: { select: { seats: true } } }
            });

            if (!trip) throw new Error("Trip not found");

            // 2. Check if any requested seats are already booked
            const allBookedSeats = trip.bookings.flatMap(b => b.seats);
            const isSeatTaken = seats.some(s => allBookedSeats.includes(s));
            if (isSeatTaken) throw new Error("One or more selected seats are already booked");

            // 3. Create the booking with status based on payment type
            const booking = await tx.booking.create({
                data: {
                    tripId,
                    userId: session.user.id,
                    seats: seats,
                    cnic,
                    emergencyContact,
                    depositAmount,
                    status: "CONFIRMED"
                } as any
            });

            // 4. Create a mock payment record
            await tx.payment.create({
                data: {
                    bookingId: booking.id,
                    amount: depositAmount || (trip.price * seats.length),
                    status: "COMPLETED"
                }
            });

            return booking;
        });

        return NextResponse.json({
            message: "Booking successful",
            bookingId: result.id
        }, { status: 201 });

    } catch (error: any) {
        console.error("Booking Error:", error);
        return NextResponse.json({ message: error.message || "Internal server error" }, { status: 400 });
    }
}
