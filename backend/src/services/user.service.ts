import { UserWithSkinProfile } from "../types/prisma";
import prisma from "../prisma";

export function getSkinProfileExclusions(user?: UserWithSkinProfile): {
  ingredientIds: string[];
  productIds: string[];
} {
  const ingredientIds: string[] = [];
  const productIds: string[] = [];

  console.log("SkinProfile of provided user", user);

  if (user && user.skinProfile) {
    const profile = user.skinProfile;
    ingredientIds.push(...profile.duplicateIrritants.map((i) => i.id));
    ingredientIds.push(...profile.explicitlyAddedIrritants.map((i) => i.id));
    ingredientIds.push(...profile.skinTypeClassIrritants.map((i) => i.id));
    productIds.push(...profile.explicitlyAddedProducts.map((i) => i.id));
  }

  return { ingredientIds, productIds };
}

export async function getUserWithSkinProfile(
  id: string
): Promise<UserWithSkinProfile | null> {
  return (
    (await prisma.user
      .findUnique({
        where: { id },
        include: {
          skinProfile: {
            include: {
              explicitlyAddedProducts: true,
              explicitlyAddedIrritants: true,
              duplicateIrritants: true,
              skinTypeClassIrritants: true,
            },
          },
        },
      })
      .catch(console.error)) || null
  );
}
