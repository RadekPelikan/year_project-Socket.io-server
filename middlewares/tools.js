function pencilBack (data) {
  console.log(this)
  this.broadcast.emit("tool-pencil", data);
};

function bucketBack (data) {
  this.broadcast.emit("tool-bucket", data)
}

module.exports = {
  pencilBack,
  bucketBack,
};
