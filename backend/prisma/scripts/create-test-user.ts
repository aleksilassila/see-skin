import prisma from "../../src/prisma";

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

  console.log(JSON.stringify(response));
}

// (async () => await createTestUser())();