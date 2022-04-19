const generateID = require("../helpers/generateID");

const defaultName = "canvas";
const defaultDesc = "No description";

exports.create = ({ socket, rooms, room }) => {
  const roomN = {
    id: generateID(rooms),
    name: room.name || defaultName,
    desc: room.desc || defaultDesc,
    password: room.password || "",
    users: [],
  };
  rooms.push(roomN);
};

exports.delete = ({ socket, rooms, room, user }) => {
  const roomN = rooms.filter((item) => item.id === room.id)[0];
  if (roomN.users[0]?.id !== user?.id) return;
  socket.emit("room:user-kick")
  const index = rooms.findIndex((item) => item.id === room.id);
  rooms.splice(index, 1);
};

exports.userJoin = ({ socket, rooms, room, user }) => {
  const roomN = rooms.filter((item) => item.id === room.id)[0];
  roomN.users.push(user);
  if (roomN.users.length === 1) return;
  const userM = roomN.users[0]; // main user
  socket.emit("room:user-get-canvas", { user }); // only to main user
};

exports.userGetCanvas = ({ canvas, user }) => {
  // Just emit it back to specific user
};

exports.userLeft = ({ socket, rooms, room, user }) => {
  if (!room?.id) return;
  const roomN = rooms.filter((item) => item.id === room.id)[0];
  const index = roomN.users.findIndex((item) => item.id === user.id);
  roomN.users.splice(index, 1);
  if (roomN.users.length !== 0) return;
  const indexR = rooms.findIndex((item) => item.id === room.id);
  rooms.splice(indexR, 1);
};
