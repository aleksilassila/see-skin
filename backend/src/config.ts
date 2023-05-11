export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";

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
