const toolsMiddleware = require("../middlewares/tools");

const tools = (io) => {
  io.on("connection", (socket) => {
    socket.on("tool-pencil", toolsMiddleware.pencil);

    socket.on("tool-eraser", toolsMiddleware.eraser);

    socket.on("tool-bucket", toolsMiddleware.bucket);

  });
};

module.exports = tools;
