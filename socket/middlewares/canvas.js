function changeBg(data) {
  // console.log(data)
  this.broadcast.emit("canvas-changeBg", data);
}

module.exports = {
  changeBg,
};
