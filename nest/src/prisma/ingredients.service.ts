import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IngredientsService {
  constructor(private readonly prisma: PrismaService) {}

  async getIngredientsWithAliases(ingredientIds: string[]) {
    return await this.prisma.ingredient.findMany({
      where: {
        id: {
          in: ingredientIds,
        },
      },
      include: {
        aliases: true,
      },
    });
  }
}
