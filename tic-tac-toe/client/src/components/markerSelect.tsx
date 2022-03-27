import { useContext }       from "react";
import uniqid               from "uniqid";
import io                   from 'socket.io-client'
import { TicTacToeContext } from "../App";
import iconNavyDarkO        from "../assets/icon-o-navy-dark.svg";
import iconNavyDarkX        from "../assets/icon-x-navy-dark.svg";
import iconSilverO          from "../assets/icon-o-silver.svg";
import iconSilverX          from "../assets/icon-x-silver.svg";

import "./_styles/markerSelect.css";

const socket = io('http://localhost:3000', {
    rejectUnauthorized: false
});

const MarkerSelect = (): JSX.Element => {
    const { setGameState, ...gameState } = useContext(TicTacToeContext);

    const setMarker = () => {
        console.log("hi");
        console.log(socket);
        socket.emit("setOpponentMarker", gameState.userMarker);
        setGameState((previousGame) => { return { ...previousGame, userMarker: previousGame.userMarker === "x" ? "o" :"x"} });
    }

    return(
        <section className="marker-select-container">
            <div style={{ color: "var(--silver)", textAlign: "center", fontWeight: "800", fontSize: "1rem" }}>PICK PLAYER 1'S MARK</div>
            <div className="marker-select" selected-mark={ gameState.userMarker }>
                <div onClick={ setMarker } key={ uniqid() }>
                    <img src={ gameState.userMarker === "o" ? iconNavyDarkO : iconSilverO }/>
                </div>  
                <div onClick={ setMarker } key={ uniqid() }>
                    <img src={ gameState.userMarker === "x" ? iconNavyDarkX : iconSilverX }/>
                </div>
            </div>
            <div style={{ color: "var(--silver)", textAlign: "center", fontWeight: "400", fontSize: "0.8rem" }}>REMEMBER : X GOES FIRST</div>
        </section>
    );
}

export default MarkerSelect;