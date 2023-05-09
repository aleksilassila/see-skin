import { Router } from "express";
import { query } from "express-validator";
import validateRequest from "../middleware/validateRequest";
import * as skinProfileController from "../controllers/skinProfileController";
import { SkinType } from "@prisma/client";
import { getUser } from "../middleware/requestUtilities";

const skinProfileRouter = Router();

skinProfileRouter.get("/", async (req, res) =>
  res.send(await getUser(req).then((user) => user.skinProfile))
);

skinProfileRouter.put(
  "/",
  query("filteredIngredientIds").isArray({ min: 0, max: 50 }).optional(),
  query("filteredIngredientIds.*").isString().optional(),
  query("irritatingProductIds").isArray({ min: 0, max: 30 }).optional(),
  query("irritatingProductIds.*").isString().optional(),
  query("skinType").isIn(Object.keys(SkinType)).optional(),
  validateRequest,
  skinProfileController.setSkinProfile
);

export default skinProfileRouter;
