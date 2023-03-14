import { Request, Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import prisma from "../prisma";
import { body, query } from "express-validator";
import { IngredientClass, SkinType } from "@prisma/client";
import validateRequest from "../middleware/validateRequest";
import * as userController from "../controllers/userController";

const userRouter = Router();

userRouter.get("/", requireAuth, (req, res) => {
  console.log("User", req.user);
  res.status(200).send(req.user);
});

userRouter.put(
  "/update",
  // body("irritativeIngredientIds").isArray().optional(),
  // body("irritativeIngredientIds.*").isString().isLength({ max: 50, min: 1 }),
  // body("irritativeProductIds").isArray().optional(),
  // body("irritativeProductIds.*").isString().isLength({ max: 50, min: 1 }),
  // body("irritativeClasses").isArray().optional(),
  // body("irritativeClasses.*").isString().isIn(Object.values(IngredientClass)),
  // body("irritantIds").isArray().optional(),
  // body("irritantIds.*").isString().isLength({ max: 50, min: 1 }),
  // body("skinType").isString().isIn(Object.keys(SkinType)).optional(),
  body("email").isEmail().optional(),
  body("name").isString().isLength({ min: 5, max: 30 }).optional(),
  async function (
    req: Request<
      {},
      {},
      Partial<{
        // irritativeIngredientIds: string[];
        // irritativeProductIds: string[];
        // irritantIds: string[];
        // irritativeClasses: IngredientClass[];
        // skinType: SkinType;
        email: string;
        name: string;
      }>
    >,
    res
  ) {
    const {
      // irritativeIngredientIds,
      // irritativeProductIds,
      // irritantIds,
      // irritativeClasses,
      // skinType,
      email,
      name,
    } = req.body;

    const updatedUser = await prisma.user
      .update({
        where: {
          id: req.user?.id,
        },
        data: {
          // ...(irritativeIngredientIds && {
          //   addedIrritativeIngredients: {
          //     set: irritativeIngredientIds.map((id) => ({ id })),
          //   },
          // }),
          // ...(irritativeProductIds && {
          //   addedIrritativeProducts: {
          //     set: irritativeProductIds.map((id) => ({ id })),
          //   },
          // }),
          // ...(irritantIds && {
          //   irritants: {
          //     set: irritantIds.map((id) => ({ id })),
          //   },
          // }),
          // ...(irritativeClasses && {
          //   irritativeClasses: {
          //     set: irritativeClasses,
          //   },
          // }),
          // ...(skinType && { skinType }),
          ...(email && { email }),
          ...(name && { name }),
          // ...(skinType && { didSetupProfile: true }),
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

userRouter.get(
  "/calculate-irritants",
  query("ingredientIds").isArray({ min: 0, max: 50 }).optional(),
  query("ingredientIds.*").isString().optional(),
  query("productIds").isArray({ min: 0, max: 30 }).optional(),
  query("productIds.*").isString().optional(),
  query("skinType").isIn(Object.keys(SkinType)).optional(),
  validateRequest,
  userController.calculateIrritants
);

export default userRouter;
