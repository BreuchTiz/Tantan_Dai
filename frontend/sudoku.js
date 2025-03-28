// Global Variables
let boardCompleted = [];
let difficulty = 10;
let player1 = createPlayer("Player 1");
let inputCells = [];
let timerInterval;
let startTime;

// Initialization
document.addEventListener("DOMContentLoaded", generateSudoku);

fetch("https://sososo.webtreedesign.de/players")
  .then((res) => res.json())
  .then((data) => {
    console.log("Spielerdaten:", data);
    updateScoreboard(data);
  })
  .catch((err) => {
    console.error("Fehler beim Laden der Spielerdaten:", err);
  });

/**
 * Generates a new Sudoku board, initializes the game, and starts the timer.
 */
function generateSudoku() {
  console.log(`
   
░██████╗██╗░░░██╗██████╗░░█████╗░██╗░░██╗██╗░░░██╗
██╔════╝██║░░░██║██╔══██╗██╔══██╗██║░██╔╝██║░░░██║
╚█████╗░██║░░░██║██║░░██║██║░░██║█████═╝░██║░░░██║
░╚═══██╗██║░░░██║██║░░██║██║░░██║██╔═██╗░██║░░░██║
██████╔╝╚██████╔╝██████╔╝╚█████╔╝██║░╚██╗╚██████╔╝
╚═════╝░░╚═════╝░╚═════╝░░╚════╝░╚═╝░░╚═╝░╚═════╝░
    `);
  console.log("𝕓𝕪: 𝕀𝕋𝔽𝕆𝟚");

  // Reset score when starting a new game
  player1.score = 0;

  let board = Array.from({ length: 9 }, () => Array(9).fill("_"));
  fillBoard(board);
  boardCompleted = copyBoard(board);
  // console.table(boardCompleted);
  removeNumbers(board, difficulty);
  createBoard(board);
  inputCells = document.querySelectorAll(".cell");
  // console.log(inputCells);
  startTimer();
}

/**
 * Creates the Sudoku board in the DOM and sets up input handling for each cell.
 *
 * @param {Array} board - The 2D array representing the Sudoku board.
 */
function createBoard(board) {
  const container = document.getElementById("sudoku-board");
  container.innerHTML = "";
  board.forEach((row, i) => {
    row.forEach((num, j) => {
      const input = document.createElement("input");
      input.id = `cell-${i}-${j}`;
      input.type = "number";
      input.min = "1";
      input.max = "9";
      input.maxLength = 1;
      input.classList.add("cell");
      input.dataset.row = i;
      input.dataset.col = j;
      input.oninput = function () {
        handleInput(this, i, j);
      };
      if (num !== "_") {
        input.value = num;
        input.setAttribute("readonly", true);
      }
      container.appendChild(input);
    });
  });
}

/**
 * Handles user input for a Sudoku cell, validates it, and updates the game state.
 *
 * @param {HTMLElement} cell - The input element for the Sudoku cell.
 * @param {number} row - The row index of the cell.
 * @param {number} col - The column index of the cell.
 */
function handleInput(cell, row, col) {
  console.table(boardCompleted);
  let input = cell.value;
  console.log("input: " + input);
  let correctValue = boardCompleted[row][col];
  console.log("correctValue: " + correctValue);
  if (input != correctValue) {
    cell.style.backgroundColor = "red";
    player1.subScore(1);
  } else {
    player1.addScore(1);
    cell.setAttribute("readonly", true);
    cell.style.backgroundColor = "lightgreen";
    console.log("Score: " + player1.score);
  }
  if (isSudokuSolved()) {
    finishGame();
  }
}

/**
 * Ends the game, stops the timer, and saves the player's score and time to the server.
 */
function finishGame() {
  clearInterval(timerInterval); // Ensure the timer stops when the game ends
  const elapsedTime = stopTimer().toFixed(1); // Format elapsed time to one decimal place
  const playerName = prompt(
    "Herzlichen Glückwunsch! Bitte gib deinen Namen ein:"
  );
  if (!playerName) {
    alert("Name ist erforderlich, um deinen Score zu speichern.");
    return;
  }
  const playerData = {
    name: playerName,
    score: player1.score,
    time: parseFloat(elapsedTime), // Ensure time is stored as a number
  };
  fetch("https://sososo.webtreedesign.de/players", {  //hier die url anpassen wenn sie auf ihr lokakles backend zugreifen wollen Dev: http://localhost:3000/players Prod: https://sososo.webtreedesign.de/players
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(playerData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Spieler gespeichert:", data);
      alert(
        `Spiel beendet! Dein Score: ${player1.score}, Zeit: ${elapsedTime} Sekunden`
      );
      refreshScoreboard();
    })
    .catch((err) => {
      console.error("Fehler beim Speichern des Spielers:", err);
    });
}

/**
 * Refreshes the scoreboard by fetching the latest player data from the server.
 */
function refreshScoreboard() {
  fetch("https://sososo.webtreedesign.de/players") //hier die url anpassen wenn sie auf ihr lokakles backend zugreifen wollen Dev: http://localhost:3000/players Prod: https://sososo.webtreedesign.de/players
    .then((res) => res.json())
    .then((data) => {
      console.log("Aktualisierte Spielerdaten:", data);
      updateScoreboard(data);
    })
    .catch((err) => {
      console.error("Fehler beim Aktualisieren des Scoreboards:", err);
    });
}

// Timer Functions

/**
 * Starts the game timer and updates the timer display every second with millisecond precision.
 */
function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(1); // Include milliseconds and format to one decimal place
    document.getElementById(
      "timer"
    ).textContent = `Zeit: ${elapsedTime} Sekunden`;
  }, 100); // Update every 100ms for better precision
}

/**
 * Stops the game timer and returns the elapsed time in seconds as a number.
 *
 * @returns {number} The elapsed time in seconds.
 */
function stopTimer() {
  clearInterval(timerInterval);
  return (Date.now() - startTime) / 1000; // Return elapsed time as a number
}

// Sudoku Logic

/**
 * Fills the Sudoku board with a valid solution.
 *
 * @param {Array} board - The 2D array representing the Sudoku board.
 */
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

/**
 * Checks if a number is valid in a specific cell of the Sudoku board.
 *
 * @param {Array} board - The 2D array representing the Sudoku board.
 * @param {number} row - The row index of the cell.
 * @param {number} col - The column index of the cell.
 * @param {number} num - The number to validate.
 * @returns {boolean} True if the number is valid, false otherwise.
 */
function isValid(board, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) return false;
    let boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    let boxCol = 3 * Math.floor(col / 3) + (i % 3);
    if (board[boxRow][boxCol] === num) return false;
  }
  return true;
}

/**
 * Removes numbers from the Sudoku board to create a puzzle with the given difficulty.
 *
 * @param {Array} board - The 2D array representing the Sudoku board.
 * @param {number} count - The number of cells to remove.
 */
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

    let boardCopy = board.map((row) => [...row]);
    let solutions = 0;
    solveSudoku(boardCopy, () => solutions++);

    if (solutions !== 1) {
      board[row][col] = backup;
    } else {
      attempts--;
    }
  }
}

/**
 * Solves the Sudoku board using backtracking.
 *
 * @param {Array} board - The 2D array representing the Sudoku board.
 * @param {Function} callback - A callback function to execute when the board is solved.
 */
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

// Utility Functions

/**
 * Creates a deep copy of the Sudoku board.
 *
 * @param {Array} board - The 2D array representing the Sudoku board.
 * @returns {Array} A deep copy of the board.
 */
function copyBoard(board) {
  let newBoard = [];
  for (var i in board) {
    let row = [];
    for (var j in board[i]) {
      row.push(board[i][j]);
    }
    newBoard.push(row);
  }
  return newBoard;
}

/**
 * Creates a new player object with a name and score tracking.
 *
 * @param {string} name - The name of the player.
 * @returns {Object} The player object.
 */
function createPlayer(name) {
  let player = {
    name: name,
    score: 0,
    addScore: function (x) {
      this.score += x;
    },
    subScore: function (x) {
      this.score -= x;
    },
  };
  return player;
}

/**
 * Updates the scoreboard in the DOM with the latest player data, sorted by score (descending) and time (ascending).
 * Adds icons for the top 3 players and displays time with one decimal place.
 *
 * @param {Array} players - An array of player objects.
 */
function updateScoreboard(players) {
  const scoreboardList = document.getElementById("scoreboard-list");
  scoreboardList.innerHTML = "";

  // Sort players by score in descending order, and by time in ascending order for ties
  players.sort((a, b) => {
    if (b.score === a.score) {
      return a.time - b.time; // Sort by time (ascending) if scores are equal
    }
    return b.score - a.score; // Sort by score (descending)
  });

  players.forEach((player, index) => {
    const listItem = document.createElement("p");

    // Add icons for the top 3 players
    let icon = "";
    if (index === 0) icon = "👑 ";
    else if (index === 1) icon = "🥈 ";
    else if (index === 2) icon = "🥉 ";
    else icon = "💥 ";

    // console.log("player.time: " + player.time);
    // Format time to one decimal place
    const formattedTime = player.time.toFixed(1);

    listItem.textContent = `${icon}${player.name}: ${player.score} Punkte, ${formattedTime}s`;
    scoreboardList.appendChild(listItem);
  });
}

/**
 * Checks if the Sudoku board is completely and correctly solved.
 *
 * @returns {boolean} True if the board is solved, false otherwise.
 */
function isSudokuSolved() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = document.getElementById(`cell-${i}-${j}`);
      if (cell.value != boardCompleted[i][j]) {
        return false;
      }
    }
  }
  return true;
}
