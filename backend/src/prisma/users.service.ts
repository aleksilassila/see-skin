import { PrismaService } from "./prisma.service";
import { Injectable } from "@nestjs/common";
import { UpdateUserDto } from "../users/dto/update-user.dto";
import { UserWithSkinProfile } from "../types/prisma";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getUserWithSkinProfile(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        skinProfile: {
          include: {
            explicitlyAddedProducts: true,
            explicitlyAddedIrritants: true,
            duplicateIrritants: true,
            skinTypeClassIrritants: true,
            commonClassIrritants: true,
          },
        },
      },
    });
  }

  async updateUser(id: any, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  getSkinProfileExclusions(user?: UserWithSkinProfile) {
    const ingredientIds: string[] = [];
    const productIds: string[] = [];

    if (user && user.skinProfile) {
      const profile = user.skinProfile;
      ingredientIds.push(...profile.duplicateIrritants.map((i) => i.id));
      ingredientIds.push(...profile.explicitlyAddedIrritants.map((i) => i.id));
      ingredientIds.push(...profile.skinTypeClassIrritants.map((i) => i.id));
      productIds.push(...profile.explicitlyAddedProducts.map((i) => i.id));
    }

    return { ingredientIds, productIds };
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
