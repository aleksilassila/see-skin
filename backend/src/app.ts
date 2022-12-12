import express, { Router } from "express";
import passport from "passport";
import productsRouter from "./routers/productsRouter";
import {
  BACKEND_ENDPOINT,
  COOKIE_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "./config";
import authRouter from "./routers/authRouter";
import session from "express-session";
import PassportGoogleOAuth20 from "passport-google-oauth20";
import prisma from "./prisma";

// Setup passport
import "./passport";

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

// passport.use(
//   new PassportGoogleOAuth20.Strategy(
//     {
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: BACKEND_ENDPOINT + "/auth/google/callback",
//       passReqToCallback: true,
//     },
//     async function (request, accessToken, refreshToken, profile, done) {
//       try {
//         const user = await prisma.user.upsert({
//           where: {
//             email: profile.emails?.[0].value,
//           },
//           update: {},
//           create: {
//             email: profile.emails?.[0].value as string,
//             name: profile.displayName,
//             googleId: profile.id,
//           },
//         });
//
//         if (user) {
//           return done(null, user);
//         } else return done(null, false);
//       } catch (e) {
//         return done(null, false);
//       }
//     }
//   )
// );

app.use(passport.authenticate("session"));

router.use((req, res, next) => {
  console.log("Is authenticated?:", req.isAuthenticated());
  next();
});

router.use("/auth", authRouter);
router.use("/products", productsRouter);

app.use("/api", router);

app.use((req, res) => res.status(404).send("Not Found"));

export default app;
