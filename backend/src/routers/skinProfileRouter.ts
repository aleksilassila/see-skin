import { Router } from "express";
import { query } from "express-validator";
import validateRequest from "../middleware/validateRequest";
import * as skinProfileController from "../controllers/skinProfileController";
import { SkinType } from "@prisma/client";
import { getUser } from "../middleware/requestUtilities";

const skinProfileRouter = Router();

skinProfileRouter.get("/", async (req, res) =>
  res.send(await getUser(req).then((user) => user.skinProfile))
);

skinProfileRouter.put(
  "/",
  query("filteredIngredientIds").isArray({ min: 0, max: 50 }).optional(),
  query("filteredIngredientIds.*").isString().optional(),
  query("irritatingProductIds").isArray({ min: 0, max: 30 }).optional(),
  query("irritatingProductIds.*").isString().optional(),
  query("skinType").isIn(Object.keys(SkinType)).optional(),
  validateRequest,
  skinProfileController.setSkinProfile((oldData, newData) => ({
    skinType: newData.skinType || oldData.skinType,
    filteredIngredients:
      newData.filteredIngredients || oldData.filteredIngredients,
    irritatingProducts:
      newData.irritatingProducts || oldData.irritatingProducts,
  }))
);

skinProfileRouter.post(
  "/",
  query("filteredIngredientIds").isArray({ min: 0, max: 50 }).optional(),
  query("filteredIngredientIds.*").isString().optional(),
  query("irritatingProductIds").isArray({ min: 0, max: 30 }).optional(),
  query("irritatingProductIds.*").isString().optional(),
  validateRequest,
  skinProfileController.setSkinProfile((oldData, newData) => ({
    skinType: oldData.skinType,
    filteredIngredients: [
      ...oldData.filteredIngredients,
      ...(newData.filteredIngredients || []),
    ],
    irritatingProducts: [
      ...oldData.irritatingProducts,
      ...(newData.irritatingProducts || []),
    ],
  }))
);

skinProfileRouter.delete(
  "/",
  query("filteredIngredientIds").isArray({ min: 0, max: 50 }).optional(),
  query("filteredIngredientIds.*").isString().optional(),
  query("irritatingProductIds").isArray({ min: 0, max: 30 }).optional(),
  query("irritatingProductIds.*").isString().optional(),
  validateRequest,
  skinProfileController.setSkinProfile((oldData, newData) => ({
    skinType: oldData.skinType,
    filteredIngredients: oldData.filteredIngredients.filter(
      (i) => !newData.filteredIngredients?.find((ni) => ni.id === i.id)
    ),
    irritatingProducts: oldData.irritatingProducts.filter(
      (p) => !newData.irritatingProducts?.find((np) => np.id === p.id)
    ),
  }))
);

export default skinProfileRouter;
