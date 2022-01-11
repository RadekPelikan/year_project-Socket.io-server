const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const PORT = 3000 | process.env.PORT;

const canvasHandlers = require("./socket/canvas")
const toolsHandlers = require("./socket/tools")
const chatHandlers = require("./socket/chat")

app.use(morgan("dev"));
app.use(express.json());

app.use(express.static("public"));

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/index.html");
// });

const onConnection = (socket) => {
  canvasHandlers(io, socket);
  toolsHandlers(io, socket);
  chatHandlers(io, socket);
}

io.on("connection", onConnection);

server.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
