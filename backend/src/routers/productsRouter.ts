import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import * as productsController from "../controllers/productsController";
import parsePagination from "../middleware/parsePagination";
import { body, query } from "express-validator";
import validateRequest from "../middleware/validateRequest";

const productsRouter = Router();

productsRouter.get(
  "/find",
  parsePagination,
  query("name").isString(),
  validateRequest,
  productsController.find
);

productsRouter.get("/feed", parsePagination, productsController.getFeed);

productsRouter.get("/:id", productsController.get);

export default productsRouter;
