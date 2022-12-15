import { Request, Response } from "express";
import prisma from "../prisma";

export async function productIssues(req: Request, res: Response) {
  const products = await prisma.product.findMany({});

  res.status(200).send(products);
}
