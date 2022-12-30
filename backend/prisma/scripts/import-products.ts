import { Ingredient, PrismaClient } from "@prisma/client";
import * as fs from "fs";
import { parse } from "csv-parse";
import prisma from "../../src/prisma";

// const prisma = new PrismaClient();

const CSV_FILE = "./prisma/csv/products-full.csv";
const N_OF_COLUMNS = 4;

export async function importProducts() {
  console.log(`Start seeding...`);

  let skipped = 0;
  const rows: string[][] = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(CSV_FILE)
      .pipe(parse({ delimiter: ";", from_line: 2 }))
      .on("data", async function (row: string[]) {
        if (row.length !== N_OF_COLUMNS) {
          throw new Error("Invalid number of columns: " + row);
        }

        rows.push(row);
      })
      .on("error", () => {
        console.error();
        reject();
      })
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

        resolve(undefined);
      });
  });
}

async function getIngredientsToConnect(
  ingredientsCombined: string
): Promise<Ingredient[]> {
  const ingredientsToConnect: Ingredient[] = [];
  const ingredientStrings = ingredientsCombined.split(", ");

  for (const ingredientString of ingredientStrings) {
    const aliases = ingredientString.split("/");

    const ingredient = await prisma.ingredient
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

  return ingredientsToConnect;
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

// importProducts()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
