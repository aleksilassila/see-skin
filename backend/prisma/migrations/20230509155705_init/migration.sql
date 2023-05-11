-- CreateEnum
CREATE TYPE "SkinType" AS ENUM ('NORMAL', 'DRY', 'OILY', 'COMBINATION', 'NORMAL_SENSITIVE', 'DRY_SENSITIVE', 'OILY_SENSITIVE', 'COMBINATION_SENSITIVE');

-- CreateEnum
CREATE TYPE "IngredientClass" AS ENUM ('SAFE', 'PARABEN', 'ALCOHOL', 'SULFATE', 'FUNGAL_ACNE_TRIGGER', 'DRY_IRRITANT', 'OILY_IRRITANT', 'DRY_OILY_IRRITANT', 'SENSITIVE_IRRITANT');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'EUR');

-- CreateEnum
CREATE TYPE "ProductProvider" AS ENUM ('ULTA', 'AMAZON');

-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('MOISTURIZERS', 'SUNSCREENS', 'TREATMENTS', 'CLEANSERS', 'EYE_CREAMS', 'FACE_WASHES', 'EXFOLIATORS', 'TONERS', 'FACE_MISTS', 'FACE_OILS', 'SERUMS', 'FACE_MASKS', 'MAKEUP_REMOVERS', 'LIP_CARES');

-- CreateEnum
CREATE TYPE "ProductEffect" AS ENUM ('UV_PROTECTING', 'ANTI_AGING', 'BRIGHTENING', 'ACNE_FIGHTING', 'HEALING');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "brand" TEXT NOT NULL DEFAULT '',
    "price" DOUBLE PRECISION NOT NULL,
    "priceBeforeDiscount" DOUBLE PRECISION,
    "priceCurrency" "Currency" NOT NULL DEFAULT 'USD',
    "rating" DOUBLE PRECISION,
    "ratingCount" INTEGER,
    "effects" "ProductEffect"[] DEFAULT ARRAY[]::"ProductEffect"[],
    "category" "ProductCategory",
    "imageUrl" TEXT,
    "shopPageUrl" TEXT,
    "provider" "ProductProvider",
    "ingredientsString" TEXT NOT NULL,
    "unknownIngredients" TEXT[],
    "knownToUnknownRatio" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cosingRef" INTEGER NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "function" TEXT NOT NULL,
    "ingredientClasses" "IngredientClass"[] DEFAULT ARRAY[]::"IngredientClass"[],
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IngredientAlias" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ingredientId" TEXT NOT NULL,

    CONSTRAINT "IngredientAlias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "googleId" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "name" TEXT NOT NULL,
    "accessLevel" INTEGER NOT NULL DEFAULT 0,
    "logoutAt" TIMESTAMP(3),
    "preferredProviders" "ProductProvider"[] DEFAULT ARRAY[]::"ProductProvider"[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkinProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "skinType" "SkinType" NOT NULL DEFAULT 'NORMAL',

    CONSTRAINT "SkinProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "__ExplicitlyAddedProductsToSkinProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_IngredientToProduct" (
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
CREATE UNIQUE INDEX "Ingredient_cosingRef_key" ON "Ingredient"("cosingRef");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "SkinProfile_userId_key" ON "SkinProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "__ExplicitlyAddedProductsToSkinProfile_AB_unique" ON "__ExplicitlyAddedProductsToSkinProfile"("A", "B");

-- CreateIndex
CREATE INDEX "__ExplicitlyAddedProductsToSkinProfile_B_index" ON "__ExplicitlyAddedProductsToSkinProfile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_IngredientToProduct_AB_unique" ON "_IngredientToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_IngredientToProduct_B_index" ON "_IngredientToProduct"("B");

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
ALTER TABLE "IngredientAlias" ADD CONSTRAINT "IngredientAlias_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkinProfile" ADD CONSTRAINT "SkinProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__ExplicitlyAddedProductsToSkinProfile" ADD CONSTRAINT "__ExplicitlyAddedProductsToSkinProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__ExplicitlyAddedProductsToSkinProfile" ADD CONSTRAINT "__ExplicitlyAddedProductsToSkinProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "SkinProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToProduct" ADD CONSTRAINT "_IngredientToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToProduct" ADD CONSTRAINT "_IngredientToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
