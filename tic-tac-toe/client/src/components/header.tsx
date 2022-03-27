import TurnIndicater from "./turnindicator";
import iconO         from "../assets/icon-o.svg";
import iconX         from "../assets/icon-x.svg";
import RefreshButton from "./refreshButton";

import "./_styles/header.css"

export interface IHeaderProps {
    currentTurn: "x" | "o" | null;
}

const Header = (props: IHeaderProps): JSX.Element => {
    return(
        <header>
            <span style={{padding: "8px"}}>
                <img src={iconO}></img>
                <img src={iconX}></img>
            </span>
            <TurnIndicater />
            <RefreshButton />
        </header>
    )
}

export default Header;