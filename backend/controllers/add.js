const fs = require("fs").promises; // used to read, write, create, and delete files.
const path = require("path"); // used to manage file and folder paths.

async function addRepo(filepath) {
  // Creating path for .versionGit folder in currunt dir.
  const repoPath = path.resolve(process.cwd(), ".versionGit");
  // creating path for staging folder
  const stagingPath = path.join(repoPath, "staging");

  try {
    // creating folder for staging
    await fs.mkdir(stagingPath, { recursive: true });
    // reading filename from filepath
    const fileName = path.basename(filepath);

    // coping file in staging folder
    await fs.copyFile(filepath, path.join(stagingPath, fileName));
    console.log(`File ${fileName} added to the staging area!`);
  } catch (err) {
    // if got error
    console.error("Error adding file : ", err);
  }
}

module.exports = { addRepo };
