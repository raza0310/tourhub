// @ts-nocheck
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const trips = await prisma.trip.findMany({
        include: { operator: true }
    });
    console.log("Existing Trips:", JSON.stringify(trips, null, 2));
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
