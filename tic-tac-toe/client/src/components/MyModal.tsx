import { Modal, Box, Typography } from "@mui/material";
import Button                     from "./button";
import "./_styles/myModal.css";


export interface IModalProps {
    children: React.ReactNode;
    button1Text: string;
    button1Action: React.MouseEventHandler<HTMLButtonElement>;
    button2Text: string;
    button2Action: React.MouseEventHandler<HTMLButtonElement>;
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const boxStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    bgcolor: 'var(--semi-dark-navy)',
    display: 'flex',  
    flexDirection: 'column',
    alignItems: 'center',
    padding: '3rem 5vw',
    gap: '1rem'
}

const MyModal = (props: IModalProps): JSX.Element => {
    return (
        <Modal
            open={props.openModal}
            onClose={() => props?.setOpenModal(false)}
        >
            <Box sx={boxStyle}>
                { props.children }
                <div className="modal-buttons">
                    <Button
                        handleClick={ props.button1Action }
                        color="silver"
                    >
                        { props.button1Text }
                    </Button>
                    <Button
                        handleClick={ props.button2Action }
                        color="yellow"
                    >
                        { props.button2Text }
                    </Button>
                </div>
            </Box>
        </Modal>
    );
}

export default MyModal;