import { Request, Response } from "express";
import prisma from "../prisma";

export async function calculateIrritants(
  req: Request<{}, {}, {}, { ingredientIds: string[]; productIds: string[] }>,
  res: Response
) {
  const { ingredientIds = [], productIds = [] } = req.query;

  const allIngredients = await prisma.product
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
    .then((products) => products.flatMap((product) => product.ingredients))
    .catch(console.error);

  const duplicateIngredients = [];
  const checkedIngredientIds: string[] = [];

  for (const ingredient of allIngredients || []) {
    if (checkedIngredientIds.includes(ingredient.id)) {
      duplicateIngredients.push(ingredient);
    } else {
      checkedIngredientIds.push(ingredient.id);
    }
  }

  res.status(200).send(duplicateIngredients);
}
