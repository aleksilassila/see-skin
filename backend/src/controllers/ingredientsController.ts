import { Request, Response } from "express";
import prisma from "../prisma";

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
