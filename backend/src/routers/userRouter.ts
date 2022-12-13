import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";

const usersRouter = Router();

usersRouter.get("/", requireAuth, (req, res) => {
  console.log("User", req.user);
  res.status(200).send(req.user);
});

export default usersRouter;
