const generateID = require("../helpers/generateID");

const defaultName = "canvas";
const defaultDesc = "No description";

exports.create = ({ socket, rooms, room }) => {
  room.size.width = parseInt(room.size?.width);
  room.size.height = parseInt(room.size?.height);
  const roomN = {
    id: generateID(rooms),
    name: room.name || defaultName,
    desc: room.desc || defaultDesc,
    open: true,
    users: [],
    max: room.max > 0 ? room.max : -1,
    size: room.size || { width: 1000, height: 1000 },
    layers: [],
    color: 240
  };
  if (roomN.password) {
    passwords.push({
      id: roomN.id,
      password: room.password,
    });
  }
  rooms.push(roomN);
};

exports.delete = ({ socket, rooms, room, user }) => {
  const roomN = rooms.filter((item) => item.id === room.id)[0];
  if (roomN.users[0]?.id !== user?.id) return;
  socket.emit("room:user-kick");
  const index = rooms.findIndex((item) => item.id === room.id);
  rooms.splice(index, 1);
};

exports.userJoin = async ({ socket, rooms, room, users, user }) => {
  if (!user?.id) return;
  const roomN = await rooms.filter((item) => item.id == room.id)[0];
  if (!roomN.open) return socket.emit("room:user-kick");
  if (roomN.users.length == roomN.max) return socket.emit("room:user-kick");
  socket.join(room.id);
  user.room = room.id;
  socket.data.user = user;
  users.forEach((item, index) => item.id === user.id && (users[index] = user));
  roomN.users.push(user);
  socket.emit("room:user-join:done", { room });
};

exports.userLeft = ({ socket, rooms, room, user }) => {
  socket.leave(room.id);
  const roomN = rooms.filter((item) => item.id === room.id)[0];
  if (!roomN) return;
  const index = roomN.users.findIndex((item) => item.id === user.id);
  roomN.users.splice(index, 1);
  if (roomN.users.length !== 0) return;
  const indexR = rooms.findIndex((item) => item.id === room.id);
  rooms.splice(indexR, 1);
};

exports.exists = ({ socket, rooms, room, id }) => {
  const roomN = rooms.filter((item) => item.id == id)[0];
  if (!roomN) return socket.emit("room:user-kick");
  socket.emit("room:exists:done");
};

exports.switchOpen = ({ socket, rooms, room, user }) => {
  const roomN = rooms.filter((item) => item.id == room.id)[0];
  if (roomN.users[0].id !== user.id) return;
  roomN.open = !roomN.open;
  socket.emit("room:switchOpen:done", { open: roomN.open });
};

exports.getOpen = ({ socket, rooms, room, user }) => {
  const roomN = rooms.filter((item) => item.id == room.id)[0];
  if (roomN?.users[0].id !== user.id) return;
  socket.emit("room:get-open:done");
};

exports.getSize = ({ socket, rooms, room, user }) => {
  const roomN = rooms.filter((item) => item.id == room.id)[0];
  if (!roomN) return;
  socket.emit("room:get-size:done", roomN.size);
};
