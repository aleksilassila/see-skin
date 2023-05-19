import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';
import { QueryOptions } from './query-options.decorator';
import { User } from '@prisma/client';
import { UsersService } from './users.service';

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
    name: string | undefined,
    user: User | undefined,
    filterIrritants: boolean | undefined,
    queryOptions: QueryOptions,
  ) {
    const excludedIngredientIds = [];

    if (user && filterIrritants === true) {
      excludedIngredientIds.push(
        this.usersService.getSkinProfileExclusions(
          await this.usersService.getUserWithSkinProfile(user.id),
        ),
      );
    }

    return this.prisma.product.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
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
        knownToUnknownRatio: 'desc',
      },
      ...queryOptions,
    });
  }
}
