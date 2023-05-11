import { fetchApi } from "../api";
import { Product } from "../api-types";

export async function fetchProducts() {
  return await fetchApi<Product[]>("/manage/issues/products");
}
