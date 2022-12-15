import { Router } from "express";
import * as manageController from "../controllers/manageController";

const authRouter = Router();

authRouter.get("/issues/products", manageController.productIssues);

export default authRouter;
