-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "SkinType" ADD VALUE 'NORMAL_SENSITIVE';
ALTER TYPE "SkinType" ADD VALUE 'DRY_SENSITIVE';
ALTER TYPE "SkinType" ADD VALUE 'OILY_SENSITIVE';
ALTER TYPE "SkinType" ADD VALUE 'COMBINATION_SENSITIVE';
