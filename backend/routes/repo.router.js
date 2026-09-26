const express = require("express");
const userController = require("../controllers/repoController.js");
const repoRouter = express.Router();

repoRouter.post("/repo/create", userController.createRepository);
repoRouter.get("/repo/all", userController.getAllRepositories);
repoRouter.get("/repo/:id", userController.fetchRepositoryById);
repoRouter.get("/repo/:name", userController.fetchRepositoryByName);
repoRouter.get("/repo/:userID", userController.fetchRepositoryForCurrentUser);
repoRouter.put("/repo/update/:id", userController.updateRepositoryById);
repoRouter.delete("/repo/delete/:id", userController.deleteRepositoryById);
repoRouter.patch("repo/toggle/:id", userController.toggleRepositoryById);

module.exports = repoRouter;
