import * as express from "express"; // This is required for the overwrite to work apparently

declare global {
  namespace Express {
    interface Request {
      pagination?: {
        page: number;
        take: number | "default";
      };
    }
  }
}
