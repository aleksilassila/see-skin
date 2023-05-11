import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import passportLocal from "passport-local";
import {
  ENDPOINT,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  NODE_ENV,
} from "./config";
import prisma from "./prisma";
import { getUserWithSkinProfile } from "./services/user.service";

const GoogleStrategy = passportGoogle.Strategy;
const LocalStrategy = passportLocal.Strategy;

if (NODE_ENV !== "production") {
  passport.use(
    new LocalStrategy(async function (username, password, done) {
      const user =
        username === "test" && password === "test"
          ? await getUserWithSkinProfile("test")
          : false;

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  );
}

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: ENDPOINT + "/api/auth/google/callback",
      scope: ["profile", "email"],
    },
    async function verify(accessToken, refreshToken, profile, cb) {
      console.log("Verifying user");

      const user =
        (await prisma.user
          .upsert({
            where: {
              googleId: profile.id,
            },
            update: {},
            create: {
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails?.[0].value || "",
            },
          })
          .catch((err) => err)) || false;

      return cb(null, user);
    }
  )
);

passport.serializeUser(async (googleUser: any, done) => {
  done(null, googleUser?.id);
});

passport.deserializeUser(async (id: any, done) => {
  const user =
    (await prisma.user
      .findUnique({
        where: { id },
        include: {
          skinProfile: {
            include: {
              explicitlyAddedProducts: true,

              explicitlyAddedIrritants: true,
              duplicateIrritants: true,
              skinTypeClassIrritants: true,
            },
          },
        },
      })
      .catch(console.error)) || false;

  const irritantIds: string[] = [];

  if (user && user.skinProfile) {
    const profile = user.skinProfile;
    irritantIds.push(...profile.duplicateIrritants.map((i) => i.id));
    irritantIds.push(...profile.explicitlyAddedIrritants.map((i) => i.id));
    irritantIds.push(...profile.skinTypeClassIrritants.map((i) => i.id));
  }

  done(null, user);
});
