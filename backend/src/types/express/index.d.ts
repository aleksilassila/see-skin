import { User as PrismaUser } from "@prisma/client";
import * as express from "express"; // This is required for the overwrite to work apparently
import { UserWithSkinProfile } from "../prisma";

express;

declare global {
  namespace Express {
    interface Request {
      pagination?: {
        page: number;
        take: number | "default";
      };
    }

    interface User extends UserWithSkinProfile {}
  }
}
