import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { name, email, password, role } = await req.json();

        if (!email || !password || !name) {
            return NextResponse.json({ message: "Missing fields" }, { status: 400 });
        }

        const exists = await prisma.user.findUnique({
            where: { email },
        });

        if (exists) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                // If they chose Operator, we still keep role as USER and create a PENDING operator record
                // Once Admin approves, role will be updated to OPERATOR
            },
        });

        if (role === "OPERATOR") {
            await prisma.operator.create({
                data: {
                    ownerId: user.id,
                    companyName: `${name}'s Travel Co`, // Placeholder
                    status: "PENDING",
                },
            });
        }

        return NextResponse.json({ message: "User created" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
