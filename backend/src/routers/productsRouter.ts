import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";

const productsRouter = Router();

productsRouter.get("/", requireAuth, (req, res) => {
  res.send(
    "Hello world :) isAuthenticated? " +
      req.isAuthenticated() +
      ", " +
      JSON.stringify(req.user)
  );
});

export default productsRouter;
