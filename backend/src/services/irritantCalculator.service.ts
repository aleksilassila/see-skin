import { Ingredient, IngredientClass, Product, SkinType } from "@prisma/client";
import { IngredientWithAliases, ProductWithIngredients } from "../types/prisma";

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

const commonIrritatingClasses: IngredientClass[] = [
  IngredientClass.ALCOHOL,
  IngredientClass.FUNGAL_ACNE_TRIGGER,
  IngredientClass.PARABEN,
  IngredientClass.SULFATE,
];

const skinTypeIrritatingClasses = {
  [SkinType.DRY]: [IngredientClass.DRY_IRRITANT],
  [SkinType.OILY]: [IngredientClass.OILY_IRRITANT],
  [SkinType.COMBINATION]: [
    IngredientClass.DRY_IRRITANT,
    IngredientClass.OILY_IRRITANT,
  ],
  [SkinType.DRY_SENSITIVE]: [
    IngredientClass.DRY_IRRITANT,
    IngredientClass.SENSITIVE_IRRITANT,
  ],
  [SkinType.OILY_SENSITIVE]: [
    IngredientClass.OILY_IRRITANT,
    IngredientClass.SENSITIVE_IRRITANT,
  ],
  [SkinType.COMBINATION_SENSITIVE]: [
    IngredientClass.DRY_IRRITANT,
    IngredientClass.OILY_IRRITANT,
    IngredientClass.SENSITIVE_IRRITANT,
  ],
  [SkinType.NORMAL_SENSITIVE]: [IngredientClass.SENSITIVE_IRRITANT],
  [SkinType.NORMAL]: [],
};

/**
 * @param skinType User skin type
 * @param filteredIngredients A list of known irritating ingredients
 * @param explicitlyAddedProducts A list of products that the user has explicitly added
 * @return A list of irritant ingredients
 */
export async function calculateIrritants(
  skinType: SkinType = SkinType.NORMAL,
  filteredIngredients: IngredientWithAliases[],
  explicitlyAddedProducts: ProductWithIngredients[]
): Promise<Irritant[]> {
  const productIngredients = explicitlyAddedProducts.flatMap(
    (product) => product.ingredients
  );

  const irritatingIngredientClasses = getIrritatingIngredientClasses(
    [...productIngredients, ...filteredIngredients],
    skinType
  );

  const allUniqueIngredients = getUniqueIngredients(
    filteredIngredients,
    productIngredients
  );

  return allUniqueIngredients
    .map((ingredient) => {
      const irritationReasons: IrritationReason[] = [];
      const duplicateReason = getDuplicateReason(
        ingredient,
        explicitlyAddedProducts
      );
      const ingredientClassReasons = getIngredientClassReasons(
        ingredient,
        irritatingIngredientClasses
      );
      const explicitlyAddedReason: ExplicitlyAddedIrritantReason[] =
        filteredIngredients
          .filter((i) => i.id === ingredient.id)
          .map((ingredient) => ({ type: "EXPLICITLY_ADDED", ingredient }));

      if (duplicateReason) irritationReasons.push(duplicateReason);
      irritationReasons.push(...ingredientClassReasons);
      irritationReasons.push(...explicitlyAddedReason);

      return {
        ingredient,
        irritationReasons,
      };
    })
    .filter((irritant) => irritant.irritationReasons.length > 0);
}

/**
 * A function that takes all possible irritating ingredients and tries to guess
 * what ingredient classes cause irritation.
 * @returns IngredientClasses that
 *          a) are common irritants and are present or
 *          b) are skin type specific irritants
 * @param possibleIrritants List of ingredients that may be irritating
 * @param skinType User's skin type
 */
function getIrritatingIngredientClasses(
  possibleIrritants: IngredientWithAliases[],
  skinType: SkinType
): IngredientClass[] {
  const irritatingIngredientClasses: IngredientClass[] = [];

  for (const ingredient of possibleIrritants) {
    const commonIrritantClassesPresent = commonIrritatingClasses.filter((i) =>
      ingredient.ingredientClasses.includes(i)
    );

    commonIrritantClassesPresent.forEach((i) => {
      if (!irritatingIngredientClasses.includes(i)) {
        irritatingIngredientClasses.push(i);
      }
    });
  }

  irritatingIngredientClasses.push(...skinTypeIrritatingClasses[skinType]);
  return irritatingIngredientClasses;
}

function getUniqueIngredients(...ingredients: Ingredient[][]): Ingredient[] {
  const allIngredients = ingredients.flatMap((i) => i);

  return allIngredients.filter(
    (value, index, self) => index === self.findIndex((t) => t.id === value.id)
  );
}

function getDuplicateReason(
  ingredient: Ingredient,
  products: ProductWithIngredients[]
): DuplicateIrritationReason | null {
  const productsWithIngredient = products.filter((product) => {
    return product.ingredients.map((i) => i.id).includes(ingredient.id);
  });

  if (productsWithIngredient.length) {
    return {
      type: "DUPLICATE",
      products: productsWithIngredient,
    };
  } else return null;
}

function getIngredientClassReasons(
  ingredient: Ingredient,
  irritatingClasses: IngredientClass[]
): IngredientClassIrritationReason[] {
  const irritatingClassesPresent = irritatingClasses.filter((ingredientClass) =>
    ingredient.ingredientClasses.includes(ingredientClass)
  );

  return irritatingClassesPresent.map((ingredientClass) => ({
    type: "CLASS_IRRITANT",
    reason: commonIrritatingClasses.includes(ingredientClass)
      ? "COMMON_IRRITANT"
      : "SKIN_TYPE_IRRITANT",
    ingredientClass: ingredientClass,
  }));
}
