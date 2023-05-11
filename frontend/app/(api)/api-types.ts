// Prisma types from backend Prisma Client

/**
 * Model Product
 *
 */
export type Product = {
  id: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  priceBeforeDiscount: number | null;
  priceCurrency: Currency;
  rating: number | null;
  ratingCount: number | null;
  effects: ProductEffect[];
  category: ProductCategory | null;
  imageUrl: string | null;
  shopPageUrl: string | null;
  provider: ProductProvider | null;
  ingredientsString: string;
  unknownIngredients: string[];
  knownToUnknownRatio: number;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Model Ingredient
 *
 */
export type Ingredient = {
  id: string;
  name: string;
  cosingRef: number;
  description: string;
  function: string;
  ingredientClasses: IngredientClass[];
  updatedAt: Date;
  createdAt: Date;
};

/**
 * Model IngredientAlias
 *
 */
export type IngredientAlias = {
  id: string;
  name: string;
  ingredientId: string;
};

/**
 * Model User
 *
 */
export type User = {
  id: string;
  googleId: string | null;
  email: string;
  password: string | null;
  name: string;
  accessLevel: number;
  logoutAt: Date | null;
  preferredProviders: ProductProvider[];
};

/**
 * Model SkinProfile
 *
 */
export type SkinProfile = {
  id: string;
  userId: string;
  skinType: SkinType;
} & {
  explicitlyAddedProducts?: Product[];
  explicitlyAddedIrritants?: Ingredient[];
  duplicateIrritants?: Ingredient[];
  skinTypeClassIrritants?: Ingredient[];
};

export enum Currency {
  USD = "USD",
  EUR = "EUR",
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

export enum ProductProvider {
  ULTA = "ULTA",
  AMAZON = "AMAZON",
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

// Types with includes

export type IngredientWithAliases = Ingredient & {
  aliases: IngredientAlias[];
};

export type ProductWithIngredients = Product & {
  ingredients: IngredientWithAliases[];
};

export type UserWithSkinProfile = User & {
  skinProfile:
    | (SkinProfile & {
        explicitlyAddedProducts: ProductWithIngredients[];
        explicitlyAddedIrritants: IngredientWithAliases[];
        duplicateIrritants: IngredientWithAliases[];
        skinTypeClassIrritants: IngredientWithAliases[];
      })
    | null;
};
