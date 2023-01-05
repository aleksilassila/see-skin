import { IngredientClass, Prisma } from "@prisma/client";
import * as fs from "node:fs/promises";
import { parse } from "csv-parse";
import prisma from "../../src/prisma";
import cuid = require("cuid");

const CSV_FILE = "./prisma/csv/ingredients-full.csv";
const N_OF_COLUMNS = 6;
const BATCH_SIZE = 100;

/*
HYDROLYZED (SOLANUM LYCOPERSICUM/TUBEROSUM FRUIT) (DAUCUS AUREUS/BROTERI/ CAROTA/DURIEUA/GADECEAU/GLOCHIDIATUS/MURICATUS ROOT) (MUSA ACUMINATA/BALBISIANA/PARADISIACA FRUIT) (PYRUS COMMUNIS/COSSONII/KOEHNEI/SALICIFOLIA/PYRIFOLIA/BRETSCHNEIDERI FRUIT) (FRAGARIA DALTONIANA/HAYATAE/IINUMAE/VESCA/VIRIDIS/BRINGHURSTII/MOSCHATA/CHILOENSIS/OVALIS FRUIT) (CITRUS RETICULATE/AURANTIUM/CLEMENTINA/AURANTIIFOLIA/UNSHIU/SINENSIS/LATIFOLIA/LIMON/BERGAMIA/MAXIMA/HYSTRIX/PARADISI/JAPONICA/FORTUNELLA FRUIT) (MALUS PUMILA/DOMESTICA/FLORIBUNDA/BACCATA/SYLVESTRIS FRUIT) (CITRULLUS COLOCYNTHIS/ECIRRHOSUS/LANATUS/NAUDINIANUS FRUIT) (CUCUMIS FICIFOLIUS/MELO/SATIVUS/METULIFER FRUIT) (AVENA SATIVA/STRIGOSA GRAIN) (TRITICUM TURGIDUM/AESTIVUM/MONOCOCCUM GRAIN) (HORDEUM VULGARE/SECALINUM/MURINUM/JUBATUM GRAIN)
produced 2 * 7 * 3 * 6 * 9 * 14 * 5 * 4 * 4 * 2 * 3 * 4 = 60 963 840 aliases :))

[LACTOBACILLUS/(CIRSIUM JAPONICUM/MORINGA OLEIFERA LEAF) EXTRACT FERMENT & SUCROSE] EXTRACT FILTRATE
Does not produce correct aliases
 */

export async function importIngredients() {
  console.log(`Start seeding ...`);

  let skipped = 0;
  const stream = await fs.open(CSV_FILE).then((fd) => fd.createReadStream());

  return new Promise((resolve, reject) => {
    const rows: string[][] = [];
    stream
      .pipe(parse({ delimiter: ";", from_line: 3 }))
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
        let batchCreateData: Parameters<typeof createIngredientBatch>[0] = [];
        for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
          const row = rows[rowIndex];
          let [
            cosingRefStr,
            combinedName,
            description,
            fn,
            ingredientClassesStr,
            updatedAtStr,
          ] = row;
          const cosingRef = parseInt(cosingRefStr);
          const updatedAt = new Date(updatedAtStr || Date.now());
          const ingredientClasses =
            ingredientClassesStr === ""
              ? []
              : (ingredientClassesStr
                  .slice(1, -1)
                  .split(",") as IngredientClass[]);

          const aliases = getAliases(combinedName);

          if (aliases.length >= 50) {
            console.warn(
              `${cosingRef}, ${combinedName} has ${aliases.length} aliases`
            );
          } else {
            console.log(
              `Adding ${cosingRef} with ${aliases.length} aliases...`
            );
          }

          batchCreateData.push({
            data: {
              id: cuid(),
              cosingRef,
              function: fn,
              description,
              updatedAt,
              name: combinedName,
              ingredientClasses,
            },
            aliases,
          });

          // await createIngredient(
          //   cosingRef,
          //   combinedName,
          //   description,
          //   fn,
          //   updatedAt,
          //   aliases,
          //   ingredientClasses
          // );

          if (
            batchCreateData.length >= BATCH_SIZE ||
            rowIndex === rows.length - 1
          ) {
            await createIngredientBatch(batchCreateData);
            batchCreateData = [];
          }
        }

        resolve(undefined);
      });
  });
}

async function createIngredientBatch(
  batchCreateData: {
    data: Prisma.IngredientCreateInput;
    aliases: string[];
  }[]
) {
  await prisma.ingredient.createMany({
    data: batchCreateData.map((data) => data.data),
  });

  await prisma.ingredientAlias.createMany({
    data: batchCreateData.flatMap((data) =>
      data.aliases.map((name) => ({
        ingredientId: data.data.id as string,
        name,
      }))
    ),
  });
}

function getAliases(combinedName: string): string[] {
  let string = combinedName;
  let highLevelAliases: string[] = [""];

  let parenthesesString: string = "";

  // Get top level aliases

  let parenthesesDepth = 0;
  for (const char of string) {
    if (char === "(") {
      parenthesesDepth++;
    } else if (char === ")") {
      parenthesesDepth--;
    }

    // Write to top level alias
    if (char !== "/" || parenthesesDepth !== 0) {
      highLevelAliases[highLevelAliases.length - 1] += char;
    } else if (parenthesesDepth === 0) {
      highLevelAliases.push("");
    }
  }

  // Expand top level aliases that contain blocks

  const expandedAliases: string[] = [];
  for (const aliasIndex in highLevelAliases) {
    const alias = highLevelAliases[aliasIndex];

    if (!alias.includes("(")) {
      expandedAliases.push(alias);
      continue;
    }

    const splitAlias = getParenthesesBlocks(alias);
    const expandedAliases2 = splitAlias
      .filter((block) => block.startsWith("("))
      .map((block) => getAliases(block.slice(1, -1)));

    const combinations = getAllCombinations(expandedAliases2);

    for (const combination of combinations) {
      const newAlias = splitAlias
        .map((block) => (block.startsWith("(") ? combination.shift() : block))
        .join("");
      expandedAliases.push(newAlias);
    }
  }

  return expandedAliases;
}

function getAllCombinations(arr: string[][]): string[][] {
  let out: string[][] = [[]];
  // Number of arrays
  let n = arr.length;

  // To keep track of next element in
  // each of the n arrays
  let indices = new Array(n);

  // Initialize with first element's index
  for (let i = 0; i < n; i++) indices[i] = 0;

  while (true) {
    // Print current combination
    for (let i = 0; i < n; i++) out[out.length - 1].push(arr[i][indices[i]]);

    out.push([]);

    // Find the rightmost array that has more
    // elements left after the current element
    // in that array
    let next = n - 1;
    while (next >= 0 && indices[next] + 1 >= arr[next].length) next--;

    // No such array is found so no more
    // combinations left
    if (next < 0) return out.splice(0, out.length - 1);

    // If found move to next element in that
    // array
    indices[next]++;

    // For all arrays to the right of this
    // array current index again points to
    // first element
    for (let i = next + 1; i < n; i++) indices[i] = 0;
  }
}

function getParenthesesBlocks(string: string): string[] {
  const blocks: string[] = [""];
  let parenthesesDepth = 0;
  let parenthesesString = "";

  for (const char of string) {
    if (char === "(") {
      parenthesesDepth++;
      if (parenthesesDepth === 1) blocks.push("");
      blocks[blocks.length - 1] += char;
    } else if (char === ")") {
      parenthesesDepth--;
      blocks[blocks.length - 1] += char;
      if (parenthesesDepth === 0) blocks.push("");
    } else {
      blocks[blocks.length - 1] += char;
    }
  }

  return blocks;
}

async function createIngredient(
  cosingRef: number,
  name: string,
  description: string,
  fn: string,
  updatedAt: Date,
  aliases: string[],
  ingredientClasses: IngredientClass[]
) {
  return prisma.ingredient
    .create({
      data: {
        cosingRef,
        function: fn,
        description,
        updatedAt,
        name,
        ingredientClasses,

        aliases: {
          create: aliases.map((alias) => ({
            name: alias.trim(),
          })),
        },
      },
    })
    .then(() => console.log(`Added ${cosingRef}`))
    .catch((err) => {
      console.error(cosingRef, err);
    });
}

// importIngredients()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
