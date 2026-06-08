const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    const trips = await prisma.trip.findMany();
    console.log("Current Trips in DB:");
    console.table(trips.map(t => ({
        id: t.id,
        title: t.title,
        dest: t.destination,
        price: t.price
    })));
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
