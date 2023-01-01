/*
  Warnings:

  - You are about to drop the column `sensitiveSkin` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "sensitiveSkin",
ADD COLUMN     "irritativeClasses" "IngredientClass"[] DEFAULT ARRAY[]::"IngredientClass"[];
