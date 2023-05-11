import express, { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import productsRouter from "./routers/productsRouter";
import { COOKIE_SECRET, ENDPOINT, NODE_ENV } from "./config";
import authRouter from "./routers/authRouter";
import session from "express-session";
import "express-async-errors";

// Setup passport
import "./passport";
import userRouter from "./routers/userRouter";
import ingredientsRouter from "./routers/ingredientsRouter";
import manageRouter from "./routers/manageRouter";
import parsePagination from "./middleware/parsePagination";
import { requireAuth } from "./middleware/requireAuth";
import skinProfileRouter from "./routers/skinProfileRouter";
import RequestError from "./request-error";

const app = express();
const router = Router();

app.use(
  session({
    secret: COOKIE_SECRET,
    // resave: false,
    // saveUninitialized: false,
    cookie: {
      secure: ENDPOINT.startsWith("https"), // Not working for some reason
    },
  })
);

app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.authenticate("session"));

router.use(parsePagination);

router.use("/auth", authRouter);
router.use("/user", requireAuth, userRouter);
router.use("/skin-profile", requireAuth, skinProfileRouter);
router.use("/manage", /*requireAuthLevel(1),*/ manageRouter);
router.use("/products", productsRouter);
router.use("/ingredients", ingredientsRouter);

app.use("/api", router);

app.use((req, res) => res.status(404).send("Not Found"));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  if (err instanceof RequestError) {
    res.status(err.statusCode).send(err.message);
  } else {
    res.status(500).send("Internal server error");
  }
});
export default app;
