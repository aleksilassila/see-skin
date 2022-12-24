import { Ingredient, PrismaClient } from "@prisma/client";
import ingredients from "../ingredients";
import * as fs from "fs";
import { parse } from "csv-parse";

const prisma = new PrismaClient();

const CSV_FILE = "./prisma/csv/ingredients-full.csv";
const N_OF_COLUMNS = 5;

async function main() {
  console.log(`Start seeding ...`);

  let skipped = 0;
  fs.createReadStream(CSV_FILE)
    .pipe(parse({ delimiter: ";", from_line: 2 }))
    .on("data", async function (row: string[]) {
      if (row.length !== N_OF_COLUMNS) {
        throw new Error("Invalid number of columns: " + row);
      }

      let [cosingRefStr, combinedName, description, fn, updatedAtStr] = row;
      const cosingRef = parseInt(cosingRefStr);
      const updatedAt = new Date(updatedAtStr || Date.now());

      if (combinedName.match(/\([^0-9]+\) /g)) {
        skipped++;
        console.log("Skipping", combinedName);
        return;
      }

      const aliases = combinedName.split("/");

      await createIngredient(
        cosingRef,
        combinedName,
        description,
        fn,
        updatedAt,
        aliases
      );
    })
    .on("error", console.error);
}

function createIngredient(
  cosingRef: number,
  name: string,
  description: string,
  fn: string,
  updatedAt: Date,
  aliases: string[]
) {
  console.log(`Adding ${name} with ${aliases.length} aliases...`);

  return prisma.ingredient
    .create({
      data: {
        cosingRef,
        function: fn,
        description,
        updatedAt,
        name,

        aliases: {
          create: aliases.map((alias) => ({
            name: alias.trim(),
          })),
        },
      },
    })
    .catch(() => console.error(`Could not add ${name}`));
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
