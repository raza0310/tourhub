import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    try {
        await prisma.user.update({
            where: { id: session.user.id },
            data: { role: "ADMIN" }
        });

        return new NextResponse(`
            <html>
                <body style="font-family: sans-serif; background: #000; color: #fff; display: flex; align-items: center; justify-center; height: 100vh; flex-direction: column; text-align: center;">
                    <h1 style="color: #22d3ee;">Success! 🚀</h1>
                    <p>Aap ab <b>ADMIN</b> ban chuke hain.</p>
                    <p>Dabaara login karein ya dashboard refresh karein Admin view dekhne ke liye.</p>
                    <a href="/dashboard" style="background: #22d3ee; color: #000; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 20px;">DASHBOARD PAR JAYEIN</a>
                </body>
            </html>
        `, {
            headers: { "Content-Type": "text/html" }
        });
    } catch (error) {
        return NextResponse.json({ message: "Error promoting user" }, { status: 500 });
    }
}
