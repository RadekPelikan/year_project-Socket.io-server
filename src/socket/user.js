const generateID = require("../helpers/generateID");

const defaultName = "user";

exports.create = ({socket, users, room}) => {
  const user = {
    id: generateID(users),
    name: defaultName,
    room: room || null,
  };
  socket.data.user = user;
  users.push(user);
}

exports.changeName = ({socket, users, user}) => {
  socket.data.user = user;
  const userN = users.filter((item) => item.id === user.id)[0];
  userN.name = user.name;
}
