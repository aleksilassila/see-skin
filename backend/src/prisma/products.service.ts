import { PrismaService } from "./prisma.service";
import { Injectable } from "@nestjs/common";
import { QueryOptions } from "./query-options.decorator";
import { ProductCategory, ProductEffect, User } from "@prisma/client";
import { UsersService } from "./users.service";

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  getProduct(id: string) {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async getProductsWithIngredients(productIds: string[]) {
    return await this.prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
      include: {
        ingredients: {
          include: {
            aliases: true,
          },
        },
      },
    });
  }

  async getProducts(
    user: User | undefined,
    name: string | undefined,
    category: string | undefined,
    effect: string | undefined,
    filterIrritants: boolean | undefined,
    queryOptions: QueryOptions,
  ) {
    const excludedIngredientIds: string[] = [];

    if (user && filterIrritants === true) {
      excludedIngredientIds.push(
        ...this.usersService.getSkinProfileExclusions(
          await this.usersService.getUserWithSkinProfile(user.id),
        ).ingredientIds,
      );
    }

    const categoryEnum = Object.values(ProductCategory).find(
      (k) => ProductCategory[k] === category,
    );

    const effectEnum = Object.values(ProductEffect).find(
      (k) => ProductEffect[k] === effect,
    );

    console.log(category, categoryEnum, effect, effectEnum);

    return this.prisma.product.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
        category: categoryEnum,
        ...(effectEnum && {
          effects: {
            has: effectEnum,
          },
        }),
        ...(filterIrritants === true && {
          ingredients: {
            every: {
              id: {
                notIn: excludedIngredientIds,
              },
            },
          },
        }),
      },
      orderBy: {
        knownToUnknownRatio: "desc",
      },
      ...queryOptions,
    });
  }
}
