import { Typography }                                                      from '@mui/material';
import { useContext, useEffect, useState }                                 from 'react';
import { TicTacToeContext }                                                from '../App';
import { arrayToMatrix, checkWinner, getColumnFromIndex, getRowFromIndex } from "../utils/helper.ts";
import MyModal                                                             from './MyModal';
import TicTacToeBox                                                        from './tictactoebox';
import iconX                                                               from "../assets/icon-x.svg";
import iconO                                                               from "../assets/icon-o.svg";
import { makeMove }                                                        from "../utils/computer.ts";

import './_styles/tictactoe.css'

const modalTitleStyle = {
    textAlign: 'center',
    letterSpacing: '2px'
}

const TicTacToe = ():JSX.Element => {
    const { ticTacToe, setGameState, playerWin, userMarker, currentTurn, againstComputer, index } = useContext(TicTacToeContext);
    // const [ index, setIndex ] = useState<number | null>(null);

    useEffect(() => {
        if(index !== null) {
            let playerWin = checkWinner(arrayToMatrix(ticTacToe), getRowFromIndex(index, ticTacToe.length), getColumnFromIndex(index, ticTacToe.length), userMarker);
            if(playerWin !== null) {
                setTimeout(() => {
                    setGameState((previousGame) => {
                        return {
                            ...previousGame,
                            playerWin
                        }
                    })
                }, 1000);
            }
        }
    }, [ index, ticTacToe ]);

    useEffect(() => {
        if(againstComputer && currentTurn !== userMarker) {
            setTimeout(() => {
                const { row, column }: { row: number, column: number } = makeMove(arrayToMatrix(ticTacToe), userMarker === "x" ? "o" : "x", userMarker);
                const computerMoveIndex = (Math.sqrt(ticTacToe.length) * row) + column; 
                setGameState(
                    (previousGame) => 
                        { 
                            return {
                                ...previousGame,
                                currentTurn: previousGame.currentTurn === "x" ? "o" : "x", 
                                ticTacToe: previousGame.ticTacToe.map(
                                    (ticTacToeElement, index) => {
                                        return (index === computerMoveIndex
                                            ? currentTurn 
                                            : ticTacToeElement
                                        )
                                    }
                                ),
                                index: computerMoveIndex
                            }
                        }
                    );
            }, 2000 + (Math.random() * 1000));
        }
    }, [ currentTurn ])

    const nextGame = () => {
        setGameState((previousGame) => {
            return {
                ...previousGame,
                wins  : ticTacToe[index as number] === previousGame.userMarker ? previousGame.wins + 1   : previousGame.wins  ,
                losses: ticTacToe[index as number] !== previousGame.userMarker ? previousGame.losses + 1 : previousGame.losses,
                currentTurn: "x",
                ticTacToe: Array(9).fill(null),
                playerWin: null,
                index: null
            }
        });
        // setIndex(null);
    }

    const quit = () => {
        setGameState((previousGame) => {
            return {
                ...previousGame,
                wins: 0,
                losses: 0,
                ties: 0,
                currentTurn: "x",
                ticTacToe: Array(9).fill(null),
                playerWin: null,
                startGame: false,
                index: null
            }
        });
        // setIndex(null);
    }

    return(
        <section className="tic-tac-toe">
            {ticTacToe.map((ticTacToeElement, index) => {
                return(
                    <TicTacToeBox 
                        value={ ticTacToeElement } 
                        index={ index } 
                        // setIndex={ (newIndex) => setGameState((previousGame) =>{ return { ...previousGame, index: newIndex}}) }
                        disabled={ ticTacToeElement === null ? false : true }
                    />
                )
            })}
            <MyModal
                button1Text='QUIT'
                button1Action={ quit }
                button2Text='NEXT ROUND'
                button2Action={ nextGame }
                openModal={ playerWin === true }
                setOpenModal={ () => {} }
                >
                <div>
                    <Typography 
                        variant="h6" 
                        sx={ { ...modalTitleStyle, color: "var(--silver)" } }
                    >
                        YOU WON!
                    </Typography>
                        <div className="winner-display">
                        <img src={ userMarker === "x" ? iconX : iconO } />
                        <Typography 
                            variant="h5" 
                            sx={ {...modalTitleStyle, color: userMarker === "x" ? "var(--light-blue)" : "var(--light-yellow)" } }
                        >
                            TAKES THE ROUND
                        </Typography>
                    </div>
                </div>
            </MyModal>
            <MyModal
                button1Text='QUIT'
                button1Action={ quit }
                button2Text='NEXT ROUND'
                button2Action={ nextGame }
                openModal={ playerWin === false }
                setOpenModal={ () => {} }
            >
                <Typography 
                    variant="h6" 
                    sx={ { ...modalTitleStyle, color: "var(--silver)" } }
                >
                    OH NO, YOU LOST
                </Typography>
                    <div className="winner-display">
                    <img src={ userMarker === "x" ? iconO : iconX }/>
                    <Typography 
                        variant="h5" 
                        sx={ { ...modalTitleStyle, color: userMarker === "x" ? "var(--light-yellow)" : "var(--light-blue)"  } }
                    >
                        TAKES THE ROUND
                    </Typography>
                </div>
            </MyModal>
        </section>
    );
}

export default TicTacToe;