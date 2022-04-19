const generateID = require("../helpers/generateID");

const defaultName = "user";

exports.create = ({socket, users}) => {
  const user = {
    id: generateID(users),
    name: defaultName,
  };
  socket.data.user = user;
  users.push(user);
}

exports.changeName = ({socket, users, user}) => {
  socket.data.user = user;
  const userN = users.filter((item) => item.id === user.id)[0];
  userN.name = user.name;
}
