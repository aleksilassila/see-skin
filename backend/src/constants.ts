export const GOOGLE_CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID ||
  "595821037529-vb803sk7meqhk7o6glku2fckq189adj6.apps.googleusercontent.com";
export const GOOGLE_CLIENT_SECRET =
  process.env.GOOGLE_CLIENT_SECRET || "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";

export const COOKIE_SECRET = process.env.COOKIE_SECRET || "secret";
export const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;

export const NODE_ENV: "production" | "development" | "test" =
  process.env.NODE_ENV === "production"
    ? "production"
    : process.env.NODE_ENV === "test"
    ? "test"
    : "development";

export const ENDPOINT =
  process.env.ENDPOINT ||
  (NODE_ENV === "production" ? "https://see-skin.com" : "http://localhost");
