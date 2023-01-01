import { Request, Response } from "express";
import prisma from "../prisma";
import { IngredientClass, SkinType } from "@prisma/client";
import { extractPagination } from "../middleware/parsePagination";
import { calculateIrritantsResponse } from "../irritantCalculator";

export async function get(req: Request, res: Response) {
  const { groupId, id } = req.body;

  const ingredients = await prisma.ingredient
    .findMany({
      where: {
        OR: [
          // {
          //   groupId,
          // },
          {
            id,
          },
        ],
      },
    })
    .catch((ignored) => undefined);

  if (!ingredients || ingredients?.length === 0) {
    res.status(404).send("Not Found");
    return;
  }

  res.send(ingredients);
}

export async function find(
  req: Request<{}, {}, {}, { name: string }>,
  res: Response
) {
  const { name } = req.query;

  const ingredients = await prisma.ingredient
    .findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
      ...extractPagination(req),
    })
    .catch(console.error);

  if (!ingredients) {
    res.status(404).send("Not Found");
  }

  res.status(200).send(ingredients);
}

export async function update(
  req: Request<{ id: string }, {}, { ingredientClasses: IngredientClass[] }>,
  res: Response
) {
  const { id } = req.params;
  const { ingredientClasses } = req.body;

  const ingredient = await prisma.ingredient
    .update({
      where: {
        id,
      },
      data: {
        ingredientClasses,
      },
    })
    .catch(console.error);

  if (!ingredient) {
    res.status(404).send("Not Found");
  }

  res.status(200).send(ingredient);
}

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
    await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        didSetupProfile: true,
      },
    });
  }

  res.status(200).send(response);
}
