import { Request, Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import prisma from "../prisma";
import { body, query } from "express-validator";
import { SkinType } from "@prisma/client";
import validateRequest from "../middleware/validateRequest";
import * as userController from "../controllers/skinProfileController";
import { getUser } from "../middleware/requestUtilities";

const userRouter = Router();

userRouter.get("/", requireAuth, async (req, res) => {
  const user = await getUser(req);

  res.status(200).send(user);
});

userRouter.put(
  "/",
  body("email").isEmail().optional(),
  body("name").isString().isLength({ min: 5, max: 30 }).optional(),
  async function (
    req: Request<
      {},
      {},
      Partial<{
        email: string;
        name: string;
      }>
    >,
    res
  ) {
    const { email, name } = req.body;

    const updatedUser = await prisma.user
      .update({
        where: {
          id: req.user?.id,
        },
        data: {
          ...(email && { email }),
          ...(name && { name }),
        },
      })
      .catch(console.error);

    if (!updatedUser) {
      res.status(500).send("Internal Server Error");
      return;
    }

    res.status(200).send(updatedUser);
  }
);

export default userRouter;
