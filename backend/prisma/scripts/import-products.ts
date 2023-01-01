import { Ingredient, Prisma, PrismaClient } from "@prisma/client";
import * as fs from "fs";
import { parse } from "csv-parse";
import prisma from "../../src/prisma";
import cuid = require("cuid");

// const prisma = new PrismaClient();

const CSV_FILE = "./prisma/csv/products-full.csv";
const N_OF_COLUMNS = 4;
const BATCH_SIZE = 100;

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
        let batchCreateData: ReturnType<typeof createProduct>[] = [];
        for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
          const row = rows[rowIndex];
          let [name, ingredientsCombined, imageUrl, shopPageUrl] = row;

          const ingredientsToConnect = await getIngredientsToConnect(
            ingredientsCombined
          );

          console.log(
            `Adding ${name} with ${ingredientsToConnect.length} ingredients...`
          );

          batchCreateData.push(
            createProduct(
              name,
              ingredientsCombined,
              ingredientsToConnect.map((i) => i.id),
              imageUrl,
              shopPageUrl
            )
          );

          if (
            batchCreateData.length >= BATCH_SIZE ||
            rowIndex === rows.length - 1
          ) {
            await prisma.product.createMany({
              data: batchCreateData.map((d) => d.data),
            });

            for (const { data, ingredientIds } of batchCreateData) {
              await prisma.product.update({
                where: { id: data.id },
                data: {
                  ingredients: {
                    connect: ingredientIds.map((id) => ({ id })),
                  },
                },
              });
            }

            batchCreateData = [];
          }
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

function createProduct(
  name: string,
  ingredientsString: string,
  ingredientIds: string[],
  imageUrl: string,
  shopPageUrl: string
): {
  data: Prisma.ProductCreateInput;
  ingredientIds: string[];
} {
  return {
    data: {
      id: cuid(),
      name,
      ingredientsString,
      imageUrl,
      shopPageUrl,
    },
    ingredientIds,
  };

  // const id = await prisma.product
  //   .findFirst({ where: { name } })
  //   .then((p) => p?.id || "");
  //
  // return prisma.product.upsert({
  //   where: { id },
  //   create: {
  //     name,
  //     ingredientsString,
  //     ingredients: {
  //       connect: ingredientIds.map((id) => ({ id })),
  //     },
  //     imageUrl: imageUrl,
  //     shopPageUrl,
  //   },
  //   update: {
  //     name,
  //     ingredientsString,
  //     ingredients: {
  //       set: ingredientIds.map((id) => ({ id })),
  //     },
  //     imageUrl: imageUrl,
  //     shopPageUrl,
  //   },
  // });
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
