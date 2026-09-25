const fs = require("fs"); // used to read, write, create, and delete files.
const path = require("path"); // used to manage file and folder paths.
const { promisify } = require("util");

const readdir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);

async function revertRepo(commitID) {
  // creating path for .visionGit folder in the current working directory.
  const repoPath = path.resolve(process.cwd(), ".versionGit");
  //   creating path for the commits folder inside .visionGit.
  const commitsPath = path.join(repoPath, "commits");

  try {
    // creates path to commitID
    const commitDir = path.join(commitsPath, commitID);
    // read all files inside commitID folder
    const files = await readdir(commitDir);
    // go one directory level above .versionGit in repopath.
    const parentDir = path.resolve(repoPath, "..");

    for (const file of files) {
      // coppy file from commitID and back into project directory.
      await copyFile(path.join(commitDir, file), path.join(parentDir, file));
    }

    console.log(`Commit ${commitID} reverted successfully!`);
  } catch (err) {
    console.error("Unable to revert : ", err);
  }
}

module.exports = { revertRepo };
