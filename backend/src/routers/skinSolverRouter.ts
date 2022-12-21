import { Router } from "express";
import * as skinSolverController from "../controllers/skinSolverController";

const skinSolverRouter = Router();

skinSolverRouter.get(
  "/find-irritants",
  skinSolverController.calculateIrritants
);

export default skinSolverRouter;
