import { Router } from "express";
import passport from "passport";
import { FRONTEND_ENDPOINT } from "../config";

const auth = Router();

auth.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

auth.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.redirect("/api/products");
  }
);

export default auth;
