import Api from "../api";
import { Product } from "../types";

export default function fetchProductsFeed(page: number) {
  return Api.fetch<Product[]>("/products/feed", {
    params: {
      page,
      take: 25,
    },
  });
}
