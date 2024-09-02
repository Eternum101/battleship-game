export const randomizeComputerShips = (board) => {
    const newBoard = board.map(row => row.slice());
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
            row = Math.floor(Math.random() * board.length);
            col = Math.floor(Math.random() * board[0].length);
        } while (!isValidRandomPlacement(row, col, ship.length, orientation, newRandomShips, newBoard));

        for (let k = 0; k < ship.length; k++) {
            if (orientation === 'horizontal') {
                newBoard[row][col + k] = '.';
                newRandomShips.push({ row, col: col + k });
            } else {
                newBoard[row + k][col] = '.';
                newRandomShips.push({ row: row + k, col });
            }
        }
    });
    return newBoard;
};

const isValidRandomPlacement = (row, col, length, orientation, randomShips, board) => {
    const isAdjacent = (r, c) => randomShips.some(ship => Math.abs(ship.row - r) <= 1 && Math.abs(ship.col - c) <= 1);

    if (orientation === 'horizontal') {
        if (col + length > board[0].length) return false;
        for (let k = 0; k < length; k++) {
            if (board[row][col + k] || isAdjacent(row, col + k)) return false;
        }
    } else {
        if (row + length > board.length) return false;
        for (let k = 0; k < length; k++) {
            if (board[row + k][col] || isAdjacent(row + k, col)) return false;
        }
    }
    return true;
};
