import { Product } from "../api-types";
import { fetchApi } from "../api";
import apiRoutes, { ApiTypes } from "../api-routes";

export default function fetchProductsFeed(
  page: number,
  name?: string,
  filterIrritants?: boolean
): Promise<Product[]> {
  return fetchApi<ApiTypes["getProducts"]>(apiRoutes.getProducts, {
    params: {
      name,
      filterIrritants,
      take: 25,
      skip: page * 25,
    },
  });
}
