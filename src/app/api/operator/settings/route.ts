import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const operator = await prisma.operator.findUnique({
        where: { ownerId: session.user.id }
    });

    return NextResponse.json({ fuelMultiplier: (operator as any)?.fuelMultiplier || 1.0 });
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const { fuelMultiplier } = await req.json();

        await prisma.operator.update({
            where: { ownerId: session.user.id },
            data: { fuelMultiplier } as any
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ message: "Update failed" }, { status: 500 });
    }
}
