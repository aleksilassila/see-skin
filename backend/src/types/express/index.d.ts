declare global {
  namespace Express {
    interface Request {
      pagination?: {
        page: number;
        take: number | "default";
      };
    }
  }
}
