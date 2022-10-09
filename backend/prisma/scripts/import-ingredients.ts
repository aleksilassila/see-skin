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

    const aliases = ingredientName
      // .replace(/\([^\)]*\) .+\//, "")
      .split("/");

    console.log(
      `Adding ${ingredientName} with ${aliases.slice(1).length} aliases...`
    );

    const group = await prisma.ingredientGroup
      .create({
        data: {
          cosingRef: ingredient["COSING Ref No"],
          function: ingredient["Function"],
          updatedAt: new Date(ingredient["Update Date"] || Date.now()),

          ingredients: {
            create: aliases.map((alias) => ({
              name: alias.trim(),
            })),
          },
        },
      })
      .catch(console.error);

    //   for (const alias of aliases) {
    //     await prisma.ingredient
    //       .create({
    //         data: {
    //           name: alias,
    //           function: ingredient.Function,
    //           ...(mainAlias !== alias && {
    //             aliasFor: {
    //               connect: {
    //                 name: mainAlias,
    //               },
    //             },
    //           }),
    //         },
    //       })
    //       .catch(() =>
    //         console.error(
    //           `Failed to add ${alias} part of ${ingredient["INCI name"]}`
    //         )
    //       );
    //   }
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
