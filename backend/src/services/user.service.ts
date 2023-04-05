import { UserWithSkinProfile } from "../types/prisma";
import prisma from "../prisma";

export function getIrritantIds(user?: UserWithSkinProfile): string[] {
  const irritantIds: string[] = [];

  console.log("SkinProfile of provided user", user);

  if (user && user.skinProfile) {
    const profile = user.skinProfile;
    irritantIds.push(...profile.duplicateIrritants.map((i) => i.id));
    irritantIds.push(...profile.explicitlyAddedIrritants.map((i) => i.id));
    irritantIds.push(...profile.skinTypeClassIrritants.map((i) => i.id));
  }

  return irritantIds;
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
              explicitlyAddedProductIrritants: true,
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
