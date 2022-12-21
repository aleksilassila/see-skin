import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import * as productsController from "../controllers/productsController";
import requirePagination from "../middleware/requirePagination";
import { body } from "express-validator";
import validateRequest from "../middleware/validateRequest";

const productsRouter = Router();

productsRouter.get(
  "/find",
  requirePagination,
  body("name").isString(),
  validateRequest,
  productsController.find
);

export default productsRouter;
