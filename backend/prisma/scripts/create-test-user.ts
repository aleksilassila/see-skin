import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createTestUser() {
  console.log("Creating test user");

  const response = await prisma.user.upsert({
    where: {
      id: "test",
    },
    update: {},
    create: {
      id: "test",
      name: "Test User",
      googleId: "test",
      email: "example@example.com",
      password: "test",
      accessLevel: 1,
    },
  });
}

// (async () => await createTestUser())();
