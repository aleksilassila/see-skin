import { NextFunction, Request, Response } from "express";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).send("Access denied");
  }
}

export const requireAuthLevel =
  (level: number) => (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated() && (req?.user as any)?.accessLevel >= level) {
      return next();
    } else {
      res.status(401).send("Access denied");
    }
  };
