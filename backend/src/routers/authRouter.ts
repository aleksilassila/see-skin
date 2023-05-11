import { Router } from "express";
import passport from "passport";
import { requireAuth } from "../middleware/requireAuth";
import { NODE_ENV } from "../config";

const authRouter = Router();

authRouter.get("/verify", requireAuth, function (req, res) {
  res.status(200).send(req.user);
});

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

if (NODE_ENV !== "production") {
  authRouter.post("/local", passport.authenticate("local"), (req, res) => {
    if (req.isAuthenticated()) {
      res.status(200).send(req.user);
    } else {
      res.status(401).send("Unauthorized");
    }
  });
}

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
    res.redirect("/");
  });
});

export default authRouter;
