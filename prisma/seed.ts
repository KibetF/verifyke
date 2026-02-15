import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin@verifyke.com" },
    update: {},
    create: {
      email: "admin@verifyke.com",
      fullName: "Admin User",
      role: "ADMIN",
      country: "Kenya",
    },
  });

  // Create agent user
  const agent = await prisma.user.upsert({
    where: { email: "agent@verifyke.com" },
    update: {},
    create: {
      email: "agent@verifyke.com",
      fullName: "James Mwangi",
      role: "AGENT",
      country: "Kenya",
    },
  });

  // Create client user
  const client = await prisma.user.upsert({
    where: { email: "client@verifyke.com" },
    update: {},
    create: {
      email: "client@verifyke.com",
      fullName: "Sarah Wanjiku",
      role: "CLIENT",
      country: "Kenya",
    },
  });

  // Create a property
  const property = await prisma.property.upsert({
    where: { id: "seed-property-001" },
    update: {},
    create: {
      id: "seed-property-001",
      userId: client.id,
      name: "Kiambu Plot LR-4521",
      county: "Kiambu",
      latitude: -1.1714,
      longitude: 36.8356,
      propertyType: "LAND",
    },
  });

  // Create a service request
  await prisma.serviceRequest.upsert({
    where: { id: "seed-request-001" },
    update: {},
    create: {
      id: "seed-request-001",
      userId: client.id,
      propertyId: property.id,
      serviceType: "STANDARD",
      status: "PENDING",
      basePrice: 8000,
      distanceFee: 1000,
      totalPrice: 9000,
      distanceKm: 25,
      scheduledDate: new Date("2026-03-01"),
    },
  });

  console.log("Seed data created successfully");
  console.log({ admin: admin.email, agent: agent.email, client: client.email });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
