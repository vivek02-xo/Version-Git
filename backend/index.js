// yargs help us to read arguments from terminal.
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

// Function of arguments.
const { initRepo } = require("./controllers/init.js");
const { addRepo } = require("./controllers/add.js");
const { commitRepo } = require("./controllers/commit.js");
const { pullRepo } = require("./controllers/pull.js");
const { pushRepo } = require("./controllers/push.js");
const { revertRepo } = require("./controllers/revert.js");

// What happen when we take argument from terminal. (called a function).
// yarg is reading arguments from terminal and calling a function of work on those arg.
yargs(hideBin(process.argv))
  .command("init", "Initialise a new repostiory", {}, initRepo)
  .command(
    "add <file>",
    "Add a file to the repository",
    (yargs) => {
      yargs.positional("file", {
        describe: "File to add to the staging area",
        type: "string",
      });
    },
    (argv) => {
      addRepo(argv.file);
    },
  )
  .command(
    "commit <message>",
    "Commit this staged files",
    (yargs) => {
      yargs.positional("message", {
        describe: "commit message",
        type: "string",
      });
    },
    (argv) => {
      commitRepo(argv.message);
    },
  )
  .command("push", "Push commits to S3", {}, pushRepo)
  .command("pull", "pull commit from S3", {}, pullRepo)
  .command(
    "revert <commitID>",
    "revert to specific commit",
    (yargs) => {
      yargs.positional("commitID", {
        describe: "Commit ID to revert to",
        type: "string",
      });
    },
    (argv) => {
      revertRepo(argv.commitID);
    },
  )
  .demandCommand(1, "You need atleast one command") // .demandCommand() ensures that the user must provide at least one command
  .help().argv;
