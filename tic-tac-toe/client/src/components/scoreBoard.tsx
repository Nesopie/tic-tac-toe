import { useContext }       from "react";
import { TicTacToeContext } from "../App";
import ScoreBoardItem       from "./scoreBoardItem";

import "./_styles/scoreBoard.css";

const ScoreBoard = (): JSX.Element => {
    const { userMarker, againstComputer, wins, ties, losses } = useContext(TicTacToeContext);

    return(
        <section className="score-board">
            <ScoreBoardItem 
                color={userMarker === "x" ? "blue" : "yellow"}
                upperText={ `${userMarker?.toLocaleUpperCase()} (YOU)` }
                lowerText={ `${wins}`}
            />
            <ScoreBoardItem 
                color={"silver"}
                upperText={ "TIES" }
                lowerText={ `${ties}`}
            />
            <ScoreBoardItem 
                color={userMarker === "x" ? "yellow" : "blue"}
                upperText={ `${userMarker === "x" ? "O" : "x" } ${againstComputer ? "(CPU)" : "(P2)"}` }
                lowerText={ `${losses}`} // my losses are computer's wins
            />
        </section>
    );
}

export default ScoreBoard;