import Api from "../api";
import { Product } from "../../manage/ManageResponseTypes";

export async function fetchProducts() {
  return await Api.fetch<Product[]>("/manage/issues/products").then(
    (r) => r.data
  );
}
