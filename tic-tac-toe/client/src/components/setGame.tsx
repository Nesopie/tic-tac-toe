import { IAppProps } from "../App";
import iconO         from "../assets/icon-o.svg";
import iconX         from "../assets/icon-x.svg";
import MarkerSelect  from "./markerSelect";
import NewGameButton from "./newGameButton";

import "./_styles/setGame.css"

const SetGame = (): JSX.Element => {

    return(
        <section className="set-game-container">
            <div className="icons">
                <img src={iconX}/>
                <img src={iconO}/>
            </div>  
            <MarkerSelect />
            <div className="new-game-container">
                <NewGameButton 
                    color="yellow"
                    buttonText="NEW GAME (VS CPU)"
                    againstComputer={true}
                />
                <NewGameButton 
                    color="blue"
                    buttonText="NEW GAME (VS PLAYER)"
                    againstComputer={false}
                />
            </div>
        </section>
    )
}

export default SetGame;