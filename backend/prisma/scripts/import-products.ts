import { PrismaClient, Prisma, IngredientGroup } from "@prisma/client";
import products from "../products";

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding...`);

  for (const product of products) {
    const ingredientGroupsToConnect: IngredientGroup[] = [];
    const _skippedGroups: string[] = [];
    const ingredientGroups = product["product-ingredients"].split(", ");

    for (const ingredientGroup of ingredientGroups) {
      const ingredients = ingredientGroup.split("/");

      for (const ingredient of ingredients) {
        const existingIngredientGroups = await prisma.ingredient
          .findMany({
            where: {
              name: {
                equals: ingredient,
                mode: "insensitive",
              },
            },
            include: { group: true },
          })
          .then((ingredients) => ingredients.map((i) => i.group))
          .catch(console.error);

        if (existingIngredientGroups?.length === 1) {
          ingredientGroupsToConnect.push(existingIngredientGroups[0]);
          break;
        } else {
          _skippedGroups.push(ingredientGroup);
        }
      }
    }

    if (ingredientGroupsToConnect.length > 0) {
      console.log(
        `Adding product ${product["product-name"]} with ${ingredientGroupsToConnect.length}/${ingredientGroups.length} ingredients`
      );
      console.log("Groups that were skipped:", _skippedGroups.join(", "));

      await prisma.product.create({
        data: {
          name: product["product-name"],
          imageUrl: product["product-image-src"],
          ingredientGroups: {
            create: ingredientGroupsToConnect
              .filter(
                (iGroup, index, all) =>
                  all.findIndex((i) => i.id === iGroup.id) === index
              )
              .map((ingredientGroup) => ({
                ingredientGroupId: ingredientGroup.id,
              })),
          },
        },
      });
    } else {
      console.log(
        "No ingredients found for product",
        product["product-name"],
        `found ${ingredientGroupsToConnect.length} groups to connect.`
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
