const generateID = require("../helpers/generateID");

const defaultName = "user";

exports.tool = ({ socket, rooms, users, room, user }) => {
  // Just emit it back to all users in the room
};

exports.color = ({ socket, rooms, users, room, user, color }) => {
  // Just emit it back to all users in the room
  const roomN = rooms.filter((item) => item.id === room.id)[0];
  if (!color)
    return socket.emit("room:canvas:color:done", { room, user, color: roomN.color });

  roomN.color = color;
  socket
    .to(socket.data.user.room)
    .emit("room:canvas:color:done", { room, user, color });
};

exports.layerCreate = ({ socket, rooms, users, room, user }) => {
  // Just emit it back to all users in the room
  const roomN = rooms.filter((item) => item.id === room.id)[0];
  const id = generateID(roomN.layers);
  roomN.layers.push({ id });
  return id;
};

exports.layerMove = ({ socket, rooms, users, room, user, indexes }) => {
  // Just emit it back to all users in the room
  const roomN = rooms.filter((item) => item.id === room.id)[0];
  const layer = roomN.layers;
  const i = indexes.map((i) => layer.length - 1 - i);
  const c = layer[i[0]];
  layer[i[0]] = layer[i[1]];
  layer[i[1]] = c;
  socket
    .to(socket.data.user.room)
    .emit("room:canvas:layer-move:done", { room, user, indexes });
};

exports.layerDelete = ({ socket, rooms, users, room, user }) => {
  // Just emit it back to all users in the room
};

exports.layerVisible = ({ socket, rooms, users, room, user }) => {
  // Just emit it back to all users in the room
};
