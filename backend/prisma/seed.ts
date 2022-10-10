import { PrismaClient, Ingredient } from "@prisma/client";
import products from "./products";

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  require("./scripts/import-ingredients.ts");
  require("./scripts/import-products.ts");

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
