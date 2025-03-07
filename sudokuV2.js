function generateSudoku() {
    let board = Array.from({ length: 9 }, () => Array(9).fill("_"));
    fillBoard(board);
    removeNumbers(board, 50); // Entferne 50 Zahlen für eine lösbare Herausforderung
    return board;
}

function fillBoard(board) {
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    function solve(row, col) {
        if (row === 9) return true;
        if (col === 9) return solve(row + 1, 0);
        if (board[row][col] !== "_") return solve(row, col + 1);
        
        shuffle(numbers);
        for (let num of numbers) {
            if (isValid(board, row, col, num)) {
                board[row][col] = num;
                if (solve(row, col + 1)) return true;
                board[row][col] = "_";
            }
        }
        return false;
    }
    
    solve(0, 0);
}

function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) return false;
        let boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        let boxCol = 3 * Math.floor(col / 3) + (i % 3);
        if (board[boxRow][boxCol] === num) return false;
    }
    return true;
}

function removeNumbers(board, count) {
    let attempts = count;
    while (attempts > 0) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        while (board[row][col] === "_") {
            row = Math.floor(Math.random() * 9);
            col = Math.floor(Math.random() * 9);
        }
        let backup = board[row][col];
        board[row][col] = "_";
        
        let boardCopy = board.map(row => [...row]);
        let solutions = 0;
        solveSudoku(boardCopy, () => solutions++);
        
        if (solutions !== 1) {
            board[row][col] = backup;
        } else {
            attempts--;
        }
    }
}

function solveSudoku(board, callback) {
    function solve(row, col) {
        if (row === 9) {
            callback();
            return;
        }
        if (col === 9) return solve(row + 1, 0);
        if (board[row][col] !== "_") return solve(row, col + 1);
        
        for (let num = 1; num <= 9; num++) {
            if (isValid(board, row, col, num)) {
                board[row][col] = num;
                solve(row, col + 1);
                board[row][col] = "_";
            }
        }
    }
    solve(0, 0);
}
/*
let board = generateSudoku();
for(let i = 0; i < 9; i++){
    let row = "";
    for(let j = 0; j < 9; j++){
        row += board[i][j] + " ";
    }
    console.log(row);
}
    */
export { generateSudoku };