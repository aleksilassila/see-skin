import { Injectable } from "@nestjs/common";
import { Ingredient, IngredientClass, SkinType } from "@prisma/client";
import {
  commonIrritatingClasses,
  IngredientClassIrritationReason,
} from "./skin-profile.service";
import { IngredientWithAliases } from "../types/prisma";

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

@Injectable()
export class SkinClassService {
  getIngredientClassReasons(
    ingredient: Ingredient,
    irritatingClasses: IngredientClass[],
  ): IngredientClassIrritationReason[] {
    const irritatingClassesPresent = irritatingClasses.filter(
      (ingredientClass) =>
        ingredient.ingredientClasses.includes(ingredientClass),
    );

    return irritatingClassesPresent.map((ingredientClass) => ({
      type: "CLASS_IRRITANT",
      reason: commonIrritatingClasses.includes(ingredientClass)
        ? "COMMON_IRRITANT"
        : "SKIN_TYPE_IRRITANT",
      ingredientClass: ingredientClass,
    }));
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
  getIrritatingIngredientClasses(
    possibleIrritants: IngredientWithAliases[],
    skinType: SkinType,
  ): IngredientClass[] {
    const irritatingIngredientClasses: IngredientClass[] = ["SINGLE_IRRITANT"];

    for (const ingredient of possibleIrritants) {
      const commonIrritantClassesPresent = commonIrritatingClasses.filter((i) =>
        ingredient.ingredientClasses.includes(i),
      );

      commonIrritantClassesPresent.forEach((i) => {
        if (!irritatingIngredientClasses.includes(i)) {
          irritatingIngredientClasses.push(i);
        }
      });
    }

    irritatingIngredientClasses.push(...skinTypeIrritatingClasses[skinType]);
    return [...new Set(irritatingIngredientClasses)];
  }
}
