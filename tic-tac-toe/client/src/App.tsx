import { useState, createContext, useEffect, useContext } from 'react';
import io, { Socket }                         from 'socket.io-client'
import Header                                 from './components/header';
import TicTacToe                              from './components/tictactoe';
import SetGame                                from './components/setGame';
import ScoreBoard                             from './components/scoreBoard';

import "./App.css";
import { arrayToMatrix, checkWinner, getColumnFromIndex, getRowFromIndex } from './utils/helper';

export interface IAppProps {
    userMarker: "x" | "o" | null;
    wins: number;
    losses: number;
    ties: number;
    currentTurn: "x" | "o" | null;
    startGame: boolean;
    playerWin: boolean | null;
    againstComputer: boolean;
    ticTacToe: Array<"x" | "o" | null>;
    index: number | null;
    opponent?: string;
}

export interface IContextProps extends IAppProps {
    setGameState: React.Dispatch<React.SetStateAction<IAppProps>>;
    socket?: Socket;
}

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
    setGameState: () => {}
});

const socket = io('http://localhost:3000')

const App = (): JSX.Element => {
    const [ gameState, setGameState ] = useState<IAppProps>({
        userMarker: "x",
        wins: 0,
        losses: 0,
        ties: 0,
        currentTurn: "x",
        startGame: false,
        playerWin: null,
        againstComputer: false,
        ticTacToe: Array(9).fill(null),
        index: null
    });

    useEffect(() => {
        if(!gameState.againstComputer && gameState.startGame) { // if not against computer and game has started
            socket.emit("playerChanged", gameState); //playerChanged is for when someone has completed a turn so now you change players
            let playerWin = checkWinner(arrayToMatrix(gameState.ticTacToe), getRowFromIndex(gameState.index, gameState.ticTacToe.length) as number, getColumnFromIndex(gameState.index, gameState.ticTacToe.length) as number, gameState.userMarker);
            if(playerWin !== null) {
                setTimeout(() => {
                    if(gameState.index !== null)
                    setGameState((previousGame) => {
                        return {
                            ...previousGame,
                            playerWin
                        }
                    })
                }, 1000);
            }
        }
    }, [gameState.currentTurn]);

    socket.on("match found", (player1GameState, player2GameState) => {
        if(socket.id === player1GameState.opponent) {
            setGameState(player2GameState);
        }else {
            setGameState(player1GameState);
        }
    });

    socket.on("changedPlayer", (gameState) => {
        setGameState((previousGame) => {
            return {
                ...previousGame,
                currentTurn: gameState.currentTurn,
                ticTacToe: gameState.ticTacToe,
                index: gameState.index
            }
        });
    });

    return(
        <TicTacToeContext.Provider value={ { ...gameState, setGameState, socket } }>
            {
                gameState.startGame ?
                    <div className="tic-tac-toe-container">
                        <Header 
                            currentTurn={gameState.currentTurn}
                        />
                        <TicTacToe />
                        <ScoreBoard />
                    </div> 
                :
                <SetGame />
            }
        </TicTacToeContext.Provider>
    )
}

export default App;