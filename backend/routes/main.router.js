const express = requrie("express");
const mainRouter = express.Router();

mainRouter.get("/", (req, res) => {
  res.send("Welcome!");
});

module.exports = mainRouter;
