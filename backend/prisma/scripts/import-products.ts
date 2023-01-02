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
        let productsCreateBatch: ReturnType<typeof createProduct>[] = [];
        for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
          const row = rows[rowIndex];
          let [name, ingredientsCombined, imageUrl, shopPageUrl] = row;

          // const ingredientsToConnect = await getIngredientsToConnect(
          //   ingredientsCombined
          // );
          //
          // console.log(
          //   `Adding ${name} with ${ingredientsToConnect.length} ingredients...`
          // );

          productsCreateBatch.push(
            createProduct(name, ingredientsCombined, imageUrl, shopPageUrl)
          );

          if (
            productsCreateBatch.length >= BATCH_SIZE ||
            rowIndex === rows.length - 1
          ) {
            const productsToCreate = await Promise.all(
              productsCreateBatch
            ).then((products) =>
              products.filter(
                (product) =>
                  product.data.ingredientsString.length > 0 &&
                  !seePackaging(product.data.ingredientsString)
              )
            );

            await prisma.product.createMany({
              data: productsToCreate.map((d) => d.data),
            });

            for (const { data, ingredientIds } of productsToCreate) {
              await prisma.product.update({
                where: { id: data.id },
                data: {
                  ingredients: {
                    connect: ingredientIds.map((id) => ({ id })),
                  },
                },
              });
            }

            productsCreateBatch = [];
          }
        }

        resolve(undefined);
      });
  });
}

async function getIngredientsToConnect(
  ingredientsCombined: string
): Promise<{ connectsTo: Ingredient[]; unknown: string[]; ratio: number }> {
  const ingredientStrings = ingredientsCombined.split(/, |, /g);

  const ingredientsToConnect: Ingredient[] = [];
  const unknownIngredients: string[] = [];
  for (const ingredientString of ingredientStrings) {
    const aliases = ingredientString
      .toUpperCase()
      .split("/")
      .map((alias) =>
        alias
          .trim()
          .replace(
            /^(organic|[* .]|\d+%|\([^\)]+\))+|([* .]|\d+%|\([^\)]+\))+$/gi,
            ""
          )
          .replace(/ +/g, " ")
      ); // Remove leading and trailing asterisks and spaces, percentages, trailing parentheses and organic bs

    /*
    /^(organic|[* .]|\d+%|\([^\)]+\))+|([* .]|\d+%|\([^\)]+\))+$/gi
    /^(organic|[* .]|\d+%)+|([* .]|\d+%)+$|\([^\)]+\)/gi
     */

    /*Connect ingredientStr to ingredient
     * - With most alias matches
     * - None if many have same amount of matches
     * - None if no ingredients share any aliases
     * */
    const ingredientCandidates =
      (await prisma.ingredient
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
          include: {
            aliases: {
              where: {
                name: {
                  in: aliases,
                  mode: "insensitive",
                },
              },
            },
          },
        })
        .catch(console.error)) || [];

    ingredientCandidates.sort((a, b) => b.aliases.length - a.aliases.length);
    if (
      ingredientCandidates.filter(
        (i) => i.aliases.length === ingredientCandidates[0].aliases.length
      ).length === 1
    ) {
      ingredientsToConnect.push(ingredientCandidates[0]);
    } else {
      unknownIngredients.push(ingredientString);
    }
  }

  return {
    connectsTo: ingredientsToConnect,
    unknown: unknownIngredients,
    ratio: ingredientsToConnect.length / ingredientStrings.length,
  };
}

async function createProduct(
  name: string,
  ingredientsString: string,
  imageUrl: string,
  shopPageUrl: string
): Promise<{
  data: Prisma.ProductCreateInput;
  ingredientIds: string[];
}> {
  const ingredientsToConnect = await getIngredientsToConnect(ingredientsString);
  console.log(
    "Creating product",
    name,
    "with ratio",
    ingredientsToConnect.ratio
  );

  return {
    data: {
      id: cuid(),
      name,
      ingredientsString,
      imageUrl,
      shopPageUrl,
      price: 0,
      knownToUnknownRatio: ingredientsToConnect.ratio * 100,
      unknownIngredients: ingredientsToConnect.unknown,
    },
    ingredientIds: ingredientsToConnect.connectsTo.map((i) => i.id),
  };
}

function seePackaging(ingredientsStr: string): boolean {
  const startsWith = ["see full", "see packaging", "please see"];
  const contains = [
    "for full",
    "for complete",
    "list of ingredient",
    "complete ingredient",
    "complete list of",
  ];

  const compareAgainst = ingredientsStr.toLowerCase();

  for (const item of startsWith) {
    if (compareAgainst.startsWith(item)) {
      return true;
    }
  }

  for (const item of contains) {
    if (compareAgainst.includes(item)) {
      return true;
    }
  }

  return false;
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
