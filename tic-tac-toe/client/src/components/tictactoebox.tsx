import React, { useContext } from "react";
import { TicTacToeContext }  from "../App";
import iconO                 from "../assets/icon-o.svg";
import iconX                 from "../assets/icon-x.svg";

interface ITicTacToeBoxProps {
    value: "x" | "o" | null;
    index: number;
    // setIndex: React.Dispatch<React.SetStateAction<number | null>>;
    disabled: boolean;
}

const TicTacToeBox = (props: ITicTacToeBoxProps): JSX.Element => {
    const { currentTurn, setGameState, againstComputer, userMarker } = useContext(TicTacToeContext);

    const handleClick = (_event: React.MouseEvent<HTMLButtonElement>): void => {
        if(!props.disabled) {
            setGameState(
                (previousGame) => 
                    { 
                        return {
                            ...previousGame,
                            currentTurn: previousGame.currentTurn === "x" ? "o" : "x", 
                            ticTacToe: previousGame.ticTacToe.map(
                                (ticTacToeElement, index) => {
                                    return index === props.index 
                                        ? currentTurn 
                                        : ticTacToeElement
                                }
                            ),
                            index: props.index
                        }
                    }
                );
            // props.setIndex(props.index);
        }
    }

    return (
        <button onClick={handleClick} disabled={props.disabled || ((userMarker !== currentTurn))}>
            {props.value ? <img src={props.value === "x" ? iconX : iconO}/> : null}
        </button>  
    );
}

export default TicTacToeBox;