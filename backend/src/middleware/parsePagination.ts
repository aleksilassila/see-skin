import { NextFunction, Request, Response } from "express";
import { query, validationResult } from "express-validator";

export function extractPagination(
  req: Request,
  defaultTake = 10
): {
  skip: number;
  take: number;
} {
  if (req.pagination) {
    const take =
      req.pagination.take === "default" ? defaultTake : req.pagination.take;
    return {
      skip: req.pagination.page * take,
      take,
    };
  } else {
    return {
      skip: 0,
      take: defaultTake,
    };
  }
}

export default async function parsePagination(
  req: Request,
  res: Response,
  next: NextFunction
) {
  await query("page").isInt({ min: 0 }).optional().run(req);
  await query("take").isInt({ min: 1, max: 100 }).optional().run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }

  const { page, take } = req.query;

  req.pagination = {
    page: Number(page) || 0,
    take: Number(take) || "default",
  };

  next();
}
