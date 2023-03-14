import { Router } from "express";
import passport from "passport";
import * as authController from "../controllers/authController";
import { requireAuth } from "../middleware/requireAuth";
import { body } from "express-validator";

const authRouter = Router();

// authRouter.get(
//   "/login",
//   body("email").exists().trim().notEmpty(),
//   body("password").exists().trim().notEmpty(),
//   authController.login
// );

authRouter.get("/logout", (req, res) => {
  res.clearCookie("session");
  req.session.destroy((err) => {});
  res.redirect("/");
});

authRouter.get("/verify", requireAuth, function (req, res) {
  res.status(200).send("Authenticated");
});

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.post("/local", passport.authenticate("local"), (req, res) => {
  res.status(200).send(req.user);
});

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.redirect("/");
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
