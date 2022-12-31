-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "didSetupProfile" BOOLEAN NOT NULL DEFAULT false;
