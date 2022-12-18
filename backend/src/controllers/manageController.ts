import { Request, Response } from "express";
import prisma from "../prisma";
import { validationResult } from "express-validator";

export async function productIssues(req: Request, res: Response) {
  const products = await prisma.product.findMany({});

  res.status(200).send(products);
}

export async function ingredientIssues(req: Request, res: Response) {
  const { take = 20, page = 0 } = req.query;

  const products = await prisma.ingredient.findMany({
    take: take ? Number(take) : 10,
    skip: page ? Number(page) * Number(take) : 0,
  });

  res.status(200).send(products);
}
