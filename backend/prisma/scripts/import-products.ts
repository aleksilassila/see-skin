import { PrismaClient, Prisma, Ingredient } from "@prisma/client";
import products from "../products";

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding...`);

  for (const product of products) {
    const ingredientsToConnect: Ingredient[] = [];
    const _skippedIngredients: string[] = [];
    const ingredients = product["product-ingredients"].split(", ");

    for (const ingredient of ingredients) {
      const aliases = ingredient.split("/");

      for (const alias of aliases) {
        const existingIngredientGroups = await prisma.ingredientAlias
          .findMany({
            where: {
              name: {
                equals: alias,
                mode: "insensitive",
              },
            },
            include: { ingredient: true },
          })
          .then((ingredients) => ingredients.map((i) => i.ingredient))
          .catch((e) => {
            console.error(e);
            return [];
          });

        if (existingIngredientGroups?.length === 1) {
          ingredientsToConnect.push(existingIngredientGroups[0]);
          break;
        } else {
          _skippedIngredients.push(alias);
        }
      }
    }

    if (ingredientsToConnect.length > 0) {
      console.log(
        `Adding product ${product["product-name"]} with ${ingredientsToConnect.length}/${ingredients.length} ingredients`
      );
      console.log(
        "Ingredients that were skipped:",
        _skippedIngredients.join(", ")
      );

      await prisma.product.create({
        data: {
          name: product["product-name"],
          imageUrl: product["product-image-src"],
          ingredients: {
            create: ingredientsToConnect
              .filter(
                (ingredient, index, all) =>
                  all.findIndex((i) => i.id === ingredient.id) === index
              )
              .map((ingredientGroup) => ({
                ingredientId: ingredientGroup.id,
              })),
          },
        },
      });
    } else {
      console.log(
        "No ingredients found for product",
        product["product-name"],
        `found ${ingredientsToConnect.length} ingredients to connect.`
      );
    }
  }

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
