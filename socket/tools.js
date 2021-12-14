const toolsMiddleware = require("../middlewares/tools")

const tools = (io) => {
  io.on("connection", (socket) => {
    console.log("user connected");

    socket.on("pencil", toolsMiddleware.sendBack);

    socket.on("bucket", toolsMiddleware.sendBack)

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};

module.exports = tools;
