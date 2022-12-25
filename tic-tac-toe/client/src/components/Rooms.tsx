import { Box, Modal } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { TicTacToeContext } from "../App";

import "./_styles/rooms.css";

interface IModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const boxStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    bgcolor: "var(--semi-dark-navy)",
    alignItems: "center",
    padding: "3rem 5vw",
    gap: "1rem",
};

const Rooms = ({ isOpen, setIsOpen }: IModalProps) => {
    const { socket, ...gameState } = useContext(TicTacToeContext);
    const [roomName, setRoomName] = useState<string>("");
    const [rooms, setRooms] = useState<
        Record<string, { created: Date; members: number }>
    >({});

    useEffect(() => {
        socket?.emit("get rooms");
        socket?.on("get rooms", (roomsMeta) => {
            setRooms(roomsMeta);
        });
    }, []);

    const joinRoom = (event: React.MouseEvent<HTMLTableRowElement>) => {
        socket?.emit(
            "join room",
            (event.currentTarget.childNodes[1] as HTMLElement).innerHTML,
            gameState
        );
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setRoomName(event.target.value);
    };

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        socket.emit("create room", roomName);
        socket.emit("join room", roomName, gameState);
    };

    return (
        <Modal
            open={isOpen}
            onClose={() => setIsOpen(false)}
        >
            <Box sx={boxStyle}>
                <table className="rooms-table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Room Name</th>
                            <th>Members</th>
                            <th>Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(rooms).map((roomName, index) => {
                            const { members, created } = rooms[roomName];
                            return (
                                <tr onClick={joinRoom}>
                                    <td>{index + 1}</td>
                                    <td>{roomName}</td>
                                    <td>{members}</td>
                                    <td>{created}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div>
                    <form className="create-room">
                        <input
                            type="text"
                            onChange={handleChange}
                        />
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="blue"
                        >
                            Create room
                        </button>
                    </form>
                </div>
            </Box>
        </Modal>
    );
};

export default Rooms;
