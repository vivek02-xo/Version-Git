const fs = require("fs").promises; // used to read, write, create, and delete files.
const path = require("path"); // used to manage file and folder paths.
const { s3, S3_BUCKET } = require("../config/aws-config.js"); // Geting S3 client and bucket name.

async function pushRepo() {
  // creating path for .visionGit folder in the current working directory.
  const repoPath = path.resolve(process.cwd(), ".versionGit");
  //   creating path for the commits folder inside .visionGit.
  const commitsPath = path.join(repoPath, "commits");

  try {
    // read all folder in commit dir .(each folder represent commit)
    const commitDirs = await fs.readdir(commitsPath);
    for (const commitDir of commitDirs) {
      // creates a cammit path.
      const commitPath = path.join(commitsPath, commitDir);
      // read all files in commit folder.
      const files = await fs.readdir(commitPath);

      for (const file of files) {
        // path for curr file.
        const filePath = path.join(commitPath, file);
        // real all content of file.
        const fileContent = await fs.readFile(filePath);
        // config object requirew by S3.
        const params = {
          // name of S3.
          Bucket: S3_BUCKET,
          // name of the file inside S3 bucket.
          Key: `commits/${commitDir}/${file}`,
          // content file.
          Body: fileContent,
        };

        // uploads file to S3 bucket.
        await s3.upload(params).promise();
      }
    }

    console.log("All commits pushed to S3.");
  } catch (err) {
    console.error("Error pushing to S3 : ", err);
  }
}

module.exports = { pushRepo };
