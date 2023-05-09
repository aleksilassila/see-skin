import { fetch } from "../api";
import { Product } from "../api-types";

export async function fetchProducts() {
  return await fetch<Product[]>("/manage/issues/products").then((r) => r.data);
}
