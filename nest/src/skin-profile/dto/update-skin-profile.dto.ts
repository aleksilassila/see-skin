import { SkinType } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';

export class SetSkinProfileDto {
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

// export class DeleteSkinProfileDto extends OmitType(SetSkinProfileDto, [
//   'skinType',
// ] as const) {}

export class DeleteSkinProfileDto extends SetSkinProfileDto {}

export class UpdateSkinProfileDto extends SetSkinProfileDto {}
