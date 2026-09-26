const createRepository = (req, res) => {
  res.send("Repo Created");
};

const getAllRepositories = (req, res) => {
  res.send("All repos fetched!");
};

const fetchRepositoryById = (req, res) => {
  res.send("Repo detail fetched!");
};

const fetchRepositoryByName = (req, res) => {
  res.send("Repo detail fetched!");
};

const fetchRepositoryForCurrentUser = (req, res) => {
  res.send("Repos for logged in user fetched!");
};

const updateRepositoryById = (req, res) => {
  res.send("Repo Updated!");
};

const toggleRepositoryById = (req, res) => {
  res.send("visibility toggled!");
};

const deleteRepositoryById = (req, res) => {
  res.send("Repo Deleted!");
};

module.exports = {
  createRepository,
  getAllRepositories,
  fetchRepositoryById,
  fetchRepositoryByName,
  fetchRepositoryForCurrentUser,
  updateRepositoryById,
  toggleRepositoryById,
  deleteRepositoryById,
};
