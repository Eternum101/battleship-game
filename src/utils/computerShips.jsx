export const randomizeComputerShips = (computerBoard) => {
    const newcomputerBoard = computerBoard.map(row => row.slice());
    const newRandomShips = [];
    const newShips = [
        { length: 5, orientation: 'horizontal' },
        { length: 4, orientation: 'horizontal' },
        { length: 3, orientation: 'horizontal' },
        { length: 3, orientation: 'horizontal' },
        { length: 2, orientation: 'horizontal' }
    ];

    newShips.forEach(ship => {
        const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
        let row, col;

        do {
            row = Math.floor(Math.random() * computerBoard.length);
            col = Math.floor(Math.random() * computerBoard[0].length);
        } while (!isValidRandomPlacement(row, col, ship.length, orientation, newRandomShips, newcomputerBoard));

        for (let k = 0; k < ship.length; k++) {
            if (orientation === 'horizontal') {
                newcomputerBoard[row][col + k] = "ship";
                newRandomShips.push({ row, col: col + k });
            } else {
                newcomputerBoard[row + k][col] = "ship";
                newRandomShips.push({ row: row + k, col });
            }
        }
    });
    return newcomputerBoard;
};

const isValidRandomPlacement = (row, col, length, orientation, randomShips, computerBoard) => {
    const isAdjacent = (r, c) => randomShips.some(ship => Math.abs(ship.row - r) <= 1 && Math.abs(ship.col - c) <= 1);

    if (orientation === 'horizontal') {
        if (col + length > computerBoard[0].length) return false;
        for (let k = 0; k < length; k++) {
            if (computerBoard[row][col + k] || isAdjacent(row, col + k)) return false;
        }
    } else {
        if (row + length > computerBoard.length) return false;
        for (let k = 0; k < length; k++) {
            if (computerBoard[row + k][col] || isAdjacent(row + k, col)) return false;
        }
    }
    return true;
};
