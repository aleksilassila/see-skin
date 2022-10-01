import * as admin from "firebase-admin";
import * as dotenv from "dotenv";
import * as fs from "fs"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import { parse } from "csv-parse";
import {firestore} from "../firebase-admin";

export async function addCollection(
  collectionName: string,
  docs: { [key: string]: object },
  autoId = false
) {
  const collection = firestore.collection(collectionName);

  for (const key of Object.keys(docs)) {
    console.log(
      `Adding ${key}, ${Object.keys(docs).indexOf(key) + 1} of ${
        Object.keys(docs).length
      }`
    );

    if (autoId) {
      await collection.add(docs[key]);
    } else {
      await collection.doc(key).set(docs[key]).catch(console.error);
    }
  }
}

export async function parseRecords(
  fileName: string,
  parseRecord: (record: any[]) => { [key: string]: any; key: string }
) {
  const parser = fs.createReadStream(fileName).pipe(
    parse({
      fromLine: 2,
      delimiter: ";",
    })
  );

  const data: {
    [key: string]: {
      [key: string]: any;
    };
  } = {};

  for await (const record of parser) {
    const parsed = parseRecord(record);
    data[parsed.key] = parsed;
    delete data[parsed.key]?.key;
  }

  return data;
}
