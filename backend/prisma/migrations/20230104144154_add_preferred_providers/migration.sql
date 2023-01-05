-- AlterTable
ALTER TABLE "User" ADD COLUMN     "preferredProviders" "ProductProvider"[] DEFAULT ARRAY[]::"ProductProvider"[];
