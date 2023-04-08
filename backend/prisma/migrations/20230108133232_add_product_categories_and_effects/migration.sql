-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('MOISTURIZERS', 'SUNSCREENS', 'TREATMENTS', 'CLEANSERS', 'EYE_CREAMS', 'FACE_WASHES', 'EXFOLIATORS', 'TONERS', 'FACE_MISTS', 'FACE_OILS', 'SERUMS', 'FACE_MASKS', 'MAKEUP_REMOVERS', 'LIP_CARES');

-- CreateEnum
CREATE TYPE "ProductEffect" AS ENUM ('UV_PROTECTING', 'ANTI_AGING', 'BRIGHTENING', 'ACNE_FIGHTING', 'HEALING');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "category" "ProductCategory",
ADD COLUMN     "effect" "ProductEffect";