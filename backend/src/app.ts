import express, { Router } from "express";
import passport from "passport";
import "./passport";
import products from "./routes/products";
import { COOKIE_SECRET } from "./config";
import auth from "./routes/auth";
import session from "express-session";

const app = express();
const router = Router();

app.use(
  session({
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

router.use((req, res, next) => {
  console.log(req.isAuthenticated());
  next();
});

router.use("/auth", auth);

router.use("/products", products);

app.use("/api", router);

app.use((req, res) => res.status(404).send("Not Found"));

export default app;
