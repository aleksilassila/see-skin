import * as fs from "fs";
import { parse } from "csv-parse";
import { addCollection, parseRecords } from "./seeder";
import {firestore} from "../firebase-admin";
import {collection, getDocs, query, where} from "@firebase/firestore";

(async () => {
  const ingredientData = await parseRecords(
    "firebase/seed/csv/ingredients.csv",
    (record) => ({
      key: record[0],
      cosingRef: parseInt(record[0]),
      name: record[1],
      description: record[6],
      function: record[8],
    })
  );

  const productData = await parseRecords(
    "firebase/seed/csv/products.csv",
    (record) => ({
      key: record[0],
      productName: record[4],
      productUrl: record[3],
      ingredients: record[5],
      imageUrl: record[6],
    })
  );

  const products = firestore.collection("products").where("ingredients.water", "!=", null).limit(10)

  console.log(await products.get().then(s => s.docs.map(d => {
    if (d.exists) {
      return d.data()
    } else return null
  })));

  // await addCollection("ingredients", ingredientData);
  // await addCollection("products", productData);
})();
