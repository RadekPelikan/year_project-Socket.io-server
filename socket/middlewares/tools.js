function pencil(data) {
  // console.log(data)
  this.broadcast.emit("tool-pencil", data);
}

function eraser(data) {
  // console.log(data)
  this.broadcast.emit("tool-eraser", data);
}

function bucket(data) {
  // console.log(data)
  this.broadcast.emit("tool-bucket", data);
}

module.exports = {
  pencil,
  eraser,
  bucket,
};
