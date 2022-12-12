import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "../../../firebase/firebase-admin";
import { requireParams } from "../../../api/utils";

function handler(red: NextApiRequest, res: NextApiResponse) {
  const { query } = red.query;

  if (!query) return;

  const products = firestore
    .collection("products")
    .where("name", ">=", query)
    .where("name", "<=", query + "\uf8ff");

  res.status(200).json(products);
}

export default requireParams(handler, "query");
