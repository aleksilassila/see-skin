import {
  Product,
  ProductCategory,
  ProductEffect,
  SkinProfile,
  SkinType,
  User,
} from "./api-types";

type QueryOptions = {
  take?: number;
  skip?: number;
};

export type ApiType = {
  route: string;
  response: any;
  params?: object;
  body?: object;
};

export type BuildRoute<Route, Response = undefined, Params = {}, Body = {}> = {
  route: Route;
  response: Response;
  params: Params;
  body: Body;
};

export type AuthLogout = BuildRoute<"/auth/logout">;
export type AuthVerify = BuildRoute<"/auth/verify">;
export type AuthGoogle = BuildRoute<"/auth/google">;
export type AuthGoogleCallback = BuildRoute<"/auth/google/callback">;

export type GetUser = BuildRoute<"/user", User>;
export type DeleteUser = BuildRoute<"/user", User>;
export type PutUser = BuildRoute<
  "/user",
  User,
  {},
  {
    name?: string;
    email?: string;
  }
>;

export type GetSkinProfile = BuildRoute<"/skin-profile", SkinProfile>;
export type PutSkinProfile = BuildRoute<
  "/skin-profile",
  SkinProfile,
  {},
  {
    skinType?: SkinType;
    productIds?: string[];
    ingredientIds?: string[];
  }
>;
export type PostSkinProfile = BuildRoute<
  "/skin-profile",
  SkinProfile,
  {},
  {
    skinType?: SkinType;
    productIds?: string[];
    ingredientIds?: string[];
  }
>;
export type DeleteSkinProfile = BuildRoute<
  "/skin-profile",
  SkinProfile,
  {},
  {
    skinType?: SkinType;
    productIds?: string[];
    ingredientIds?: string[];
  }
>;

export type GetProducts = BuildRoute<
  "/products",
  Product[],
  {
    name?: string;
    filterIrritants?: boolean;
    category?: ProductCategory;
    effect?: ProductEffect;
  } & QueryOptions
>;
export type GetProductId = BuildRoute<"/products/:id", Product>;
