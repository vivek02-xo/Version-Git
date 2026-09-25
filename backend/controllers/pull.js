const fs = require("fs").promises; // used to read, write, create, and delete files.
const path = require("path"); // used to manage file and folder paths.
const { s3, S3_BUCKET } = require("../config/aws-config"); // Geting S3 client and bucket name.

async function pullRepo() {
  // creating path for .visionGit folder in the current working directory.
  const repoPath = path.resolve(process.cwd(), ".versionGit");
  //   creating path for the commits folder inside .visionGit.
  const commitsPath = path.join(repoPath, "commits");

  try {
    // Get all files stored inside the "commits/"" folder in S3.
    const data = await s3
      .listObjectsV2({
        Bucket: S3_BUCKET, //name of S3 bucket
        Prefix: "commits/",
      })
      .promise();

    const objects = data.Contents;

    // Loop through every commit stored in S3
    for (const object of objects) {
      const key = object.Key;

      // Create the local directory path where this commit will be stored.
      const commitDir = path.join(
        commitsPath,
        path.dirname(key).split("/").pop(),
      );

      // Create the directory if it doesnt exist.
      await fs.mkdir(commitDir, { recursive: true });

      const params = {
        Bucket: S3_BUCKET,
        Key: key,
      };

      // Download the commit file from S3.
      const fileContent = await s3.getObject(params).promise();
      // save the downloaded commits
      await fs.writeFile(path.join(repoPath, key), fileContent.Body);

      console.log("All commits pulled from S3.");
    }
  } catch (err) {
    console.error("Unable to pull : ", err);
  }
}

module.exports = { pullRepo };
