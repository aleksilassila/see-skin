import {
  Ingredient,
  Product,
  SkinProfile,
  SkinType,
  User,
  UserWithSkinProfile,
} from "./api-types";

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
        email: string;
        name: string;
      }
    >;
  };
};

type SkinProfileApiTypes = {
  skinProfile: {
    get: ApiTypeOf<SkinProfile>;
    put: ApiTypeOf<
      SkinProfile,
      {
        skinType?: SkinType;
        productIds?: string[];
        ingredientIds?: string[];
      }
    >;
    post: ApiTypeOf<
      SkinProfile,
      {
        skinType?: SkinType;
        productIds?: string[];
        ingredientIds?: string[];
      }
    >;
    delete: ApiTypeOf<
      SkinProfile,
      {
        productIds?: string[];
        ingredientIds?: string[];
      }
    >;
  };
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
  SkinProfileApiTypes &
  ProductApiTypes &
  ManagementApiTypes &
  AuthApiTypes;

const routes: { [Property in keyof ApiTypes]: string } = {
  authLogout: "/auth/logout",
  authVerify: "/auth/verify",
  authGoogle: "/auth/google",
  authGoogleCallback: "/auth/google/callback",

  user: "/user",

  skinProfile: "/skin-profile",

  findProducts: "/products/find",
  productsFeed: "/products/feed",
  productId: "/products/:id",

  productIssues: "/maange/issues/products",
  ingredientIssues: "/manage/issues/ingredients",
};

export default routes;
