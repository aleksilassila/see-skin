import { Prisma } from "@prisma/client";
import {
  Ingredient,
  IngredientClass,
  Product,
  SkinType,
  User,
} from "@prisma/client";
import prisma from "./prisma";

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

interface Result {
  duplicates: ResultDuplicate[];
  skinTypeIrritants: ResultSkinTypeIrritant[];
}

const commonIrritatingClasses = [
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

function getIrritatingIngredientClasses(
  possibleIrritants: Prisma.IngredientGetPayload<{
    include: { aliases: true };
  }>[],
  skinType: SkinType
) {
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

export async function calculateIrritantsResponse(
  ingredientIds: string[],
  productIds: string[],
  skinType: SkinType = SkinType.NORMAL
): Promise<Result> {
  const products =
    (await prisma.product
      .findMany({
        where: {
          id: {
            in: productIds,
          },
        },
        include: {
          ingredients: {
            include: {
              aliases: true,
            },
          },
        },
      })
      .catch(console.error)) || [];

  const productIngredients = products.flatMap((product) => product.ingredients);

  const explicitIngredients =
    (await prisma.ingredient
      .findMany({
        where: {
          id: {
            in: ingredientIds,
          },
        },
        include: {
          aliases: true,
        },
      })
      .then((ingredients) =>
        ingredients.filter((i) =>
          productIngredients.flatMap((i) => i.id).includes(i.id)
        )
      )
      .catch(console.error)) || [];

  const possibleIrritants = [...productIngredients, ...explicitIngredients];

  const duplicates: ResultDuplicate[] = [];
  const checkedIngredientIds: string[] = [];
  for (const ingredient of productIngredients || []) {
    if (
      checkedIngredientIds.includes(ingredient.id) &&
      !duplicates.map((d) => d.ingredient.id).includes(ingredient.id)
    ) {
      const productsContainingIngredient = products.filter((product) =>
        product.ingredients.map((i) => i.id).includes(ingredient.id)
      );

      duplicates.push({
        ingredient,
        products: productsContainingIngredient,
      });
    } else {
      checkedIngredientIds.push(ingredient.id);
    }
  }

  const skinTypeIrritants: ResultSkinTypeIrritant[] = [];
  const irritatingIngredientClasses = getIrritatingIngredientClasses(
    possibleIrritants,
    skinType
  );
  for (const ingredient of possibleIrritants) {
    const irritatingClassesPresent = irritatingIngredientClasses.filter((i) =>
      ingredient.ingredientClasses.includes(i)
    );

    if (irritatingClassesPresent.length === 0) {
      continue;
    }

    skinTypeIrritants.push({
      ingredient,
      ingredientClasses: irritatingClassesPresent,
      skinType,
      products: products.filter((product) =>
        product.ingredients.map((i) => i.id).includes(ingredient.id)
      ),
    });
  }

  return {
    duplicates,
    skinTypeIrritants,
  };
}
