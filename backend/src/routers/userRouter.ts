import { Request, Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import prisma from "../prisma";
import { body } from "express-validator";
import { SkinType } from "@prisma/client";

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
  body("skinType").isIn(Object.keys(SkinType)).optional(),
  body("sensitiveSkin").isBoolean().optional(),
  body("email").isEmail().optional(),
  body("name").isString().isLength({ min: 5, max: 30 }).optional(),
  async function (
    req: Request<
      {},
      {},
      Partial<{
        irritativeIngredientIds: string[];
        irritativeProductIds: string[];
        skinType: SkinType;
        sensitiveSkin: boolean;
        email: string;
        name: string;
      }>
    >,
    res
  ) {
    const {
      irritativeIngredientIds,
      irritativeProductIds,
      skinType,
      sensitiveSkin,
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
          ...(skinType && { skinType }),
          ...(sensitiveSkin && { sensitiveSkin }),
          ...(email && { email }),
          ...(name && { name }),
          ...(skinType &&
            sensitiveSkin !== undefined && { didSetupProfile: true }),
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
