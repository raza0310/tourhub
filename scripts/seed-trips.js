const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    // Find an operator to associate trips with
    const operator = await prisma.operator.findFirst();

    if (!operator) {
        console.log("No operator found. Please sign up as an operator first.");
        return;
    }

    const trips = [
        {
            title: "7-Day Hunza Valley Luxury Expedition",
            description: "Experience the mesmerizing beauty of Hunza, from Attabad Lake to the peak of Passu Cones. Includes luxury accommodation and expert guides.",
            destination: "Hunza",
            price: 45000,
            duration: "7 Days",
            capacity: 20,
            operatorId: operator.id
        },
        {
            title: "Skardu & Deosai Plains Adventure",
            description: "Explore the cold desert of Skardu and the magnificent Deosai Plains. A perfect blend of adventure and serenity.",
            destination: "Skardu",
            price: 55000,
            duration: "6 Days",
            capacity: 15,
            operatorId: operator.id
        },
        {
            title: "Swat Emerald Valley Tour",
            description: "Discover the Switzerland of the East. Visit Malam Jabba, Kalam, and the pristine Mahodand Lake.",
            destination: "Swat",
            price: 35000,
            duration: "4 Days",
            capacity: 25,
            operatorId: operator.id
        },
        {
            title: "Lahore Cultural Heritage Walk",
            description: "Explore the Walled City of Lahore, Badshahi Mosque, and Lahore Fort with expert historians.",
            destination: "Lahore",
            price: 5000,
            duration: "1 Day",
            capacity: 30,
            operatorId: operator.id
        },
        {
            title: "Murree & Patriata Day Trip",
            description: "Escape the heat with a refreshing trip to the Queen of Hills. Enjoy the chairlift at Patriata.",
            destination: "Murree",
            price: 8000,
            duration: "1 Day",
            capacity: 40,
            operatorId: operator.id
        },
        {
            title: "Neelum Valley Blue Water Retreat",
            description: "Visit the stunning Keran, Sharda and Kel in the heart of Azad Kashmir.",
            destination: "Neelum Valley",
            price: 32000,
            duration: "5 Days",
            capacity: 12,
            operatorId: operator.id
        }
    ];

    for (const trip of trips) {
        await prisma.trip.create({ data: trip });
    }

    console.log("Seeded 3 trips successfully!");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
