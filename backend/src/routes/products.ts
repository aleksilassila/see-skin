import { Router } from "express";

const products = Router();

products.get("/", (req, res) => {
  res.send(
    "Hello world :) isAuthenticated? " +
      req.isAuthenticated() +
      ", " +
      JSON.stringify(req.user)
  );
});

export default products;
