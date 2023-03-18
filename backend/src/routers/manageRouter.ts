import { Router } from "express";
import * as manageController from "../controllers/manageController";
import { requireAuthLevel } from "../middleware/requireAuth";

const manageRouter = Router();

manageRouter.use(requireAuthLevel(1));

manageRouter.get("/issues/products", manageController.productIssues);

manageRouter.get("/issues/ingredients", manageController.ingredientIssues);

// manageRouter.get(
//   "/ingredients/find",
//   query("name").isString(),
//   validateRequest,
//   manageController.find
// );

export default manageRouter;
