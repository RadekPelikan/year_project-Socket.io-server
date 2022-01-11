const canvasMiddleware = require("./middlewares/canvas");

module.exports = (io, socket) => {
  socket.on("canvas-changeBg", canvasMiddleware.changeBg);
};
