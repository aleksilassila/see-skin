import { NextFunction, Request, Response } from "express";
import { query, validationResult } from "express-validator";

export function extractPagination(req: Request):
  | {}
  | {
      skip: number;
      take: number;
    } {
  if (req.pagination) {
    return {
      skip: req.pagination.page * req.pagination.take,
      take: req.pagination.take,
    };
  }

  return {};
}

export default async function requirePagination(
  req: Request,
  res: Response,
  next: NextFunction
) {
  await query("page").isInt({ min: 0 }).optional().run(req);
  await query("take").isInt({ min: 1, max: 100 }).optional().run(req);

  if (!validationResult(req).isEmpty()) {
    return res.status(400).send("Bad Request");
  }

  const { page, take } = req.query;

  req.pagination = {
    page: Number(page) || 0,
    take: Number(take) || 10,
  };

  next();
}
