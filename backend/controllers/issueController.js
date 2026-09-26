const createIssue = (req, res) => {
  res.send("Issue Created!");
};

const updateIssueById = (req, res) => {
  res.send("Issue Update!");
};

const deleteIssueById = (req, res) => {
  res.send("Issue Deleted!");
};

const getAllIssues = (req, res) => {
  res.send("all issues fetched!");
};

const getIssueById = (req, res) => {
  res.send("Issue details fetched!");
};

module.exports = {
  createIssue,
  updateIssueById,
  deleteIssueById,
  getAllIssues,
  getIssueById,
};
