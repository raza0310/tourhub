import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "OPERATOR") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { title, destination, duration, price, capacity, description } = await req.json();

        if (!title || !destination || !price || !capacity) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        // Get operator profile
        const operator = await prisma.operator.findUnique({
            where: { ownerId: session.user.id }
        });

        if (!operator) {
            return NextResponse.json({ message: "Operator profile not found" }, { status: 404 });
        }

        const trip = await prisma.trip.create({
            data: {
                title,
                destination,
                duration: duration || "TBD",
                price: Number(price),
                capacity: Number(capacity),
                description,
                operatorId: operator.id,
            } as any,
        });

        return NextResponse.json({ trip }, { status: 201 });
    } catch (error: any) {
        console.error("Create trip error:", error);
        return NextResponse.json({ message: error.message || "Server error" }, { status: 500 });
    }
}
