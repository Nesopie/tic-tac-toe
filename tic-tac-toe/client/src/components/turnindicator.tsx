import { useContext }       from "react";
import { TicTacToeContext } from "../App";
import iconO                from "../assets/icon-o.svg";
import iconX                from "../assets/icon-x.svg";

import "./_styles/turnindicator.css";

const TurnIndicater = (): JSX.Element => {  
    const { currentTurn } = useContext(TicTacToeContext);
    
    return(
        <div className="turn-indicater">
            <img src={ currentTurn === "x" ? iconX : iconO }/>
            <span>Turn</span>
        </div>
    );
}

export default TurnIndicater;