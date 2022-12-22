import Api from "../api";

export interface ManageProduct {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
}

export async function fetchProducts() {
  return await Api.fetch<ManageProduct[]>("/manage/issues/products").then(
    (r) => r.data
  );
}
