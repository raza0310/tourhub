import prisma from "@/lib/prisma";

export async function getDashboardStats(userId: string) {
    if (!userId) throw new Error("Unauthorized");

    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            operator: true,
        },
    });

    if (!user) return null;

    if (user.role === "OPERATOR" && user.operator) {
        const tripsCount = await prisma.trip.count({
            where: { operatorId: user.operator.id },
        });

        const bookingsCount = await prisma.booking.count({
            where: {
                trip: { operatorId: user.operator.id },
            },
        });

        const revenue = await prisma.payment.aggregate({
            _sum: { amount: true },
            where: {
                booking: {
                    trip: { operatorId: user.operator.id },
                },
            },
        });

        return {
            role: "OPERATOR",
            stats: {
                tripsCount,
                bookingsCount,
                revenue: revenue._sum.amount || 0,
            },
        };
    }

    if (user.role === "ADMIN") {
        const totalUsers = await prisma.user.count();
        const verifiedOperators = await prisma.operator.count({
            where: { status: "VERIFIED" },
        });
        const activeTrips = await prisma.trip.count();
        const totalVolume = await prisma.payment.aggregate({
            _sum: { amount: true },
        });

        return {
            role: "ADMIN",
            stats: {
                totalUsers,
                verifiedOperators,
                activeTrips,
                totalVolume: totalVolume._sum.amount || 0,
            },
        };
    }

    // Default USER stats
    const totalBookings = await prisma.booking.count({
        where: { userId: user.id },
    });

    return {
        role: "USER",
        stats: {
            totalBookings,
        },
    };
}
