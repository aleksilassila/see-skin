/*
  Warnings:

  - You are about to drop the column `skinProfileId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `irritativeClasses` on the `SkinProfile` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `__ExplicitIrritantsToSkinProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `__IrritantsToSkinProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_skinProfileId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_productId_fkey";

-- DropForeignKey
ALTER TABLE "__ExplicitIrritantsToSkinProfile" DROP CONSTRAINT "__ExplicitIrritantsToSkinProfile_A_fkey";

-- DropForeignKey
ALTER TABLE "__ExplicitIrritantsToSkinProfile" DROP CONSTRAINT "__ExplicitIrritantsToSkinProfile_B_fkey";

-- DropForeignKey
ALTER TABLE "__IrritantsToSkinProfile" DROP CONSTRAINT "__IrritantsToSkinProfile_A_fkey";

-- DropForeignKey
ALTER TABLE "__IrritantsToSkinProfile" DROP CONSTRAINT "__IrritantsToSkinProfile_B_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "skinProfileId";

-- AlterTable
ALTER TABLE "SkinProfile" DROP COLUMN "irritativeClasses";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "productId";

-- DropTable
DROP TABLE "__ExplicitIrritantsToSkinProfile";

-- DropTable
DROP TABLE "__IrritantsToSkinProfile";

-- CreateTable
CREATE TABLE "__ExplicitlyAddedProductsToSkinProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "__ExplicitlyAddedIrritantsToSkinProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "__DuplicateIrritantsToSkinProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "__SkinTypeClassIrritantsToSkinProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "__CommonClassIrritantsToSkinProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "__ExplicitlyAddedProductsToSkinProfile_AB_unique" ON "__ExplicitlyAddedProductsToSkinProfile"("A", "B");

-- CreateIndex
CREATE INDEX "__ExplicitlyAddedProductsToSkinProfile_B_index" ON "__ExplicitlyAddedProductsToSkinProfile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "__ExplicitlyAddedIrritantsToSkinProfile_AB_unique" ON "__ExplicitlyAddedIrritantsToSkinProfile"("A", "B");

-- CreateIndex
CREATE INDEX "__ExplicitlyAddedIrritantsToSkinProfile_B_index" ON "__ExplicitlyAddedIrritantsToSkinProfile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "__DuplicateIrritantsToSkinProfile_AB_unique" ON "__DuplicateIrritantsToSkinProfile"("A", "B");

-- CreateIndex
CREATE INDEX "__DuplicateIrritantsToSkinProfile_B_index" ON "__DuplicateIrritantsToSkinProfile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "__SkinTypeClassIrritantsToSkinProfile_AB_unique" ON "__SkinTypeClassIrritantsToSkinProfile"("A", "B");

-- CreateIndex
CREATE INDEX "__SkinTypeClassIrritantsToSkinProfile_B_index" ON "__SkinTypeClassIrritantsToSkinProfile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "__CommonClassIrritantsToSkinProfile_AB_unique" ON "__CommonClassIrritantsToSkinProfile"("A", "B");

-- CreateIndex
CREATE INDEX "__CommonClassIrritantsToSkinProfile_B_index" ON "__CommonClassIrritantsToSkinProfile"("B");

-- AddForeignKey
ALTER TABLE "__ExplicitlyAddedProductsToSkinProfile" ADD CONSTRAINT "__ExplicitlyAddedProductsToSkinProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__ExplicitlyAddedProductsToSkinProfile" ADD CONSTRAINT "__ExplicitlyAddedProductsToSkinProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "SkinProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__ExplicitlyAddedIrritantsToSkinProfile" ADD CONSTRAINT "__ExplicitlyAddedIrritantsToSkinProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__ExplicitlyAddedIrritantsToSkinProfile" ADD CONSTRAINT "__ExplicitlyAddedIrritantsToSkinProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "SkinProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__DuplicateIrritantsToSkinProfile" ADD CONSTRAINT "__DuplicateIrritantsToSkinProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__DuplicateIrritantsToSkinProfile" ADD CONSTRAINT "__DuplicateIrritantsToSkinProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "SkinProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__SkinTypeClassIrritantsToSkinProfile" ADD CONSTRAINT "__SkinTypeClassIrritantsToSkinProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__SkinTypeClassIrritantsToSkinProfile" ADD CONSTRAINT "__SkinTypeClassIrritantsToSkinProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "SkinProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__CommonClassIrritantsToSkinProfile" ADD CONSTRAINT "__CommonClassIrritantsToSkinProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__CommonClassIrritantsToSkinProfile" ADD CONSTRAINT "__CommonClassIrritantsToSkinProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "SkinProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
