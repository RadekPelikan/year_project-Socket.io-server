const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const PORT = process.env.PORT || 3001;

const socketEvents = require("./socket")

app.use(morgan("dev"));
app.use(express.json());

app.use(express.static('public'))

app.get("/*", (req, res) => {
  if (req.path === "/") return
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});
socketEvents(io)

server.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
