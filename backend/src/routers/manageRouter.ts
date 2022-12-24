import { Router } from "express";
import * as manageController from "../controllers/manageController";
import { check } from "express-validator";
import validateRequest from "../middleware/validateRequest";
import { requireAuthLevel } from "../middleware/requireAuth";
import parsePagination from "../middleware/parsePagination";

const manageRouter = Router();

manageRouter.use(requireAuthLevel(1));

manageRouter.get("/issues/products", manageController.productIssues);

manageRouter.get(
  "/issues/ingredients",
  parsePagination,
  manageController.ingredientIssues
);

export default manageRouter;
