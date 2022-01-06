function message(data) {
  this.broadcast.emit("chat-message", data);
}

module.exports = {
  message,
};
