const express = require("express"); // web framwork for node.js
const dotenv = require("dotenv"); // this loads environment variables
const cors = require("cors"); // connect one origin of web page to another
const mongoose = require("mongoose"); // library for mondodb work
const bodyParser = require("body-parser"); // read data from http request and put in req.body object
const http = require("http"); // create http server or handle http request
const { Server } = require("socket.io");

const mainRouter = require("./routes/main.router.js");

dotenv.config();
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
  .command("start", "Starts a new server", {}, startServer) // cause we need command
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

function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(bodyParser.json());
  app.use(express.json());

  const mongoURI = process.env.MONGODB_URI;

  // mongo connection
  mongoose
    .connect(mongoURI)
    .then(() => console.log("MongoDB cnnected!"))
    .catch((err) => console.error("Unable to connect, ", err));

  app.use(cors({ origin: "*" }));
  app.use("/", mainRouter);

  const httpServer = http.createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinRoom", (userID) => {
      user = userID;
      console.log("=====");
      console.log(user);
      console.log("=====");
      socket.join(userID);
    });
  });

  const db = mongoose.connection;

  db.once("open", async () => {
    console.log("CRUD operations called");
  });

  httpServer.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
  });
}
