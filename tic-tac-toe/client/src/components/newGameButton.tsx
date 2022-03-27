import Button               from './button';
import { TicTacToeContext } from '../App';
import { useContext }       from 'react';

export interface INewGameButtonProps {
    color: string;
    buttonText: string;
    againstComputer: boolean;
}

const NewGameButton = (props: INewGameButtonProps): JSX.Element => {
    const { setGameState, socket, ...gameState } = useContext(TicTacToeContext);
    const handleClick = () => {
        setGameState((previousGame) => {
            return { 
                ...previousGame, 
                againstComputer: props.againstComputer
            } 
        });

        socket?.emit('join room', gameState, socket.id);
    }

    return (
        <Button
            color={ props.color }
            handleClick={ handleClick }
            buttonText={ props.buttonText }
        />
    );
}

export default NewGameButton;