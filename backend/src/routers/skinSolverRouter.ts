import { Router } from "express";
import * as skinSolverController from "../controllers/skinSolverController";
import { query } from "express-validator";
import validateRequest from "../middleware/validateRequest";

const skinSolverRouter = Router();

skinSolverRouter.get(
  "/calculate-irritants",
  query("ingredientIds.*").isString(),
  query("productIds.*").isString(),
  query("productIds").isArray({ min: 1 }),
  validateRequest,
  skinSolverController.calculateIrritants
);

export default skinSolverRouter;
