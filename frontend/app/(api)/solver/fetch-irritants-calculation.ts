import { Ingredient, IngredientClass, Product, SkinType } from "../types";
import { fetch } from "../api";

export type IrritantsCalculationResponse = Irritant[];

type IrritationReason = {
  type: string;
} & (
  | DuplicateIrritationReason
  | IngredientClassIrritationReason
  | ExplicitlyAddedIrritantReason
);

interface DuplicateIrritationReason {
  type: "DUPLICATE";
  products: Product[];
}

export interface IngredientClassIrritationReason {
  type: "CLASS_IRRITANT";
  reason: "COMMON_IRRITANT" | "SKIN_TYPE_IRRITANT";
  ingredientClass: IngredientClass;
}

interface ExplicitlyAddedIrritantReason {
  type: "EXPLICITLY_ADDED";
  ingredient: Ingredient;
}

interface Irritant {
  ingredient: Ingredient;
  irritationReasons: IrritationReason[];
}

export default async function fetchIrritantsCalculation(
  skinType: SkinType,
  products: Product[],
  ingredients: Ingredient[]
): Promise<IrritantsCalculationResponse> {
  return fetch<IrritantsCalculationResponse>("/user/create-skin-profile", {
    params: {
      productIds: products.map((product) => product.id),
      ingredientIds: ingredients.map((ingredient) => ingredient.id),
      skinType,
    },
  }).then((response) => response.data);
}
