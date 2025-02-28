
document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('sudoku-board');
    const size = 9;

    // Create Sudoku board
    for (let row = 0; row < size; row++) {
        const rowElement = document.createElement('div');
        rowElement.classList.add('row');
        for (let col = 0; col < size; col++) {
            const cell = document.createElement('input');
            cell.type = 'number';
            cell.min = 1;
            cell.max = 9;
            cell.classList.add('cell');
            rowElement.appendChild(cell);
        }
        board.appendChild(rowElement);
    }

    // Add event listener to validate input
    board.addEventListener('input', (event) => {
        const input = event.target;
        if (input.value < 1 || input.value > 9) {
            input.value = '';
        }
    });
});
