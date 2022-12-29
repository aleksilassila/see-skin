import { Request, Response } from "express";
import prisma from "../prisma";
import { IngredientClass } from "@prisma/client";
import { extractPagination } from "../middleware/parsePagination";

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
