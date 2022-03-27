export const minimax = (Matrix: Array<Array<"x" | "o" | null>>, isComputer: boolean, computerMarker: "x" | "o", playerMarker: "x" | "o") => {
    const score = evaluate(Matrix, computerMarker, playerMarker);

    if(score !== 0)
        return score;
    if(isMovesLeft(Matrix) === false)
        return 0;

    // Computer is the maximizer
    if(isComputer) {
        let best = -2;
        for(let i = 0; i < Matrix.length; i++) {
            for(let j = 0; j < Matrix[i].length; j++) {
                if(Matrix[i][j] === null) {
                    // do the move for the computer
                    Matrix[i][j] = computerMarker;
                    const currentMove = minimax(Matrix, false, computerMarker, playerMarker);
                    best = Math.max(best, currentMove);
                    Matrix[i][j] = null;
                    // undo the move (backtrack)
                }
            }
        }
        return best;
    }else {
        // this is the minimzer, find the worst value;
        let worst = 2;
        for(let i = 0; i < Matrix.length; i++) {
            for(let j = 0; j < Matrix[i].length; j++) {
                if(Matrix[i][j] === null) {
                    // do the move for the player
                    Matrix[i][j] = playerMarker;
                    const currentMove = minimax(Matrix, true, computerMarker, playerMarker);
                    worst = Math.min(worst, currentMove);
                    // undo the player move
                    Matrix[i][j] = null;
                }
            }
        }
        return worst;
    }
}

const isMovesLeft = (Matrix: Array<Array<"x" | "o" | null>>) => {
    for(let i = 0; i < Matrix.length; i++) {
        for(let j = 0; j < Matrix[i].length; j++) {
            if(Matrix[i][j] === null)
                return true;
        }
    }
    return false;
}

const evaluate = (Matrix: Array<Array<"x" | "o" | null>>, computerMarker: "x" | "o", playerMarker: "x" | "o") => {
    // check just checks if winner exists given an index, this one evaluates the whole board
    // check the rows
    for(let i = 0; i < Matrix.length; i++) {
        let allEqual = true;
        let rowStart = Matrix[i][0];
        for(let j = 0; j < Matrix[i].length; j++) {
            if(Matrix[i][j] !== rowStart) {
                allEqual = false;
                break;
            }
        }
        if(allEqual) {
            if(rowStart === computerMarker){
                return 1;
            }
            else if(rowStart === playerMarker) 
                return -1;
        }
    }

    // check the columns 
    for(let j = 0; j < Matrix.length; j++) {
        let allEqual = true;
        let columnStart = Matrix[0][j];
        for(let i = 0; i < Matrix[j].length; i++) {
            if(Matrix[i][j] !== columnStart) {
                allEqual = false;
                break;
            }
        }

        if(allEqual) {
            if(columnStart === computerMarker)
                return 1;
            else if(columnStart === playerMarker) 
                return -1;
        }
    }

    // check left to right diagonal
    let i = 0;
    let j = 0;
    let diagonalStart = Matrix[0][0];
    let allEqual = true;

    while(i < Matrix.length && j < Matrix.length) {
        if(diagonalStart !== Matrix[i++][j++]) {
            allEqual = false;
            break;
        }
    }
    
    if(allEqual) {
        if(diagonalStart === computerMarker) 
            return 1;
        else if(diagonalStart === playerMarker) 
            return -1;
    }

    // check right to left diagonal
    i = 0;
    j = Matrix.length - 1;
    allEqual = true;
    diagonalStart = Matrix[0][j];

    while(i < Matrix.length && j >= 0) {
        if(Matrix[i++][j--] !== diagonalStart) {
            allEqual = false;
            break;
        }
    }

    if(allEqual) {
        if(diagonalStart === computerMarker)
            return 1;
        else if(diagonalStart === playerMarker) 
            return -1;
    }


    // if no one has won then return 0
    return 0;
}

export const makeMove = (Matrix: Array<Array<"x" | "o" | null>>, computerMarker: "x" | "o", playerMarker: "x" | "o")  => {
    let optimalMove = -2;
    const move = {
        row: -1,
        column: -1
    };

    for(let i = 0; i < Matrix.length; i++) {
        for(let j = 0; j < Matrix[i].length; j++) {
            if(Matrix[i][j] === null) {
                // computer has made the move
                Matrix[i][j] = computerMarker;
                // call minimax with false as it is the players move right now
                const currentMove = minimax(Matrix, false, computerMarker, playerMarker);
                // undo the move
                Matrix[i][j] = null;
                
                if(currentMove > optimalMove) {
                    optimalMove = currentMove;
                    move.row = i;
                    move.column = j;
                }
            }
        }
    }
    return move;
}