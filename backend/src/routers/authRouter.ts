import { Router } from "express";
import passport from "passport";
import { FRONTEND_ENDPOINT } from "../config";
import * as authController from "../controllers/authController";
import { requireAuth } from "../middleware/requireAuth";
import { body } from "express-validator";

const authRouter = Router();

authRouter.get(
  "/login",
  body("email").exists().trim().notEmpty(),
  body("password").exists().trim().notEmpty(),
  authController.login
);

authRouter.get("/verify", requireAuth, function (req, res) {
  res.status(200).send("Authenticated");
});

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.redirect(FRONTEND_ENDPOINT + "/");
  }
);

authRouter.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    res.send("OK");
  });
});

export default authRouter;
