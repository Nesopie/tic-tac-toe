import { useState } from "react";
import iconO from "../assets/icon-o.svg";
import iconX from "../assets/icon-x.svg";
import MarkerSelect from "./markerSelect";
import NewGameButton from "./newGameButton";
import Rooms from "./Rooms";
import "./_styles/setGame.css";

const SetGame = (): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="set-game-container">
            <div className="icons">
                <img src={iconX} />
                <img src={iconO} />
            </div>
            <MarkerSelect />
            <div className="new-game-container">
                <NewGameButton
                    color="yellow"
                    buttonText="NEW GAME (VS CPU)"
                    againstComputer={true}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
                <NewGameButton
                    color="blue"
                    buttonText="NEW GAME (VS PLAYER)"
                    againstComputer={false}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
            </div>
            <Rooms
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </section>
    );
};

export default SetGame;
