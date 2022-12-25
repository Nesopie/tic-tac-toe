const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.static("build"));
app.use(cors());
app.use(bodyParser.json());

const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
const io = new Server(server, { cors: { origin: "*" } });

let rooms = {};
let roomsMeta = {
    test: {
        created: Date.now(),
        members: 0,
    },

    random: {
        created: Date.now(),
        members: 0,
    },

    ssd: {
        created: Date.now(),
        members: 0,
    },
};

io.on("connection", async (socket: any) => {
    let currentRoom = "";

    socket.on("create room", (roomName) => {
        roomsMeta[roomName] = {
            created: Date.now(),
            members: 0,
        };
    });

    socket.on("join room", (roomName, gameState) => {
        socket.join(roomName);
        if (roomsMeta[roomName].members == 1) {
            gameState.userMarker = "o";
            roomsMeta[roomName].members = 2;
        } else if (roomsMeta[roomName].members == 0) {
            roomsMeta[roomName].members = 1;
        }
        rooms[roomName] = gameState.ticTacToe;
        if (roomsMeta[roomName].members == 2) {
            socket
                .to(roomName)
                .emit(
                    "joined room",
                    { ...gameState, userMarker: "x" },
                    roomName
                );
            socket.emit("joined room", gameState, roomName);
        }
        socket.broadcast.emit("get rooms", roomsMeta);
        socket.emit("get rooms", roomsMeta);
        currentRoom = roomName;
    });

    socket.on("new state", (roomName, ticTacToe) => {
        socket.to(roomName).emit("new state", ticTacToe);
    });

    socket.on("game over", (roomName, conclusion) => {
        socket.to(roomName).emit("game over", conclusion);
    });

    socket.on("get rooms", () => {
        socket.emit("get rooms", roomsMeta);
    });

    socket.on("disconnect", () => {
        roomsMeta[currentRoom] && roomsMeta[currentRoom].members--;
        if (roomsMeta[currentRoom]?.members === 0) {
            delete roomsMeta[currentRoom];
            delete rooms[currentRoom];
        }
    });
});
