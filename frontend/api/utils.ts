import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export function requireParams(
  handler: NextApiHandler,
  ...requiredParams: string[]
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    for (const param of requiredParams) {
      if (!req.query[param]) {
        res.status(400).json({ error: `Missing parameter: ${param}` });
        return;
      }
    }

    await handler(req, res);
  };
}
