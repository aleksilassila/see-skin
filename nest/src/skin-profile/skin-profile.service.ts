import { Injectable } from '@nestjs/common';
import { UsersService } from '../prisma/users.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  Ingredient,
  IngredientClass,
  Product,
  SkinType,
  User,
} from '@prisma/client';
import { IngredientWithAliases, ProductWithIngredients } from '../types/prisma';
import { IngredientsService } from '../prisma/ingredients.service';
import { ProductsService } from '../prisma/products.service';
import { SkinClassService } from './skin-class.service';

type UpdateFunctionData = {
  filteredIngredients: Ingredient[];
  irritatingProducts: Product[];
  skinType: SkinType;
};

type IrritationReason = {
  type: string;
} & (
  | DuplicateIrritationReason
  | IngredientClassIrritationReason
  | ExplicitlyAddedIrritantReason
);

interface DuplicateIrritationReason {
  type: 'DUPLICATE';
  products: Product[];
}

export interface IngredientClassIrritationReason {
  type: 'CLASS_IRRITANT';
  reason: 'COMMON_IRRITANT' | 'SKIN_TYPE_IRRITANT';
  ingredientClass: IngredientClass;
}

interface ExplicitlyAddedIrritantReason {
  type: 'EXPLICITLY_ADDED';
  ingredient: Ingredient;
}

interface Irritant {
  ingredient: Ingredient;
  irritationReasons: IrritationReason[];
}

export const commonIrritatingClasses: IngredientClass[] = [
  IngredientClass.ALCOHOL,
  IngredientClass.FUNGAL_ACNE_TRIGGER,
  IngredientClass.PARABEN,
  IngredientClass.SULFATE,
];

@Injectable()
export class SkinProfileService {
  constructor(
    private usersService: UsersService,
    private productsService: ProductsService,
    private ingredientsService: IngredientsService,
    private skinClassService: SkinClassService,
    private prisma: PrismaService,
  ) {}

  getSkinProfile(id: string) {
    return this.usersService
      .getUserWithSkinProfile(id)
      .then((user) => user.skinProfile);
  }

  async setSkinProfile(
    updateFunction: (
      oldData: UpdateFunctionData,
      newData: Partial<UpdateFunctionData>,
    ) => UpdateFunctionData,
    userr: User,
    ingredientIds?: string[],
    productIds?: string[],
    skinType?: SkinType,
  ) {
    const skinProfile = await this.getSkinProfile(userr.id);

    const filteredIngredients =
      await this.ingredientsService.getIngredientsWithAliases(
        ingredientIds ||
          skinProfile?.explicitlyAddedIrritants.map((i) => i.id) ||
          [],
      );

    const irritatingProducts =
      await this.productsService.getProductsWithIngredients(
        productIds ||
          skinProfile?.explicitlyAddedProducts.map((p) => p.id) ||
          [],
      );

    const toSet = updateFunction(
      {
        filteredIngredients: skinProfile?.explicitlyAddedIrritants || [],
        irritatingProducts: skinProfile?.explicitlyAddedProducts || [],
        skinType: skinProfile?.skinType || SkinType.NORMAL,
      },
      { filteredIngredients, irritatingProducts, skinType },
    );

    const updated = await this.updateSkinProfile(
      userr.id,
      toSet.skinType,
      await this.ingredientsService.getIngredientsWithAliases(
        toSet.filteredIngredients.map((i) => i.id),
      ),
      await this.productsService.getProductsWithIngredients(
        toSet.irritatingProducts.map((p) => p.id),
      ),
    ).then((u) => u?.skinProfile);
  }

  private async updateSkinProfile(
    userId: string,
    skinType: SkinType,
    filteredIngredients: IngredientWithAliases[],
    irritatingProducts: ProductWithIngredients[],
  ) {
    const irritants = await this.calculateIrritants(
      skinType,
      filteredIngredients,
      irritatingProducts,
    );

    const explicitIrritants = irritants.filter(
      (irritant) =>
        irritant.irritationReasons.filter(
          (reason) => reason.type === 'EXPLICITLY_ADDED',
        ).length > 0,
    );

    const duplicateIrritants = irritants.filter(
      (irritant) =>
        irritant.irritationReasons.filter(
          (reason) => reason.type === 'DUPLICATE',
        ).length > 0,
    );

    const skinTypeClassIrritants = irritants.filter(
      (irritant) =>
        irritant.irritationReasons.filter(
          (reason: any) => reason['reason'] === 'SKIN_TYPE_IRRITANT',
        ).length > 0,
    );

    const commonClassIrritants = irritants.filter(
      (irritant) =>
        irritant.irritationReasons.filter(
          (reason: any) => reason['reason'] === 'COMMON_IRRITANT',
        ).length > 0,
    );

    return (
      (await this.prisma.user
        .update({
          where: {
            id: userId,
          },
          data: {
            skinProfile: {
              upsert: {
                create: {
                  skinType,
                  explicitlyAddedProducts: {
                    connect: irritatingProducts.map((product) => ({
                      id: product.id,
                    })),
                  },

                  explicitlyAddedIrritants: {
                    connect: explicitIrritants.map((i) => ({
                      id: i.ingredient.id,
                    })),
                  },
                  duplicateIrritants: {
                    connect: duplicateIrritants.map((i) => ({
                      id: i.ingredient.id,
                    })),
                  },
                  skinTypeClassIrritants: {
                    connect: skinTypeClassIrritants.map((i) => ({
                      id: i.ingredient.id,
                    })),
                  },
                  commonClassIrritants: {
                    connect: commonClassIrritants.map((i) => ({
                      id: i.ingredient.id,
                    })),
                  },
                },
                update: {
                  skinType,
                  explicitlyAddedProducts: {
                    set: irritatingProducts.map((product) => ({
                      id: product.id,
                    })),
                  },

                  explicitlyAddedIrritants: {
                    set: explicitIrritants.map((i) => ({
                      id: i.ingredient.id,
                    })),
                  },
                  duplicateIrritants: {
                    set: duplicateIrritants.map((i) => ({
                      id: i.ingredient.id,
                    })),
                  },
                  skinTypeClassIrritants: {
                    set: skinTypeClassIrritants.map((i) => ({
                      id: i.ingredient.id,
                    })),
                  },
                  commonClassIrritants: {
                    set: commonClassIrritants.map((i) => ({
                      id: i.ingredient.id,
                    })),
                  },
                },
              },
            },
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
        })
        .catch(console.error)) || undefined
    );
  }

  /**
   * @param skinType User skin type
   * @param filteredIngredients A list of known irritating ingredients
   * @param explicitlyAddedProducts A list of products that the user has explicitly added
   * @return A list of irritant ingredients
   */
  private async calculateIrritants(
    skinType: SkinType = SkinType.NORMAL,
    filteredIngredients: IngredientWithAliases[],
    explicitlyAddedProducts: ProductWithIngredients[],
  ): Promise<Irritant[]> {
    const productIngredients = explicitlyAddedProducts.flatMap(
      (product) => product.ingredients,
    );

    const irritatingIngredientClasses =
      this.skinClassService.getIrritatingIngredientClasses(
        [...productIngredients, ...filteredIngredients],
        skinType,
      );

    const allUniqueIngredients = this.getUniqueIngredients([
      ...filteredIngredients,
      ...productIngredients,
    ]);

    return allUniqueIngredients
      .map((ingredient) => {
        const irritationReasons: IrritationReason[] = [];
        const duplicateReason = this.getDuplicateReason(
          ingredient,
          explicitlyAddedProducts,
        );
        const ingredientClassReasons =
          this.skinClassService.getIngredientClassReasons(
            ingredient,
            irritatingIngredientClasses,
          );
        const explicitlyAddedReason: ExplicitlyAddedIrritantReason[] =
          filteredIngredients
            .filter((i) => i.id === ingredient.id)
            .map((ingredient) => ({ type: 'EXPLICITLY_ADDED', ingredient }));

        if (duplicateReason) irritationReasons.push(duplicateReason);
        irritationReasons.push(...ingredientClassReasons);
        irritationReasons.push(...explicitlyAddedReason);

        return {
          ingredient,
          irritationReasons,
        };
      })
      .filter((irritant) => irritant.irritationReasons.length > 0);
  }

  private getUniqueIngredients(ingredients: Ingredient[]): Ingredient[] {
    return ingredients.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.id === value.id),
    );
  }

  private getDuplicateReason(
    ingredient: Ingredient,
    products: ProductWithIngredients[],
  ): DuplicateIrritationReason | null {
    const productsWithIngredient = products.filter((product) => {
      return product.ingredients.map((i) => i.id).includes(ingredient.id);
    });

    if (productsWithIngredient.length) {
      return {
        type: 'DUPLICATE',
        products: productsWithIngredient,
      };
    } else return null;
  }
}
