const express = require("express");
const { Server } = require("socket.io");
var path = require('path');
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use("/", express.static(path.join(__dirname, "/client/testing")))

server.listen(3000, () => {
  console.log("socket listening on port 3000");
});

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});