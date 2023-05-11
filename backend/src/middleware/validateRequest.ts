import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { NODE_ENV } from "../config";

const validate = (req: Request, res: Response, next: NextFunction) => {
  // express validator middleware

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (NODE_ENV === "development") {
        console.log(req.originalUrl, errors.array());
      }
      return res.status(400).json({ errors: errors.array() });
    }

    return next();
  } catch (err) {
    return res.status(500).send("Error validating request");
  }
};
export default validate;
