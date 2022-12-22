import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";

const userRouter = Router();

userRouter.get("/", requireAuth, (req, res) => {
  console.log("User", req.user);
  res.status(200).send(req.user);
});

export default userRouter;
