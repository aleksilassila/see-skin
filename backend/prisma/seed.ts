import { PrismaClient, Ingredient } from "@prisma/client";
import products from "./products";
import { importIngredients } from "./scripts/import-ingredients";
import { importProducts } from "./scripts/import-products";
import prisma from "../src/prisma";

// const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  await importIngredients();
  await importProducts();

  // require("./scripts/import-ingredients.ts");
  // require("./scripts/import-products.ts");

  // const allAliases = await prisma.ingredient
  //   .findMany()
  //   .then((i) => i.map((i) => i.name));
  //
  // let n = 0;
  // const done: string[] = [];
  // for (const alias of allAliases) {
  //   if (done.includes(alias)) continue;
  //   done.push(alias);
  //
  //   let numberOfDuplicates = 0;
  //   for (const a of allAliases) {
  //     if (a === alias) numberOfDuplicates++;
  //   }
  //   if (numberOfDuplicates > 1) n += numberOfDuplicates;
  // }
  //
  // console.log(n, allAliases.length);
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
