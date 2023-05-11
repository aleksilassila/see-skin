import { Product } from "../api-types";
import { fetchApi } from "../api";

export default function fetchProductsFeed(
  page: number,
  name?: string,
  filterIrritants?: boolean
): Promise<Product[]> {
  return fetchApi<Product[]>("/products/feed", {
    params: {
      name,
      page,
      filterIrritants,
      take: 25,
    },
  });
}
