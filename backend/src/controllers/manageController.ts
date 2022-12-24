import { Request, Response } from "express";
import prisma from "../prisma";
import { validationResult } from "express-validator";
import parsePagination, {
  extractPagination,
} from "../middleware/parsePagination";

export async function productIssues(req: Request, res: Response) {
  const products = await prisma.product.findMany({});

  res.status(200).send(products);
}

export async function ingredientIssues(req: Request, res: Response) {
  const products = await prisma.ingredient.findMany({
    ...extractPagination(req),
  });

  res.status(200).send(products);
}
