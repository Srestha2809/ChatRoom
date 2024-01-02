import { port } from "./config.js";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import socketHandler from "./socketHandlers.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
let httpServer = http.createServer(app);
// set EST
process.env.TZ = "America/New_York";
app.get("/", (req, res) => res.send("<h1>Hello World From Express</h1>"));

// Socket.io server
const io = new Server(httpServer, {});


// main socket routine
io.on("connection", (socket) => {
  console.log("new connection established");
  // client has joined
  socket.emit("radio", socketHandler.users.map((user) => user.roomName));


  socket.on("join", (clientData) => {
    socketHandler.handleJoin(socket, clientData);
    socketHandler.handleGetRoomsAndUsers(io);
  });
  socket.on("typing", (clientData) => {
    socketHandler.handleTyping(socket, clientData);
  });
  socket.on("message", (clientData) => {
    socketHandler.handleMessage(io, socket, clientData);
  });
  socket.on("disconnect", () => {
    socketHandler.handleDisconnect(socket, io);
    socketHandler.handleGetRoomsAndUsers(io);
  });
});

// will pass 404 to error handler
app.use((req, res, next) => {
  const error = new Error("No such route found");
  error.status = 404;
  next(error);
});

// error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    },
  });
});

httpServer.listen(port, () => {
  console.log(`listening on port ${port}`);
});
