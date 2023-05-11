import { Request, Response } from "express";
import { Ingredient, Product, SkinType } from "@prisma/client";
import { calculateIrritants } from "../services/irritantCalculator.service";
import prisma from "../prisma";
import { IngredientWithAliases, ProductWithIngredients } from "../types/prisma";
import { getUser } from "../middleware/requestUtilities";

type UpdateFunctionData = {
  filteredIngredients: Ingredient[];
  irritatingProducts: Product[];
  skinType: SkinType;
};

export const setSkinProfile = (
  updateFunction: (
    oldData: UpdateFunctionData,
    newData: Partial<UpdateFunctionData>
  ) => UpdateFunctionData
) =>
  async function (
    req: Request<
      {},
      {},
      {},
      {
        ingredientIds?: string[];
        productIds?: string[];
        skinType?: SkinType;
      }
    >,
    res: Response
  ) {
    const { ingredientIds, productIds, skinType } = req.query;

    const user = await getUser(req);

    const filteredIngredients = await getIngredientsWithAliases(
      ingredientIds ||
        user.skinProfile?.explicitlyAddedIrritants.map((i) => i.id) ||
        []
    );

    const irritatingProducts = await getProductsWithIngredients(
      productIds ||
        user.skinProfile?.explicitlyAddedProducts.map((p) => p.id) ||
        []
    );

    const toSet = updateFunction(
      {
        filteredIngredients: user.skinProfile?.explicitlyAddedIrritants || [],
        irritatingProducts: user.skinProfile?.explicitlyAddedProducts || [],
        skinType: user.skinProfile?.skinType || SkinType.NORMAL,
      },
      { filteredIngredients, irritatingProducts, skinType }
    );

    const updated = await updateSkinProfile(
      user.id,
      toSet.skinType,
      await getIngredientsWithAliases(
        toSet.filteredIngredients.map((i) => i.id)
      ),
      await getProductsWithIngredients(
        toSet.irritatingProducts.map((p) => p.id)
      )
    ).then((u) => u?.skinProfile);

    res.status(200).send(updated);
  };

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
        include: {
          skinProfile: {
            include: {
              explicitlyAddedProducts: true,
              explicitlyAddedIrritants: true,
              duplicateIrritants: true,
              skinTypeClassIrritants: true,
              commonClassIrritants: true,
            },
          },
        },
      })
      .catch(console.error)) || undefined
  );
}

async function getIngredientsWithAliases(ingredientIds: string[]) {
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

async function getProductsWithIngredients(productIds: string[]) {
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
