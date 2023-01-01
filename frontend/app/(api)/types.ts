export interface IngredientAlias {
  id: string;
  name: string;
  ingredientId: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  shopPageUrl?: string;
}

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
