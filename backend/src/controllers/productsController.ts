import { Request, Response } from "express";
import prisma from "../prisma";
import { extractPagination } from "../middleware/parsePagination";
import { getSkinProfileExclusions } from "../services/user.service";

export async function find(
  req: Request<{}, {}, {}, { name: string }>,
  res: Response
) {
  const { name } = req.query;

  const products = await prisma.product
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

  if (!products) {
    res.status(404).send("Not Found");
  }

  res.status(200).send(products);
}

export async function getFeed(
  req: Request<{}, {}, {}, { name?: string; filterIrritants?: string }>,
  res: Response
) {
  const { name, filterIrritants } = req.query;

  const profileExclusions = getSkinProfileExclusions(req.user);

  const products = await prisma.product
    .findMany({
      where: {
        ...(name && {
          name: {
            contains: name,
            mode: "insensitive",
          },
        }),
        ...(filterIrritants === "true" && {
          ingredients: {
            every: {
              id: {
                notIn: profileExclusions.ingredientIds,
              },
            },
          },
          id: {
            notIn: profileExclusions.productIds,
          },
        }),
      },
      ...extractPagination(req as Request),
    })
    .catch(console.error);

  if (!products) {
    res.status(500).send("Could not fetch products");
  }

  res.status(200).send(products);
}

export async function get(req: Request, res: Response) {
  const { id } = req.params;

  const product = await prisma.product
    .findUnique({
      where: {
        id,
      },
    })
    .catch(console.error);

  if (!product) {
    res.status(404).send("Not Found");
  }

  res.status(200).send(product);
}
