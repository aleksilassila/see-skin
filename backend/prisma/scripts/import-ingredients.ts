import { Ingredient, PrismaClient } from "@prisma/client";
import ingredients from "../ingredients";

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  let skipped = 0;
  for (const ingredient of ingredients) {
    const ingredientName = ingredient["INCI name"];
    if (ingredientName.match(/\([^0-9]+\) /g)) {
      skipped++;
      continue;
    }

    const aliases = ingredientName.split("/");

    console.log(
      `Adding ${ingredientName} with ${aliases.slice(1).length} aliases...`
    );

    const group = await prisma.ingredient
      .create({
        data: {
          cosingRef: ingredient["COSING Ref No"],
          function: ingredient["Function"],
          updatedAt: new Date(ingredient["Update Date"] || Date.now()),
          name: aliases.length ? aliases[0] : "",

          aliases: {
            create: aliases.map((alias) => ({
              name: alias.trim(),
            })),
          },
        },
      })
      .catch(console.error);
  }

  console.log(`Seeding finished with ${skipped} ingredients skipped.`);
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
