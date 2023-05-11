import {
  Ingredient,
  IngredientClass,
  IngredientWithAliases,
  Product,
  SkinType,
} from "../api-types";
import { fetchApi } from "../api";

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
  ingredient: IngredientWithAliases;
  irritationReasons: IrritationReason[];
}

export default async function fetchIrritantsCalculation(
  skinType: SkinType,
  products: Product[],
  ingredients: Ingredient[]
): Promise<IrritantsCalculationResponse> {
  return fetchApi<IrritantsCalculationResponse>("/user/create-skin-profile", {
    params: {
      productIds: products.map((product) => product.id),
      ingredientIds: ingredients.map((ingredient) => ingredient.id),
      skinType,
    },
  });
}
