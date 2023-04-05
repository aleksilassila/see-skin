import { Prisma } from "@prisma/client";

export type UserWithSkinProfile = Prisma.UserGetPayload<{
  include: {
    skinProfile: {
      include: {
        explicitlyAddedProductIrritants: true;
        explicitlyAddedIrritants: true;
        duplicateIrritants: true;
        skinTypeClassIrritants: true;
      };
    };
  };
}>;
