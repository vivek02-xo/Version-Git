const fs = require("fs").promises; // used to read, write, create, and delete files.
const path = require("path"); // used to manage file and folder paths.

async function initRepo() {
  // creating path for .visionGit folder in the current working directory.
  const repoPath = path.resolve(process.cwd(), ".versionGit");
  //   creating path for the commits folder inside .visionGit.
  const commitsPath = path.join(repoPath, "commits");

  try {
    // creating the .versionGit folder, recursive prevents errors.
    await fs.mkdir(repoPath, { recursive: true });
    // commit folder inside .versionGit
    await fs.mkdir(commitsPath, { recursive: true });

    await fs.writeFile(
      // config.json inside .versionGit.
      path.join(repoPath, "config.json"),
      //   converts the S3 bucket configuration into a JSON string.
      JSON.stringify({ bucket: process.env.S3_BUCKET }),
    );
    console.log("Repository initialised!");
  } catch (err) {
    console.error("Error initialising repository", err);
  }
}

// Exports the initRepo function so it can be used in other JavaScript files.
module.exports = { initRepo };