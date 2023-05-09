import { Request, Response } from "express";
import { SkinType } from "@prisma/client";
import { calculateIrritants } from "../services/irritantCalculator.service";
import prisma from "../prisma";
import { IngredientWithAliases, ProductWithIngredients } from "../types/prisma";
import { getUser } from "../middleware/requestUtilities";

export async function setSkinProfile(
  req: Request<
    {},
    {},
    {},
    {
      filteredIngredientIds?: string[];
      irritatingProductIds?: string[];
      skinType?: SkinType;
    }
  >,
  res: Response
) {
  const { filteredIngredientIds, irritatingProductIds, skinType } = req.query;

  const user = await getUser(req);

  const filteredIngredients = await getFilteredIngredients(
    filteredIngredientIds ||
      user.skinProfile?.explicitlyAddedIrritants.map((i) => i.id) ||
      []
  );

  const irritatingProducts = await getIrritatingProducts(
    irritatingProductIds ||
      user.skinProfile?.explicitlyAddedProducts.map((p) => p.id) ||
      []
  );

  const updated = updateSkinProfile(
    user.id,
    skinType || user.skinProfile?.skinType || SkinType.NORMAL,
    filteredIngredients,
    irritatingProducts
  );

  res.status(200).send(updated);
}

async function updateSkinProfile(
  userId: string,
  skinType: SkinType,
  filteredIngredients: IngredientWithAliases[],
  irritatingProducts: ProductWithIngredients[]
) {
  const irritants = await calculateIrritants(
    skinType,
    filteredIngredients,
    irritatingProducts
  );

  const explicitIrritants = irritants.filter(
    (irritant) =>
      irritant.irritationReasons.filter(
        (reason) => reason.type === "EXPLICITLY_ADDED"
      ).length > 0
  );

  const duplicateIrritants = irritants.filter(
    (irritant) =>
      irritant.irritationReasons.filter((reason) => reason.type === "DUPLICATE")
        .length > 0
  );

  const skinTypeClassIrritants = irritants.filter(
    (irritant) =>
      irritant.irritationReasons.filter(
        (reason: any) => reason["reason"] === "SKIN_TYPE_IRRITANT"
      ).length > 0
  );

  const commonClassIrritants = irritants.filter(
    (irritant) =>
      irritant.irritationReasons.filter(
        (reason: any) => reason["reason"] === "COMMON_IRRITANT"
      ).length > 0
  );

  return (
    (await prisma.user
      .update({
        where: {
          id: userId,
        },
        data: {
          skinProfile: {
            upsert: {
              create: {
                skinType,
                explicitlyAddedProducts: {
                  connect: irritatingProducts.map((product) => ({
                    id: product.id,
                  })),
                },

                explicitlyAddedIrritants: {
                  connect: explicitIrritants.map((i) => ({
                    id: i.ingredient.id,
                  })),
                },
                duplicateIrritants: {
                  connect: duplicateIrritants.map((i) => ({
                    id: i.ingredient.id,
                  })),
                },
                skinTypeClassIrritants: {
                  connect: skinTypeClassIrritants.map((i) => ({
                    id: i.ingredient.id,
                  })),
                },
                commonClassIrritants: {
                  connect: commonClassIrritants.map((i) => ({
                    id: i.ingredient.id,
                  })),
                },
              },
              update: {
                skinType,
                explicitlyAddedProducts: {
                  set: irritatingProducts.map((product) => ({
                    id: product.id,
                  })),
                },

                explicitlyAddedIrritants: {
                  set: explicitIrritants.map((i) => ({
                    id: i.ingredient.id,
                  })),
                },
                duplicateIrritants: {
                  set: duplicateIrritants.map((i) => ({
                    id: i.ingredient.id,
                  })),
                },
                skinTypeClassIrritants: {
                  set: skinTypeClassIrritants.map((i) => ({
                    id: i.ingredient.id,
                  })),
                },
                commonClassIrritants: {
                  set: commonClassIrritants.map((i) => ({
                    id: i.ingredient.id,
                  })),
                },
              },
            },
          },
        },
      })
      .catch(console.error)) || undefined
  );
}

async function getFilteredIngredients(ingredientIds: string[]) {
  return await prisma.ingredient.findMany({
    where: {
      id: {
        in: ingredientIds,
      },
    },
    include: {
      aliases: true,
    },
  });
}

async function getIrritatingProducts(productIds: string[]) {
  return await prisma.product.findMany({
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
  });
}
