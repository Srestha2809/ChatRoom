import moment from 'moment';
import matColours from "./matColours.json" assert { type: "json" };


let color1 =
  matColours.colours[
  Math.floor(Math.random() * matColours.colours.length) + 1
  ];
let users = [{ chatName: "Admin", roomName: "Main", color: color1 }];
const msg1 = {};
const handleJoin = (socket, clientData) => {
  const { chatName, roomName } = clientData;

  const user = users.find((u) => u.chatName === chatName);
  if (user != null) {
    socket.emit("nameexists", "Name already taken, try a different name");
    return;
  }
  const roomExists = users.some((u) => u.roomName === roomName);

  // If room does not exist, add it to the users array
  if (roomExists === null) {
    users.push({ id: socket.id, chatName: chatName, roomName: roomName });
  }
  const color =
    matColours.colours[
    Math.floor(Math.random() * matColours.colours.length) + 1
    ];
  socket.join(roomName);
  users.push({ id: socket.id, chatName: chatName, roomName: roomName, color: color });
  const timestamp = moment().format("h:mm:ss a");

  Object.assign(msg1, {
    from: "Admin",
    chatName: `Welcome ${chatName}`,
    timestamp: timestamp,
    color: color1,
  });
  socket.emit("welcome", msg1);
  const msg3 = {
    from: "Admin",
    roomName: `${chatName} has joined the ${roomName} room!`,
    timestamp: timestamp,
    color: msg1.color,
  }
  socket
    .to(roomName)
    .emit("someonejoined", msg3);
};

const handleDisconnect = (socket, io) => {
  const user = users.find((user) => user.id === socket.id);

  if (user) {
    users = users.filter((u) => u.id !== socket.id);
    const timestamp = moment().format("h:mm:ss a");

    const msg2 = {
      from: "Admin",
      chatName: `${user.chatName} has left the room.`,
      timestamp: timestamp,
      color: msg1.color,
    }
    socket
      .to(user.roomName)
      .emit("someoneleft", msg2);
  }

};
const handleTyping = (socket, clientData) => {
  const msg = {
    from: clientData.from,
    text: `${clientData.from} is typing...`,

  };
  const user = users.find((u) => u.chatName === clientData.from);
  socket.to(user.roomName).emit("someoneistyping", msg);
};
const handleMessage = (io, socket, clientData) => {
  // get the current time using moment.js
  const timestamp = moment().format("h:mm:ss a");
  const user = users.find((u) => u.id === socket.id);
  if (user) {

    const message = {
      from: clientData.from,
      text: clientData.text,
      timestamp: timestamp,
      color: user.color,
    };

    // send the message to everyone in the room including the sender
    io.in(user.roomName).emit("newmessage", message);
    console.log(message);
  }
};
const handleGetRoomsAndUsers = (io) => {
  const rooms = [...new Set(users.map(user => user.roomName))];
  console.log(rooms);
  io.emit("roomsAndUsers", { rooms, users });
};

export default { handleJoin, users, handleDisconnect, handleTyping, handleMessage, handleGetRoomsAndUsers };

