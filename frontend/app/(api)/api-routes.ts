import {
  Ingredient,
  IngredientClass,
  Product,
  SkinType,
  User,
  UserWithSkinProfile,
} from "./types";
import { IrritantsCalculationResponse } from "./solver/fetch-irritants-calculation";

export type ApiType = {
  response: any;
  params?: object;
};

type ApiTypeOf<R = any, P = object> = {
  response: R;
  params: { take?: number; skip?: number } & P;
};

type AuthApiTypes = {
  authLogout: ApiTypeOf;
  authVerify: ApiTypeOf;
  authGoogle: ApiTypeOf;
  authGoogleCallback: ApiTypeOf;
};

type UserApiTypes = {
  user: {
    get: ApiTypeOf<UserWithSkinProfile>;
    put: ApiTypeOf<
      User,
      {
        irritativeIngredientIds: string[];
        irritativeProductIds: string[];
        irritantIds: string[];
        irritativeClasses: IngredientClass[];
        skinType: SkinType;
        email: string;
        name: string;
      }
    >;
  };
  createSkinProfile: ApiTypeOf<
    IrritantsCalculationResponse,
    {
      skinType: SkinType;
      productIds: string[];
      ingredientIds: string[];
    }
  >;
};

type ProductApiTypes = {
  findProducts: ApiTypeOf<Product[], { name: string }>;
  productsFeed: ApiTypeOf<
    Product[],
    {
      name?: string;
      page: number;
      filterIrritants?: boolean;
    }
  >;
  productId: {
    get: ApiTypeOf<Product>;
  };
};

type ManagementApiTypes = {
  productIssues: ApiTypeOf<Product[]>;
  ingredientIssues: ApiTypeOf<Ingredient[]>;
};

export type ApiTypes = UserApiTypes &
  ProductApiTypes &
  ManagementApiTypes &
  AuthApiTypes;

const routes: { [Property in keyof ApiTypes]: string } = {
  authLogout: "/auth/logout",
  authVerify: "/auth/verify",
  authGoogle: "/auth/google",
  authGoogleCallback: "/auth/google/callback",

  user: "/user",
  createSkinProfile: "/user/create-skin-profile",

  findProducts: "/products/find",
  productsFeed: "/products/feed",
  productId: "/products/:id",

  productIssues: "/maange/issues/products",
  ingredientIssues: "/manage/issues/ingredients",
};

export default routes;
