import { Product } from "../api-types";
import { fetch } from "../api";

export default function fetchProductsFeed(
  page: number,
  name?: string,
  filterIrritants?: boolean
): Promise<Product[]> {
  return fetch<Product[]>("/products/feed", {
    params: {
      name,
      page,
      filterIrritants,
      take: 25,
    },
  }).then((r) => r.data);
}
