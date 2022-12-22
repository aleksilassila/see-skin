import { ManageProduct } from "../manage/products";
import Api from "../api";
import { ManageIngredient } from "../manage/ingredients";

export interface IngredientGroup {
  id: string;
  cosingRef: number;
  function: string;
  ingredients: ManageIngredient[];
}

export default async function fetchIrritants(
  products: ManageProduct[]
): Promise<IngredientGroup[]> {
  return Api.fetch<IngredientGroup[]>("/solver/calculate-irritants", {
    params: {
      productIds: products.map((product) => product.id),
    },
  }).then((response) => response.data);
}
