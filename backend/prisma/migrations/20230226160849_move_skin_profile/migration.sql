/*
  Warnings:

  - You are about to drop the column `didSetupProfile` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `irritativeClasses` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `skinType` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_ProductToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `__AddedIrritantToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `__IrritantToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProductToUser" DROP CONSTRAINT "_ProductToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToUser" DROP CONSTRAINT "_ProductToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "__AddedIrritantToUser" DROP CONSTRAINT "__AddedIrritantToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "__AddedIrritantToUser" DROP CONSTRAINT "__AddedIrritantToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "__IrritantToUser" DROP CONSTRAINT "__IrritantToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "__IrritantToUser" DROP CONSTRAINT "__IrritantToUser_B_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "skinProfileId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "didSetupProfile",
DROP COLUMN "irritativeClasses",
DROP COLUMN "skinType",
ADD COLUMN     "productId" TEXT;

-- DropTable
DROP TABLE "_ProductToUser";

-- DropTable
DROP TABLE "__AddedIrritantToUser";

-- DropTable
DROP TABLE "__IrritantToUser";

-- CreateTable
CREATE TABLE "SkinProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "skinType" "SkinType" NOT NULL DEFAULT 'NORMAL',
    "irritativeClasses" "IngredientClass"[] DEFAULT ARRAY[]::"IngredientClass"[],

    CONSTRAINT "SkinProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "__ExplicitIrritantsToSkinProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "__IrritantsToSkinProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SkinProfile_userId_key" ON "SkinProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "__ExplicitIrritantsToSkinProfile_AB_unique" ON "__ExplicitIrritantsToSkinProfile"("A", "B");

-- CreateIndex
CREATE INDEX "__ExplicitIrritantsToSkinProfile_B_index" ON "__ExplicitIrritantsToSkinProfile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "__IrritantsToSkinProfile_AB_unique" ON "__IrritantsToSkinProfile"("A", "B");

-- CreateIndex
CREATE INDEX "__IrritantsToSkinProfile_B_index" ON "__IrritantsToSkinProfile"("B");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_skinProfileId_fkey" FOREIGN KEY ("skinProfileId") REFERENCES "SkinProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkinProfile" ADD CONSTRAINT "SkinProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__ExplicitIrritantsToSkinProfile" ADD CONSTRAINT "__ExplicitIrritantsToSkinProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__ExplicitIrritantsToSkinProfile" ADD CONSTRAINT "__ExplicitIrritantsToSkinProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "SkinProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__IrritantsToSkinProfile" ADD CONSTRAINT "__IrritantsToSkinProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__IrritantsToSkinProfile" ADD CONSTRAINT "__IrritantsToSkinProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "SkinProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
