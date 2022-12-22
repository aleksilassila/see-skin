import { Request, Response } from "express";
import prisma from "../prisma";
import { extractPagination } from "../middleware/parsePagination";

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

  console.log(products);

  if (!products) {
    res.status(404).send("Not Found");
  }

  res.status(200).send(products);
}
