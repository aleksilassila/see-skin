import Api from "../api";
import { Product } from "../types";

export default function fetchProductsFeed(page: number, name?: string) {
  return Api.fetch<Product[]>("/products/feed", {
    params: {
      name,
      page,
      take: 25,
    },
  });
}
