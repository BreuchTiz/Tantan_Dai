let boardCompleted = [];
let difficulty = 6;
//let player1 = createPlayer(window.prompt("Player 1"));
let player1 = createPlayer("Player 1");
//let player2 = createPlayer(window.prompt("Player 2"))
let inputCells = [];

let timerInterval;
let startTime;

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        document.getElementById("timer").textContent = `Zeit: ${elapsedTime} Sekunden`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    return Math.floor((Date.now() - startTime) / 1000); // Return elapsed time in seconds
}

function generateSudoku() {
  let board = Array.from({ length: 9 }, () => Array(9).fill("_"));
  fillBoard(board);
  boardCompleted = copyBoard(board);
  console.table(boardCompleted);
  removeNumbers(board, difficulty); // Entferne 50 Zahlen für eine lösbare Herausforderung
  createBoard(board);
  inputCells = document.querySelectorAll(".cell");
  console.log(inputCells);
  startTimer(); // Start the timer when the game begins
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

inputCells.forEach((cell) => {
  cell.addEventListener("keydown", function (event) {
    let row = parseInt(this.dataset.row);
    let col = parseInt(this.dataset.col);
    let nextCell = document.getElementById(`cell-${row + 1}-${col}`);
    event.preventDefault();
    switch (event.key) {
      case "ArrowUp":
        moveFocus(row, col, -1, 0);
        break;
      case "ArrowDown":
        moveFocus(row, col, 1, 0);
        break;
      case "ArrowLeft":
        moveFocus(row, col, 0, -1);
        break;
      case "ArrowRight":
        moveFocus(row, col, 0, 1);
        break;
      default:
        break;
    }
  });
});

function createBoard(board) {
  const container = document.getElementById("sudoku-board");
  container.innerHTML = "";
  board.forEach((row, i) => {
    row.forEach((num, j) => {
      const input = document.createElement("input");
      input.id = `cell-${i}-${j}`;
      input.type = "number"; // numerischer input
      input.addEventListener("mousewheel", function (event) {
        this.blur();
      });
      input.addEventListener("onkeydown", function (event) {
        event.preventDefault();
        switch (event.key) {
          case "ArrowUp":
          case "ArrowDown":
          case "ArrowLeft":
          case "ArrowRight":
            break;
        }
        this.blur();
      });
      input.min = "1"; // numerische Inputgrenze
      input.max = "9"; // numerische Inputgrenze
      input.maxLength = 1;
      input.classList.add("cell");
      input.dataset.row = i;
      input.dataset.col = j;
      input.oninput = function () {
        console.table(boardCompleted);
        let input = this.value;
        console.log("input: " + input);
        let correctValue = boardCompleted[i][j];
        console.log("correctValue: " + correctValue);
        if (input != correctValue) {
          this.style.backgroundColor = "red";
          player1.subScore(1);
        } else {
          player1.addScore(1);
          this.setAttribute("readonly", true);
          this.style.backgroundColor = "lightgreen";
          console.log("Score: " + player1.score);
        }
        if (isSudokuSolved()) {
          finishGame(); // Call finishGame after solving the Sudoku
        }
      };
      if (num !== "_") {
        input.value = num;
        input.setAttribute("readonly", true);
      }
      container.appendChild(input);
    });
  });
}

function finishGame() {
    const elapsedTime = stopTimer(); // Stop the timer and get the elapsed time
    const playerName = prompt("Herzlichen Glückwunsch! Bitte gib deinen Namen ein:");
    if (!playerName) {
        alert("Name ist erforderlich, um deinen Score zu speichern.");
        return;
    }
    const playerData = {
        name: playerName,
        score: player1.score,
        time: elapsedTime, // Include elapsed time in the data
    };
    fetch("https://sososo.webtreedesign.de/players", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(playerData),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log("Spieler gespeichert:", data);
        alert(`Spiel beendet! Dein Score: ${player1.score}, Zeit: ${elapsedTime} Sekunden`);
        refreshScoreboard(); // Refresh the scoreboard dynamically
    })
    .catch((err) => {
        console.error("Fehler beim Speichern des Spielers:", err);
    });
}

function refreshScoreboard() {
    fetch("https://sososo.webtreedesign.de/players")
        .then((res) => res.json())
        .then((data) => {
            console.log("Aktualisierte Spielerdaten:", data);
            updateScoreboard(data); // Update the scoreboard with the latest data
        })
        .catch((err) => {
            console.error("Fehler beim Aktualisieren des Scoreboards:", err);
        });
}

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

function updateScoreboard(players) {
  const scoreboardList = document.getElementById("scoreboard-list");
  scoreboardList.innerHTML = ""; // Clear existing entries
  players.forEach((player) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${player.name}: ${player.score}, ${player.time} Sekunden`;
    scoreboardList.appendChild(listItem);
  });
}

function isSudokuSolved() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = document.getElementById(`cell-${i}-${j}`);
      if (cell.value != boardCompleted[i][j]) {
        return false; // If any cell doesn't match the solution, it's not solved
      }
    }
  }
  return true; // All cells match the solution
}

// Example usage: Call this function after every input to check if the Sudoku is solved
// if (isSudokuSolved()) {
//     alert("Herzlichen Glückwunsch! Du hast das Sudoku gelöst!");
// }

fetch("https://sososo.webtreedesign.de/players")
  .then((res) => res.json())
  .then((data) => {
    console.log("Spielerdaten:", data);
    updateScoreboard(data); // Populate the scoreboard with API data
  })
  .catch((err) => {
    console.error("Fehler beim Laden der Spielerdaten:", err);
  });

document.addEventListener("DOMContentLoaded", generateSudoku);
//document.addEventListener("input", checkInput); // löst bei jedem Input die CheckInput-Methode aus
