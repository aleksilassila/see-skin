export interface IngredientAlias {
  id: string;
  name: string;
  ingredientId: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  priceBeforeDiscount?: number;
  priceCurrency: Currency;
  rating?: number;
  ratingCount?: number;
  effects: ProductEffect[];
  category?: ProductCategory;

  imageUrl?: string;
  shopPageUrl?: string;
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

export enum Currency {
  USD = "USD",
  EUR = "EUR",
}

export enum ProductProvider {
  ULTA = "ULTA",
  AMAZON = "AMAZON",
}

export enum ProductCategory {
  MOISTURIZERS = "MOISTURIZERS",
  SUNSCREENS = "SUNSCREENS",
  TREATMENTS = "TREATMENTS",
  CLEANSERS = "CLEANSERS",
  EYE_CREAMS = "EYE_CREAMS",
  FACE_WASHES = "FACE_WASHES",
  EXFOLIATORS = "EXFOLIATORS",
  TONERS = "TONERS",
  FACE_MISTS = "FACE_MISTS",
  FACE_OILS = "FACE_OILS",
  SERUMS = "SERUMS",
  FACE_MASKS = "FACE_MASKS",
  MAKEUP_REMOVERS = "MAKEUP_REMOVERS",
  LIP_CARES = "LIP_CARES",
}

export enum ProductEffect {
  UV_PROTECTING = "UV_PROTECTING",
  ANTI_AGING = "ANTI_AGING",
  BRIGHTENING = "BRIGHTENING",
  ACNE_FIGHTING = "ACNE_FIGHTING",
  HEALING = "HEALING",
}
