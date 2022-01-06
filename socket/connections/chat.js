const chatMiddleware = require("../middlewares/chat");

const chat = (io) => {
  io.on("connection", (socket) => {
    socket.on("chat-message", chatMiddleware.message);

  });
};

module.exports = chat;
