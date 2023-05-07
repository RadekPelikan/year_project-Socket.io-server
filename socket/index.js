const generateID = require("../helpers/generateID");
const userEvents = require("./user");
const roomEvents = require("./room");
const canvEvents = require("./canvas");

/*
// SERVER SIDE
// Users identified by id
const user = {
  id,
  name,
  room id
}

// Rooms identified by id
const room = {
  id,
  name,
  desc,
  password,
  users: [],
}
*/

/*
// CLIENT SIDE
const user = {
  id,
  name,
  tools: {
    activeL,
    activeT,
    color,
    size,
    mouseX,
    mouseY,
    pmouseX,
    pmouseY
  }
}

// Creating room
const room = {
  id,
  name,
  desc,
  password
  users: []
}
*/
const users = [];
const rooms = [];

module.exports = (io) => {
  io.on("connection", (socket) => {
    userEvents.create({ socket, users });

    console.log(`{${users.length}} ${socket.data.user.name} connected`);

    socket.emit("user:created", { user: socket.data.user });

    socket.on("user:change-name", ({ user }) => {
      userEvents.changeName({ socket, users, user });
      socket.emit("user:change-name:done", { user: socket.data.user });
    });

    socket.on("room:create", ({ room }) => {
      roomEvents.create({ socket, rooms, room });
      io.emit("room:create:done", { rooms });
      socket.emit("room:create:done:join", { rooms });
    });

    socket.on("room:delete", ({ room, user }) => {
      roomEvents.delete({ socket, rooms, room, user });
      io.emit("room:delete:done", { rooms });
    });

    socket.on("room:get", () => {
      io.emit("room:get:done", { rooms });
    });

    socket.on("room:user-join", ({ room, user }) => {
      roomEvents.userJoin({ socket, rooms, room, users, user });
      io.emit("room:get:done", { rooms });
      const roomN = rooms.filter((item) => item.id === room.id)[0];
      socket.to(room.id).emit("room:user-join:done", { room, users: roomN.users });
      socket.emit("room:user-join:done", { room, users: roomN.users });
    });

    socket.on("room:user-left", ({ room, user }) => {
      roomEvents.userLeft({ socket, rooms, room, user });
      io.emit("room:get:done", { rooms });
      io.emit("room:user-left:done", { room });
    });

    socket.on("room:user-get", ({room}) => {
      const roomN = rooms.filter((item) => item.id === room.id)[0];
      if (roomN === undefined) return
      socket.emit("room:user-get:done", {users: roomN.users})
    })

    socket.on("room:exists", ({ id }) => {
      roomEvents.exists({ socket, rooms, id });
    });

    socket.on("room:switch-open", ({ room, user }) => {
      roomEvents.switchOpen({ socket, rooms, room, user });
      io.emit("room:get:done", { rooms });
    });

    socket.on("room:get-open", ({ room, user }) => {
      roomEvents.getOpen({ socket, rooms, room, user });
    });

    socket.on("room:get-size", ({ user, room }) => {
      roomEvents.getSize({ socket, rooms, room, user })
    })

    // Tool used: pencil / eraser / bucket
    socket.on("room:canvas:tool", ({ room, user, tool}) => {
      canvEvents.tool({ socket, rooms, users, room, user, tool });
      socket.to(socket.data.user.room).emit("room:canvas:tool:done", { room, user, tool });
    });

    // Chane bg color of canvas
    socket.on("room:canvas:color", ({ room, user, color}) => {
      canvEvents.color({ socket, rooms, users, room, user, color });
      
    });

    // Layers create
    socket.on("room:canvas:layer-create", ({ room, user }) => {
      const id = canvEvents.layerCreate({ socket, rooms, users, room, user});
      socket.emit("room:canvas:layer-create:done", { id });
      socket.to(socket.data.user.room).emit("room:canvas:layer-create:done", { id });
    });

    // Layers moved
    socket.on("room:canvas:layer-move", ({ room, user, indexes }) => {
      canvEvents.layerMove({ socket, rooms, users, room, user, indexes });
    });

    // Layer delete
    socket.on("room:canvas:layer-delete", ({ room, user, id }) => {
      canvEvents.layerDelete({ socket, rooms, users, room, user ,id });
      socket.emit("room:canvas:layer-delete:done", { id });
      socket.to(socket.data.user.room).emit("room:canvas:layer-delete:done", { room, user, id });
    });

    // Layers get
    socket.on("room:canvas:layer-get", ({ room, user }) => {
      const roomN = rooms.filter((item) => item.id === room.id)[0]
      socket.emit("room:canvas:layer-get:done", { layers: roomN.layers });
    });

    // Switch if layer is visible or not
    socket.on("room:canvas:layer-visible", ({ room, user }) => {
      canvEvents.layerVisible({ socket, rooms, users, room, user });
      socket.to(socket.data.user.room).emit("room:canvas:layer-visible:done", { room, user });
    });

    socket.on("disconnect", () => {
      rooms.forEach((room, indexR) =>
        room.users.forEach((user, index) => {
          if (user.id !== socket.data.user.id) return;
          room.users.splice(index, 1);
          if (room.users.length === 0) rooms.splice(indexR, 1)
          io.emit("room:get:done", { rooms });
        })
      );
      const index = users.findIndex((item) => item.id === socket.data.user.id);

      users.splice(index, 1);
      console.log(`{${users.length}} ${socket.data.user.name} disconnected `);
    });
    
  });
};
