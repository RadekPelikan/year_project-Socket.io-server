const chatMiddleware = require("./middlewares/chat");

module.exports = (io, socket) => {
    socket.on("chat-message", chatMiddleware.message);
};
