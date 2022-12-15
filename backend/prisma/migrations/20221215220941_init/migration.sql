-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductIngredientGroup" (
    "productId" TEXT NOT NULL,
    "ingredientGroupId" TEXT NOT NULL,

    CONSTRAINT "ProductIngredientGroup_pkey" PRIMARY KEY ("productId","ingredientGroupId")
);

-- CreateTable
CREATE TABLE "IngredientGroup" (
    "id" TEXT NOT NULL,
    "cosingRef" INTEGER NOT NULL,
    "function" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "IngredientGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
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

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IngredientGroup_cosingRef_key" ON "IngredientGroup"("cosingRef");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "ProductIngredientGroup" ADD CONSTRAINT "ProductIngredientGroup_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductIngredientGroup" ADD CONSTRAINT "ProductIngredientGroup_ingredientGroupId_fkey" FOREIGN KEY ("ingredientGroupId") REFERENCES "IngredientGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "IngredientGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
