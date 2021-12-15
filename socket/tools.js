const toolsMiddleware = require("../middlewares/tools");

const tools = (io) => {
  io.on("connection", (socket) => {
    console.log("user connected");

    socket.on("tool-pencil", toolsMiddleware.pencilBack);

    socket.on("tool-bucket", toolsMiddleware.bucketBack);

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};

module.exports = tools;
