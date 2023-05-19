import { SkinType } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateSkinProfileDto {
  @IsOptional()
  @IsString({ each: true })
  ingredientIds?: string[];

  @IsOptional()
  @IsString({ each: true })
  productIds?: string[];

  @IsEnum(SkinType)
  @IsOptional()
  skinType?: SkinType;
}
