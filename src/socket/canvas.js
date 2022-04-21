const generateID = require("../helpers/generateID");

const defaultName = "user";

exports.tool = ({socket, rooms, users, room, user}) => {
  // Just emit it back to all users in the room
}

exports.color = ({socket, rooms, users, room, user}) => {
  // Just emit it back to all users in the room
}

exports.layerCreate = ({ socket, rooms, users, room, user}) => {
  // Just emit it back to all users in the room
  const roomN = rooms.filter((item) => item.id === room.id)[0]
  const id = generateID(roomN.layers)
  roomN.layers.push({id})
  return id;
}

exports.layerMove = ({socket, rooms, users, room, user}) => {
  // Just emit it back to all users in the room
}

exports.layerDelete = ({socket, rooms, users, room, user}) => {
  // Just emit it back to all users in the room
}

exports.layerVisible = ({socket, rooms, users, room, user}) => {
  // Just emit it back to all users in the room
}
