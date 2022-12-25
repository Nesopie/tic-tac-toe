import React, { useContext } from "react";
import { TicTacToeContext } from "../App";
import iconO from "../assets/icon-o.svg";
import iconX from "../assets/icon-x.svg";
import {
    arrayToMatrix,
    checkWinner,
    getColumnFromIndex,
    getRowFromIndex,
} from "../utils/helper";

interface ITicTacToeBoxProps {
    value: "x" | "o" | null;
    index: number;
    disabled: boolean;
}

const TicTacToeBox = (props: ITicTacToeBoxProps): JSX.Element => {
    const { currentTurn, setGameState, userMarker, index } =
        useContext(TicTacToeContext);

    const handleClick = (_event: React.MouseEvent<HTMLButtonElement>): void => {
        if (!props.disabled) {
            setGameState((previousGame) => {
                const newTicTacToe = previousGame.ticTacToe.map(
                    (ticTacToeElement, index) => {
                        return index === props.index //props.index is the index of the tictactoebox and index is the index at which the latest move was made
                            ? currentTurn
                            : ticTacToeElement;
                    }
                );
                return {
                    ...previousGame,
                    currentTurn: previousGame.currentTurn === "x" ? "o" : "x",
                    ticTacToe: newTicTacToe,
                    index: props.index,
                    playerWin: checkWinner(
                        arrayToMatrix(newTicTacToe),
                        getRowFromIndex(index, newTicTacToe.length),
                        getColumnFromIndex(index, newTicTacToe.length),
                        userMarker
                    ),
                };
            });
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={props.disabled || userMarker !== currentTurn}
        >
            {props.value ? (
                <img
                    src={props.value === "x" ? iconX : iconO}
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "70%",
                        height: "70%",
                        transform: "translate(-50%, -50%)",
                    }}
                />
            ) : null}
        </button>
    );
};

export default TicTacToeBox;
