import { ManageProduct } from "../manage/products";
import Api from "../api";
import { IngredientAlias } from "../manage/ingredients";

export enum IngredientClass {
  SAFE = "SAFE",
  PARABEN = "PARABEN",
  ALCOHOL = "ALCOHOL",
  SULFATE = "SULFATE",
  FUNGAL_ACNE_TRIGGER = "FUNGAL_ACNE_TRIGGER",
  DRY_IRRITANT = "DRY_IRRITANT",
  OILY_IRRITANT = "OILY_IRRITANT",
  DRY_OILY_IRRITANT = "DRY_OILY_IRRITANT",
  SENSITIVE_IRRITANT = "SENSITIVE_IRRITANT",
}

export interface Ingredient {
  id: string;
  name: string;
  cosingRef: number;
  description: string;
  function: string;
  aliases?: IngredientAlias[];
  ingredientClasses: IngredientClass[];
  updatedAt: Date;
  createdAt: Date;
}

export default async function fetchIrritants(
  products: ManageProduct[]
): Promise<Ingredient[]> {
  return Api.fetch<Ingredient[]>("/solver/calculate-irritants", {
    params: {
      productIds: products.map((product) => product.id),
    },
  }).then((response) => response.data);
}
