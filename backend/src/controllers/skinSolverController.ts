import { Request, Response } from "express";
import prisma from "../prisma";

export async function calculateIrritants(req: Request, res: Response) {
  const {
    ingredientIds = [],
    productIds = [],
  }: {
    ingredientIds: string[];
    productIds: string[];
  } = req.body;

  const allIngredientGroups = await prisma.product
    .findMany({
      where: {
        id: {
          in: productIds,
        },
      },
      include: {
        ingredientGroups: {
          include: {
            ingredientGroup: {
              include: {
                ingredients: true,
              },
            },
          },
        },
      },
    })
    .then((products) =>
      products.flatMap((product) =>
        product.ingredientGroups.flatMap((group) => group.ingredientGroup)
      )
    )
    .catch(console.error);

  const duplicateIngredientGroups = [];
  const checkedIngredientGroupIds: string[] = [];

  for (const ingredientGroup of allIngredientGroups || []) {
    if (checkedIngredientGroupIds.includes(ingredientGroup.id)) {
      duplicateIngredientGroups.push(ingredientGroup);
    } else {
      checkedIngredientGroupIds.push(ingredientGroup.id);
    }
  }

  res.status(200).send(duplicateIngredientGroups);
}
