import { useState, createContext, useEffect } from "react";
import io, { Socket } from "socket.io-client";
import Header from "./components/header";
import TicTacToe from "./components/tictactoe";
import SetGame from "./components/setGame";
import ScoreBoard from "./components/scoreBoard";

import "./App.css";

export interface IAppProps {
    userMarker: "x" | "o" | null;
    wins: number;
    losses: number;
    ties: number;
    currentTurn: "x" | "o" | null;
    startGame: boolean;
    playerWin: boolean | null | 0;
    againstComputer: boolean;
    ticTacToe: Array<"x" | "o" | null>;
    index: number | null;
    roomName: "";
}

export interface IContextProps extends IAppProps {
    setGameState: React.Dispatch<React.SetStateAction<IAppProps>>;
    socket: Socket;
}

const socket = io("http://localhost:3001");

export const TicTacToeContext = createContext<IContextProps>({
    userMarker: "x",
    wins: 0,
    losses: 0,
    ties: 0,
    currentTurn: "x",
    startGame: false,
    ticTacToe: Array(9).fill(null),
    playerWin: null, // false is for player loss, true is for player win and null is for no state has been reached and modals won't pop up
    againstComputer: false,
    index: null,
    setGameState: () => {},
    roomName: "",
    socket,
});

const App = (): JSX.Element => {
    const [gameState, setGameState] = useState<IAppProps>({
        userMarker: "x",
        wins: 0,
        losses: 0,
        ties: 0,
        currentTurn: "x",
        startGame: false,
        playerWin: null,
        againstComputer: false,
        ticTacToe: Array(9).fill(null),
        index: null,
        roomName: "",
    });

    useEffect(() => {
        if (gameState.currentTurn !== gameState.userMarker) {
            socket.emit("new state", gameState.roomName, gameState.ticTacToe);
        }
    }, [gameState.currentTurn]);

    useEffect(() => {
        socket.on("joined room", (gameState, roomName) => {
            setGameState({
                ...gameState,
                startGame: true,
                againstComputer: false,
                roomName,
            });
        });

        socket.on("new state", (ticTacToe) => {
            setGameState((prevState) => ({
                ...prevState,
                ticTacToe,
                currentTurn: prevState.currentTurn === "x" ? "o" : "x",
            }));
        });

        socket.on("game over", (conclusion) => {
            setGameState((prevState) => ({
                ...prevState,
                playerWin: conclusion,
            }));
        });
    }, []);

    return (
        <TicTacToeContext.Provider
            value={{ ...gameState, setGameState, socket }}
        >
            {gameState.startGame ? (
                <div className="tic-tac-toe-container">
                    <Header currentTurn={gameState.currentTurn} />
                    <TicTacToe />
                    <ScoreBoard />
                </div>
            ) : (
                <SetGame />
            )}
        </TicTacToeContext.Provider>
    );
};

export default App;
