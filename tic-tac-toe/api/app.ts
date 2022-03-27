const express          = require('express');
const { createServer } = require('http');
const { Server }       = require('socket.io');
const cors             = require('cors');
const bodyParser       = require('body-parser');

const PORT  = process.env.PORT || 3000;

const app = express();
app.use(express.static('build'));
app.use(cors());
app.use(bodyParser.json());

const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
const io = new Server(server, { cors: { origin: "*" } });

let players = {}

io.on('connection', async (socket: any) => {
    socket.join("some room");
    socket.on("playerChanged", (gameState) => {
        socket.to("some room").emit("changedPlayer", gameState );
    });

    socket.on('join room', (gameState) => {
        console.log("hi");
        players[socket.id] = gameState;
        if(Object.keys(players).length % 2 === 0) {
            for(let player in players) {
                if(players[player].unmatched === true) {
                    players[player].opponent = socket.id;
                    players[socket.id].opponent = player;
                    
                    players[player].unmatched = false;
                    delete players[player].unmatched;
                    players[player].startGame = players[socket.id].startGame = true;

                    if(players[socket.id].userMarker === players[player].userMarker) {
                        players[socket.id].userMarker = players[player].userMarker === "x" ? "o" : "x";
                    }

                    io.emit("match found", players[player], players[socket.id]);

                    console.log(players);
                    break;
                }
            }
        }else {
            players[socket.id].unmatched = true;
        }
    });
});
