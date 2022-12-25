import { Ingredient, PrismaClient } from "@prisma/client";
import * as fs from "fs";
import { parse } from "csv-parse";

const prisma = new PrismaClient();

const CSV_FILE = "./prisma/csv/products-full.csv";
const N_OF_COLUMNS = 4;

async function main() {
  console.log(`Start seeding...`);

  let skipped = 0;
  const rows: string[][] = [];
  fs.createReadStream(CSV_FILE)
    .pipe(parse({ delimiter: ";", from_line: 2 }))
    .on("data", async function (row: string[]) {
      if (row.length !== N_OF_COLUMNS) {
        throw new Error("Invalid number of columns: " + row);
      }

      rows.push(row);
    })
    .on("error", console.error)
    .on("end", async function () {
      for (const row of rows) {
        let [name, ingredientsCombined, imageUrl, shopPageUrl] = row;

        const ingredientsToConnect = await getIngredientsToConnect(
          ingredientsCombined
        );

        console.log(
          `Adding ${name} with ${ingredientsToConnect.length} ingredients...`
        );

        await createProduct(
          name,
          ingredientsCombined,
          ingredientsToConnect.map((i) => i.id),
          imageUrl,
          shopPageUrl
        );
      }
    });
}

async function getIngredientsToConnect(
  ingredientsCombined: string
): Promise<Ingredient[]> {
  const ingredientsToConnect: Promise<Ingredient | null>[] = [];
  const ingredientStrings = ingredientsCombined.split(", ");

  for (const ingredientString of ingredientStrings) {
    const aliases = ingredientString.split("/");

    const ingredient = prisma.ingredient
      .findMany({
        where: {
          aliases: {
            some: {
              name: {
                in: aliases,
                mode: "insensitive",
              },
            },
          },
        },
      })
      .then((ingredients) => {
        if (ingredients.length > 1) {
          console.warn(
            `Could not connect ingredient ${ingredientString}. Ingredients matching:`,
            ingredients.length
          );
        }

        return ingredients.length === 1 ? ingredients[0] : null;
      })
      .catch((err) => {
        console.error(err);
        return null;
      });

    if (ingredient) ingredientsToConnect.push(ingredient);
  }

  return Promise.all(ingredientsToConnect).then(
    (ingredients) => ingredients.filter((i) => i !== null) as Ingredient[]
  );
}

async function createProduct(
  name: string,
  ingredientsString: string,
  ingredientIds: string[],
  imageUrl: string,
  shopPageUrl: string
) {
  const id = await prisma.product
    .findFirst({ where: { name } })
    .then((p) => p?.id || "");

  return prisma.product.upsert({
    where: { id },
    create: {
      name,
      ingredientsString,
      ingredients: {
        connect: ingredientIds.map((id) => ({ id })),
      },
      imageUrl: imageUrl,
      shopPageUrl,
    },
    update: {
      name,
      ingredientsString,
      ingredients: {
        set: ingredientIds.map((id) => ({ id })),
      },
      imageUrl: imageUrl,
      shopPageUrl,
    },
  });
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
