import { importIngredients } from "./scripts/import-ingredients";
import { importProducts } from "./scripts/import-products";
import { createTestUser } from "./scripts/create-test-user";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  await importIngredients();
  await importProducts();
  await createTestUser();

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
