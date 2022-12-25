import Button from "./button";
import { TicTacToeContext } from "../App";
import { useContext } from "react";

export interface INewGameButtonProps {
    color: string;
    buttonText: "NEW GAME (VS PLAYER)" | "NEW GAME (VS CPU)";
    againstComputer: boolean;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewGameButton = (props: INewGameButtonProps): JSX.Element => {
    const { setGameState, socket, ...gameState } = useContext(TicTacToeContext);
    const handleClick = () => {
        if (props.againstComputer) {
            setGameState((previousGame) => {
                return {
                    ...previousGame,
                    startGame: true,
                    againstComputer: props.againstComputer,
                };
            });
        } else {
            props.setIsOpen(true);
        }
    };

    return (
        <Button
            color={props.color}
            handleClick={handleClick}
            buttonText={props.buttonText}
        />
    );
};

export default NewGameButton;
