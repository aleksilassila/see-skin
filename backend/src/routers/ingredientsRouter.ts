import { Router } from "express";
import * as ingredientsController from "../controllers/ingredientsController";
import { body } from "express-validator";

const ingredientsRouter = Router();

// ingredientsRouter.get(
//   "/",
//   body("groupId").trim(),
//   body("id").trim(),
//   ingredientsController.get
// );

export default ingredientsRouter;
