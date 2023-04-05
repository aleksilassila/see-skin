import Api from "../api";
import { Product } from "../types";

export default function fetchProductsFeed(
  page: number,
  name?: string,
  filterIrritants?: boolean
): Promise<Product[]> {
  return Api.fetch<Product[]>("/products/feed", {
    params: {
      name,
      page,
      filterIrritants,
      take: 25,
    },
  }).then((r) => r.data);
}
