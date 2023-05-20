import { Product, SkinProfile, SkinType, User } from "./api-types";

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

type BuildRoute<
  Route extends ApiType["route"],
  Response extends ApiType["response"] = undefined,
  Params extends ApiType["params"] = {},
  Body extends ApiType["body"] = {}
> = {
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
  } & QueryOptions
>;
export type GetProductId = BuildRoute<"/products/:id", Product>;
