import { PrismaClient, Ingredient } from "@prisma/client";
import products from "./products";

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  const ingredientGroupsToAdd: string[][] = [];

  products.forEach((product) => {
    const productIngredients = product["product-ingredients"]
      .toLowerCase()
      .replace("\n", " ")
      .replace(/ +(?= )/g, "")
      .trim()
      .split(", ")
      .map((i) =>
        i.split("/").map((alias) => {
          const split = alias.split(": ");

          return split[split.length - 1];
        })
      );

    let partOfIndex: number | undefined = undefined;
    for (const aliases of productIngredients) {
      // If ingredientGroupsToAdd contains any of the aliases, add the rest of the aliases to that group
      for (const [index, group] of ingredientGroupsToAdd.entries()) {
        if (group.some((i) => aliases.includes(i))) {
          partOfIndex = index;
          break;
        }
      }

      // If ingredientGroupsToAdd does not contain any of the aliases, add the aliases as a new group
      if (partOfIndex === undefined) {
        ingredientGroupsToAdd.push(aliases);
      } else {
        ingredientGroupsToAdd[partOfIndex].push(
          ...aliases.filter(
            (i) => !ingredientGroupsToAdd[partOfIndex as number].includes(i)
          )
        );
        partOfIndex = undefined;
      }
    }
  });

  console.log(
    products.map((product) =>
      product["product-ingredients"].toLowerCase().split(", ")
    )
  );
  console.log("asdasd");
  console.log(ingredientGroupsToAdd);

  //
  // for (const product of products) {
  //   const ingredients = product["product-ingredients"].split(", ");
  //
  //   // Generate ingredients
  //   const ingredientGroups: { [mainIngredient: string]: string[] } = {};
  //
  //   for (const product of products) {
  //     const productIngredientGroups = product["product-ingredients"]
  //       .split(", ")
  //       .map((i) => i.split("/"));
  //
  //     for (const aliases of productIngredientGroups) {
  //       const existingAliases =
  //         (await prisma.ingredient
  //           .findMany({
  //             where: {
  //               name: {
  //                 in: aliases,
  //               },
  //             },
  //           })
  //           .catch(console.error)) || [];
  //
  //       let mainIngredient: Ingredient | undefined = existingAliases.filter(
  //         (i) => i.aliasForName === undefined
  //       )[0];
  //
  //       const aliasesToCreate = aliases.filter(
  //         (a) => existingAliases.map((i) => i.name).includes(a) === false
  //       );
  //
  //       if (!mainIngredient) {
  //         mainIngredient =
  //           (await prisma.ingredient
  //             .create({
  //               data: {
  //                 name: aliasesToCreate[0],
  //                 function: "",
  //               },
  //             })
  //             .catch(console.error)) || undefined;
  //       }
  //
  //       if (mainIngredient) {
  //         await prisma.ingredient.createMany({
  //           data: aliasesToCreate.map((alias) => ({
  //             name: alias,
  //             function: "",
  //             aliasFor: {
  //               connect: {
  //                 name: (<Ingredient>mainIngredient).name,
  //               },
  //             },
  //           })),
  //         });
  //       }
  //     }
  //   }
  //
  //   for (const ingredient of ingredients) {
  //     const synonyms = ingredient.split("/");
  //     const existingIngredient = await prisma.ingredient.findMany({
  //       where: {},
  //     });
  //   }
  // }
  //
  // await prisma.product.createMany({
  //   data: products.map((product) => ({
  //     id: product["web-scraper-order"],
  //     name: product["product-name"],
  //     description: "",
  //     ingredients: product["product-ingredients"],
  //   })),
  // });
  //
  // for (const product of products) {
  // }

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
