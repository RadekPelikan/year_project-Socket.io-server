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

app.use(morgan("dev"));
app.use(express.json());

app.use(express.static("public"));

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/index.html");
// });

require("./socket/connections/_connection")(io);
require("./socket/connections/tools")(io);
require("./socket/connections/chat")(io);
require("./socket/connections/canvas")(io);

server.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
