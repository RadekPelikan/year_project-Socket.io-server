// const connectionMiddleware = require("../middlewares/connection");

const connection = (io) => {
  io.on("connection", (socket) => {
    console.log("user connected");

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};

module.exports = connection;
