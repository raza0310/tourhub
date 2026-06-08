import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { operatorId, action } = await req.json();

        if (action === "APPROVE") {
            const operator = await prisma.operator.update({
                where: { id: operatorId },
                data: { status: "VERIFIED" },
                include: { user: true },
            });

            // Update User role to OPERATOR
            await prisma.user.update({
                where: { id: operator.ownerId },
                data: { role: "OPERATOR" },
            });

            return NextResponse.json({ message: "Operator approved and role updated" });
        }

        if (action === "REJECT") {
            await prisma.operator.delete({
                where: { id: operatorId },
            });
            return NextResponse.json({ message: "Operator request rejected" });
        }

        return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
