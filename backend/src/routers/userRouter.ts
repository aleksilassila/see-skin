import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";

const usersRouter = Router();

usersRouter.get("/", requireAuth, (req, res) => {
  res.send(req.user);
});

export default usersRouter;
