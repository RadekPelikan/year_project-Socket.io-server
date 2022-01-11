const toolsMiddleware = require("./middlewares/tools");

module.exports = (io, socket) => {
  socket.on("tool-pencil", toolsMiddleware.pencil);

  socket.on("tool-eraser", toolsMiddleware.eraser);

  socket.on("tool-bucket", toolsMiddleware.bucket);
};
