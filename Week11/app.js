import { port } from "./config.js";
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const streetLights = [
    { streetName: "Srestha", green: 12000, red: 7500, yellow: 3000 },
    { streetName: "Bharadwaj", green: 8000, red: 5000, yellow: 2000 },
    { streetName: "Info3139", green: 9000, red: 6000, yellow: 2000 },
];
// Socket.io server
const httpServer = http.createServer(app);
const io = new Server(httpServer, {});

io.on("connection", (socket) => {
    console.log("Connection established");
    // client has joined
    socket.on("join", (room) => {
        socket.join(room);
        console.log(`A client has joined ${room} room`);

        socket.emit(
            "welcome",
            `Welcome ${room}, currently there are ${getNumberOfUsersInRoom(
                room
            )} client(s) in the ${room} room`
        );

        socket.to(room).emit("newclient", `${room} has joined this room`);

        const lampData = streetLights.find((lights) => lights.streetName === room);

        if (lampData) {
            socket.emit("turnLampOn", lampData);
        }
    });
});

const getNumberOfUsersInRoom = (roomName) =>
    io.sockets.adapter.rooms.get(roomName).size;

app.use((req, res, next) => {
    const error = new Error("No such route found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || "Internal Server Error",
        },
    });
});

httpServer.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
