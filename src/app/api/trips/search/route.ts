import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const dest = searchParams.get("destination");
    const budget = searchParams.get("budget");
    const duration = searchParams.get("duration");

    // Rate limiting placeholder for defense
    // In production, use Upstash or Redis
    const requestCount = 1; // Logic here
    if (requestCount > 3) {
        return NextResponse.json({ message: "Daily limit reached for AI advice" }, { status: 429 });
    }

    try {
        const trips = await prisma.trip.findMany({
            where: {
                AND: [
                    dest ? { title: { contains: dest, mode: "insensitive" } } : {},
                    budget ? { price: { lte: parseInt(budget) } } : {},
                    duration ? { duration: { contains: duration } } : {},
                ]
            },
            take: 5
        });

        return NextResponse.json({ trips });
    } catch (error) {
        return NextResponse.json({ message: "Search error" }, { status: 500 });
    }
}
