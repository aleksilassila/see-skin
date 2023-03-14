import Api from "../api";
import { Ingredient, IngredientClass, Product, SkinType } from "../types";

interface ResultDuplicate {
  ingredient: Ingredient;
  products: Product[];
}

interface ResultSkinTypeIrritant {
  ingredient: Ingredient;
  skinType: SkinType;
  ingredientClasses: IngredientClass[];
  products: Product[];
}

export interface IrritantsCalculationResponse {
  duplicates: ResultDuplicate[];
  skinTypeIrritants: ResultSkinTypeIrritant[];
}

export default async function fetchIrritantsCalculation(
  skinType: SkinType,
  products: Product[],
  ingredients: Ingredient[]
): Promise<IrritantsCalculationResponse> {
  return Api.fetch<IrritantsCalculationResponse>("/user/calculate-irritants", {
    params: {
      productIds: products.map((product) => product.id),
      ingredientIds: ingredients.map((ingredient) => ingredient.id),
      skinType,
    },
  }).then((response) => response.data);
}
