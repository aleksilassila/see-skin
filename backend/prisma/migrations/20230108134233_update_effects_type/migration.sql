/*
  Warnings:

  - You are about to drop the column `effect` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "effect",
ADD COLUMN     "effects" "ProductEffect"[] DEFAULT ARRAY[]::"ProductEffect"[];
