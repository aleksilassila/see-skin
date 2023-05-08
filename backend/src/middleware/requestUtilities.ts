import { Request } from "express";
import { UserWithSkinProfile } from "../types/prisma";
import { getUserWithSkinProfile } from "../services/user.service";

export async function getUser(req: Request): Promise<UserWithSkinProfile> {
  if (!req.user?.id) {
    throw new Error("Unauthenticated");
  }

  const user = await getUserWithSkinProfile(req.user.id);

  if (!user) {
    throw new Error("Unauthenticated");
  }

  return user;
}
