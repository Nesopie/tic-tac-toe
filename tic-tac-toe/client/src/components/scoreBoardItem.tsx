interface IScoreBoardProps {
    color: string;
    upperText: string;
    lowerText: string;
}

const ScoreBoardItem = (props: IScoreBoardProps): JSX.Element => {
    return(
        <div className={ `score-board-item ${props.color}` }>
            <div>{ props.upperText }</div>
            <div>{ props.lowerText }</div>
        </div>
    );
}

export default ScoreBoardItem;