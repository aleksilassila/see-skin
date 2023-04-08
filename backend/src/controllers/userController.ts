import { Request, Response } from "express";
import { SkinType } from "@prisma/client";
import { calculateIrritants } from "../services/irritantCalculator.service";
import prisma from "../prisma";

export async function createSkinProfile(
  req: Request<
    {},
    {},
    {},
    { ingredientIds?: string[]; productIds?: string[]; skinType?: SkinType }
  >,
  res: Response
) {
  const {
    ingredientIds = [],
    productIds = [],
    skinType = SkinType.NORMAL,
  } = req.query;

  const irritants = await calculateIrritants(
    ingredientIds,
    productIds,
    skinType
  ).catch(console.error);

  if (!irritants) {
    res.status(500).send("Internal Server Error");
    return;
  }

  if (req.user) {
    const explicitIrritants = irritants.filter(
      (irritant) =>
        irritant.irritationReasons.filter(
          (reason) => reason.type === "EXPLICITLY_ADDED"
        ).length > 0
    );

    const duplicateIrritants = irritants.filter(
      (irritant) =>
        irritant.irritationReasons.filter(
          (reason) => reason.type === "DUPLICATE"
        ).length > 0
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

    await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        skinProfile: {
          upsert: {
            create: {
              skinType,
              explicitlyAddedProducts: {
                connect: productIds.map((id) => ({ id })),
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
                set: productIds.map((id) => ({ id })),
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
    });
  }

  res.status(200).send(irritants);
}
