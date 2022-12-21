import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      pagination?: {
        page: number;
        take: number;
      };
    }
  }
}
