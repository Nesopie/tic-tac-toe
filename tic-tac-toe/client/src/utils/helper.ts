export const arrayToMatrix = (array: Array<"x" | "o" | null>) => {
    const rows: number = Math.sqrt(array.length);
    const Matrix: Array<Array<"x" | "o" | null>> = [];

    let arrayIterator = 0;
    for(let i: number = 0; i < rows; i++) {
        Matrix.push([]);
        for(let j: number = 0; j < rows; j++) {
            Matrix[Matrix.length - 1].push(array[arrayIterator++]);
        }
    }

    return Matrix;
}

export const checkWinner = (Matrix: Array<Array<"x" | "o" | null>>, row: number, column: number, userMarker: "x" | "o" | null): boolean | null => {
    //new move has been made at Matrix[row][column], Matrix is a square matrix
    //check the rows
    if(row === null || column === null)
        return null;
    let initialValue = Matrix[row][0]; // first value in the row
    let winnerExists = true;
    for(let j = 0; j < Matrix.length; j++) {
        if(Matrix[row][j] !== initialValue) 
            winnerExists = false;
    }
    if(winnerExists && initialValue !== null) 
        return userMarker === initialValue;

    //check the columns
    initialValue = Matrix[0][column]; // first value in the column
    winnerExists = true;
    for(let i = 0; i < Matrix.length; i++) {
        if(Matrix[i][column] !== initialValue) 
            winnerExists = false;
    }

    if(winnerExists && initialValue !== null)
        return userMarker === initialValue;

    //check left to right diagonal
    initialValue = Matrix[0][0]; // start from top left
    winnerExists = true;
    for(let i = 0; i < Matrix.length; i++) {
        if(Matrix[i][i] !== initialValue)
            winnerExists = false;
    }

    if(winnerExists && initialValue !== null)
        return userMarker === initialValue;

    //check right to left diagonal
    initialValue = Matrix[0][Matrix.length - 1] // start from top right
    winnerExists = true;
    for(let i = 0; i < Matrix.length; i++) {
        if(Matrix[i][Matrix.length - i - 1] !== initialValue)
            winnerExists = false;
    }

    if(winnerExists && initialValue !== null)
        return userMarker === initialValue;

    return null;
}

export const getColumnFromIndex = (index: number | null, arrayLength: number): number | null => {
    if(index !== null)
        return index % Math.sqrt(arrayLength);
    return index;
}

export const getRowFromIndex = (index: number | null, arrayLength: number) : number | null => {
    if(index !== null)
        return Math.floor(index / Math.sqrt(arrayLength));
    return index;
}