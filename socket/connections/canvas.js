const canvasMiddleware = require("../middlewares/canvas");

const chat = (io) => {
  io.on("connection", (socket) => {
    socket.on("canvas-changeBg", canvasMiddleware.changeBg);
  });
};

module.exports = chat;
