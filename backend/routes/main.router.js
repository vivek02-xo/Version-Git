const express = require("express");
const userRouter = require("./user.router.js");
const repoRouter = require("./repo.router.js");

const mainRouter = express.Router();

mainRouter.use(userRouter);
mainRouter.use(repoRouter);

mainRouter.get("/", (req, res) => {
  res.send("Welcome!");
});

module.exports = mainRouter;
