const fs = require("fs").promises; // used to read, write, create, and delete files.
const path = require("path"); // used to manage file and folder paths.
const { v4: uuidv4 } = require("uuid"); // creates unique ID's we assign for diff commits.

async function commitRepo(message) {
  // path for .versionGit
  const repoPath = path.resolve(process.cwd(), ".versionGit");
  // path for staging folder
  const stagedPath = path.join(repoPath, "staging");
  //   path for commit folder
  const commitPath = path.join(repoPath, "commits");

  try {
    // creating unique ID for commit
    const commitID = uuidv4();
    // name of folder is ID of commit
    const commitDir = path.join(commitPath, commitID);
    // creating folder by the name of commit ID
    await fs.mkdir(commitDir, { recursive: true });

    // Coping all files rom staging folder to commit folder
    const files = await fs.readdir(stagedPath);
    for (const file of files) {
      await fs.copyFile(
        path.join(stagedPath, file),
        path.join(commitDir, file),
      );
    }

    // storing commit info.
    await fs.writeFile(
      path.join(commitDir, "commit.json"),
      JSON.stringify({ message, date: new Date().toISOString() }),
    );

    console.log(`Commit ${commitID} created with message: ${message}`);
  } catch (err) {
    console.error("Error committing files : ", err);
  }
}

module.exports = { commitRepo };
