import { Router } from "express";
import { param, query } from "express-validator";
import validateRequest from "../middleware/validateRequest";
import * as ingredientsController from "../controllers/ingredientsController";
import { IngredientClass, SkinType } from "@prisma/client";
import { requireAuthLevel } from "../middleware/requireAuth";

const ingredientsRouter = Router();

ingredientsRouter.get(
  "/find",
  query("name").isString(),
  validateRequest,
  ingredientsController.find
);

ingredientsRouter.put(
  "/update/:id",
  requireAuthLevel(1),
  param("id").isString(),
  query("ingredientClasses").isIn(Object.keys(IngredientClass)),
  ingredientsController.update
);

ingredientsRouter.get(
  "/calculate-irritants",
  query("ingredientIds").isArray({ min: 0, max: 50 }).optional(),
  query("ingredientIds.*").isString().optional(),
  query("productIds").isArray({ min: 0, max: 30 }).optional(),
  query("productIds.*").isString().optional(),
  query("skinType").isIn(Object.keys(SkinType)).optional(),
  validateRequest,
  ingredientsController.calculateIrritants
);

export default ingredientsRouter;
