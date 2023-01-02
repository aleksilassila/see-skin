/*
  Warnings:

  - Added the required column `knownToUnknownRatio` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'EUR');

-- CreateEnum
CREATE TYPE "ProductProvider" AS ENUM ('ULTA', 'AMAZON');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "knownToUnknownRatio" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "priceBeforeDiscount" DOUBLE PRECISION,
ADD COLUMN     "priceCurrency" "Currency" NOT NULL DEFAULT 'USD',
ADD COLUMN     "provider" "ProductProvider",
ADD COLUMN     "rating" DOUBLE PRECISION,
ADD COLUMN     "ratingCount" INTEGER,
ADD COLUMN     "unknownIngredients" TEXT[],
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
