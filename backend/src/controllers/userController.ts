import { Request, Response } from "express";
import { SkinType } from "@prisma/client";
import { calculateIrritantsResponse } from "../services/irritantCalculator.service";
import prisma from "../prisma";

export async function calculateIrritants(
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

  const response = await calculateIrritantsResponse(
    ingredientIds,
    productIds,
    skinType
  ).catch(console.error);

  if (!response) {
    res.status(500).send("Internal Server Error");
    return;
  }

  if (req.user) {
    const explicitIrritants = response.filter(
      (irritant) =>
        irritant.irritationReasons.filter(
          (reason) => reason.type === "EXPLICITLY_ADDED"
        ).length > 0
    );

    const duplicateIrritants = response.filter(
      (irritant) =>
        irritant.irritationReasons.filter(
          (reason) => reason.type === "DUPLICATE"
        ).length > 0
    );

    const skinTypeClassIrritants = response.filter(
      (irritant) =>
        irritant.irritationReasons.filter(
          (reason: any) => reason["reason"] === "SKIN_TYPE_IRRITANT"
        ).length > 0
    );

    const commonClassIrritants = response.filter(
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
              explicitlyAddedProductIrritants: {
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
              explicitlyAddedProductIrritants: {
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

  res.status(200).send(response);
}
