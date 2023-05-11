import { Prisma } from "@prisma/client";

export type UserWithSkinProfile = Prisma.UserGetPayload<{
  include: {
    skinProfile: {
      include: {
        explicitlyAddedProducts: true;
        explicitlyAddedIrritants: true;
        duplicateIrritants: true;
        skinTypeClassIrritants: true;
      };
    };
  };
}>;
export type ProductWithIngredients = Prisma.ProductGetPayload<{
  include: {
    ingredients: {
      include: { aliases: true };
    };
  };
}>;
export type IngredientWithAliases = Prisma.IngredientGetPayload<{
  include: { aliases: true };
}>;

export type SkinProfileFull = Prisma.SkinProfileGetPayload<{
  include: {
    explicitlyAddedProducts: true;
    explicitlyAddedIrritants: true;
    duplicateIrritants: true;
    skinTypeClassIrritants: true;
  };
}>;
