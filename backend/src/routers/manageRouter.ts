import { Router } from "express";
import * as manageController from "../controllers/manageController";
import { check } from "express-validator";
import validateRequest from "../middleware/validateRequest";

const manageRouter = Router();

manageRouter.get("/issues/products", manageController.productIssues);
export default manageRouter;

manageRouter.get(
  "/issues/ingredients",
  [
    check("page")
      .optional()
      .isInt({ min: 0, max: 500 })
      .withMessage("Page must be a positive integer"),
    check("take")
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage("Take must be an integer between 1 and 50"),
  ],
  validateRequest,
  manageController.ingredientIssues
);
