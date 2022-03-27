import { useContext, useState } from 'react';
import { Typography }           from "@mui/material";
import { TicTacToeContext }     from '../App';
import Button                   from './button';
import RefreshIcon              from '../assets/icon-restart.svg';
import MyModal                  from './MyModal'

const modalTitle = {
    color: 'var(--silver)',
    textAlign: 'center',
    letterSpacing: '2px'
}

const RefreshButton = (): JSX.Element => {
    const [ openModal, setOpenModal ] = useState<boolean>(false);
    const { setGameState } = useContext(TicTacToeContext);
    const handleClick = () => {
        setOpenModal(true);
    }

    const restart = () => {
        setGameState((previousGame) => {
            return {
                ...previousGame,
                ticTacToe: Array(9).fill(null),
                currentTurn: "x",
                playerWin: null
            }
        });
        setOpenModal(false);
    }

    const cancel = () => {
        setOpenModal(false);
    }

    return(
        <>
            <Button 
                handleClick={handleClick}
                color={"silver refresh-button"}
            >  
                <img src={RefreshIcon}/>
            </Button>
            <MyModal
                button1Text='NO, CANCEL'
                button1Action={ cancel }
                button2Text='YES, RESTART'
                button2Action={ restart }
                openModal={ openModal }
                setOpenModal={ () => setOpenModal(false) }
            >
                <Typography variant="h5" sx={modalTitle}>
                        RESTART GAME?
                </Typography>
            </MyModal>
        </>
    )
}

export default RefreshButton;