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

export enum SkinType {
  NORMAL = "NORMAL",
  DRY = "DRY",
  OILY = "OILY",
  COMBINATION = "COMBINATION",
  NORMAL_SENSITIVE = "NORMAL_SENSITIVE",
  DRY_SENSITIVE = "DRY_SENSITIVE",
  OILY_SENSITIVE = "OILY_SENSITIVE",
  COMBINATION_SENSITIVE = "COMBINATION_SENSITIVE",
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

interface ResultDuplicate {
  ingredient: Ingredient;
  products: ManageProduct[];
}

interface ResultSkinTypeIrritant {
  ingredient: Ingredient;
  skinType: SkinType;
  ingredientClasses: IngredientClass[];
  products: ManageProduct[];
}

export interface IrritantsCalculationResponse {
  duplicates: ResultDuplicate[];
  skinTypeIrritants: ResultSkinTypeIrritant[];
}

export default async function fetchIrritantsCalculation(
  products: ManageProduct[],
  ingredients: Ingredient[],
  skinType: SkinType
): Promise<IrritantsCalculationResponse> {
  return Api.fetch<IrritantsCalculationResponse>(
    "/ingredients/calculate-irritants",
    {
      params: {
        productIds: products.map((product) => product.id),
        ingredientIds: ingredients.map((ingredient) => ingredient.id),
        skinType,
      },
    }
  ).then((response) => response.data);
}
