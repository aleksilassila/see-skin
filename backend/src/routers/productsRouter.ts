import { Router } from "express";
import * as productsController from "../controllers/productsController";
import { query } from "express-validator";
import validateRequest from "../middleware/validateRequest";

const productsRouter = Router();

productsRouter.get(
  "/find",
  query("name").isString(),
  validateRequest,
  productsController.find
);

productsRouter.get(
  "/feed",
  query("name").isString().optional(),
  query("filterIrritants").isBoolean().optional(),
  productsController.getFeed
);

productsRouter.get("/:id", productsController.get);

export default productsRouter;
