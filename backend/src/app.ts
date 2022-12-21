import express, { Router } from "express";
import passport from "passport";
import productsRouter from "./routers/productsRouter";
import { COOKIE_SECRET } from "./config";
import authRouter from "./routers/authRouter";
import session from "express-session";

// Setup passport
import "./passport";
import usersRouter from "./routers/userRouter";
import { requireAuth, requireAuthLevel } from "./middleware/requireAuth";
import ingredientsRouter from "./routers/ingredientsRouter";
import manageRouter from "./routers/manageRouter";
import skinSolverRouter from "./routers/skinSolverRouter";

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

app.use(passport.authenticate("session"));

router.use((req, res, next) => {
  console.log("Is authenticated?:", req.isAuthenticated());
  next();
});

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/manage", /*requireAuthLevel(1),*/ manageRouter);
router.use("/products", productsRouter);
router.use("/ingredients", ingredientsRouter);
router.use("/solver", skinSolverRouter);

app.use("/api", router);

app.use((req, res) => res.status(404).send("Not Found"));

export default app;
