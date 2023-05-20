import { Product } from "../api-types";
import { fetchApi } from "../api";
import { GetProducts } from "../api-routes";

export default function fetchProductsFeed(
  page: number,
  name?: string,
  filterIrritants?: boolean
): Promise<Product[]> {
  return fetchApi<GetProducts>("/products", {
    params: {
      name,
      filterIrritants,
      take: 25,
      skip: page * 25,
    },
  });
}
