export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";

export const COOKIE_SECRET = process.env.COOKIE_SECRET || "secret";
export const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;

export const FRONTEND_ENDPOINT =
  process.env.FRONTEND_ENDPOINT || "http://localhost:3000";
export const BACKEND_ENDPOINT =
  process.env.BACKEND_ENDPOINT || "http://localhost:9000/api";