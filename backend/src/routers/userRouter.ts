import { Request, Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import prisma from "../prisma";
import { body } from "express-validator";
import { IngredientClass, SkinType } from "@prisma/client";

const userRouter = Router();

userRouter.get("/", requireAuth, (req, res) => {
  console.log("User", req.user);
  res.status(200).send(req.user);
});

userRouter.put(
  "/update",
  body("irritativeIngredientIds").isArray().optional(),
  body("irritativeIngredientIds.*").isString().isLength({ max: 50, min: 1 }),
  body("irritativeProductIds").isArray().optional(),
  body("irritativeProductIds.*").isString().isLength({ max: 50, min: 1 }),
  body("irritativeClasses").isArray().optional(),
  body("irritativeClasses.*").isString().isIn(Object.values(IngredientClass)),
  body("irritantIds").isArray().optional(),
  body("irritantIds.*").isString().isLength({ max: 50, min: 1 }),
  body("skinType").isString().isIn(Object.keys(SkinType)).optional(),
  body("email").isEmail().optional(),
  body("name").isString().isLength({ min: 5, max: 30 }).optional(),
  async function (
    req: Request<
      {},
      {},
      Partial<{
        irritativeIngredientIds: string[];
        irritativeProductIds: string[];
        irritantIds: string[];
        irritativeClasses: IngredientClass[];
        skinType: SkinType;
        email: string;
        name: string;
      }>
    >,
    res
  ) {
    const {
      irritativeIngredientIds,
      irritativeProductIds,
      irritantIds,
      irritativeClasses,
      skinType,
      email,
      name,
    } = req.body;

    const updatedUser = await prisma.user
      .update({
        where: {
          id: req.user?.id,
        },
        data: {
          ...(irritativeIngredientIds && {
            addedIrritativeIngredients: {
              set: irritativeIngredientIds.map((id) => ({ id })),
            },
          }),
          ...(irritativeProductIds && {
            addedIrritativeProducts: {
              set: irritativeProductIds.map((id) => ({ id })),
            },
          }),
          ...(irritantIds && {
            irritants: {
              set: irritantIds.map((id) => ({ id })),
            },
          }),
          ...(irritativeClasses && {
            irritativeClasses: {
              set: irritativeClasses,
            },
          }),
          ...(skinType && { skinType }),
          ...(email && { email }),
          ...(name && { name }),
          ...(skinType && { didSetupProfile: true }),
        },
      })
      .catch(console.error);

    if (!updatedUser) {
      res.status(500).send("Internal Server Error");
      return;
    }

    res.status(200).send(updatedUser);
  }
);

export default userRouter;
