function generateEmptyBoard() {
    return Array.from({ length: 9 }, () => Array(9).fill(''));
}

function fillBoard(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (Math.random() < 0.4) {
                board[i][j] = Math.floor(Math.random() * 9) + 1;
            }
        }
    }
}

function createBoard() {
    const container = document.getElementById("sudoku-board");
    container.innerHTML = "";
    const board = generateEmptyBoard();
    fillBoard(board);
    
    board.forEach((row, i) => {
        row.forEach((num, j) => {
            const input = document.createElement("input");
            input.type = "number"; // numerischer input
            // TODO: prüfen, wie man den Scroll-Button entfernen kann
            input.min = "1"; // numerische Inputgrenze
            input.max = "9"; // numerische Inputgrenze
            input.maxLength = 1;
            input.classList.add("cell");
            input.dataset.row = i;
            input.dataset.col = j;
            if (num !== '') {
                input.value = num;
                input.setAttribute("readonly", true);
            }
            container.appendChild(input);
        });
    });
}

function checkInput(){
    alert("Aufgabe nicht implementiert! Prüfung ob Eingaben korrekt")
    /*
    if compare x, y true
        set userpoints + 1
    else
        set userpoints - 2
    */
}

function giveUpSudokuGame() {
    alert("Aufgabe nicht implementiert! Letztendlich soll der, der Aufgegeben hat verloren haben. Wie er verliert muss noch geklärt werden.");
}

function generateSudoku() {
    createBoard();
}

document.addEventListener("DOMContentLoaded", generateSudoku);
document.addEventListener("input", checkInput); // löst bei jedem Input die CheckInput-Methode aus


/*
1. generateEmptyBoard()
function generateEmptyBoard() {
    return Array.from({ length: 9 }, () => Array(9).fill(''));
}
Erstellt ein 9x9 leeres Sudoku-Board als zweidimensionales Array.
Array.from({ length: 9 }, () => Array(9).fill('')):
Erstellt ein Array mit 9 leeren Arrays (für die 9 Zeilen).
Jede Zeile ist ein Array mit 9 leeren Strings (''), die später mit Zahlen gefüllt werden.

2. fillBoard(board)
function fillBoard(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (Math.random() < 0.4) {
                board[i][j] = Math.floor(Math.random() * 9) + 1;
            }
        }
    }
}
Befüllt das Sudoku-Board mit zufälligen Zahlen.
Jede Zelle hat eine 40% Wahrscheinlichkeit (Math.random() < 0.4), mit einer zufälligen Zahl zwischen 1 und 9 gefüllt zu werden.
Math.floor(Math.random() * 9) + 1:
Generiert eine Zufallszahl zwischen 1 und 9.

3. createBoard()
function createBoard() {
    const container = document.getElementById("sudoku-board");
    container.innerHTML = "";
    const board = generateEmptyBoard();
    fillBoard(board);
Holt das Sudoku-Container-Element (<div id="sudoku-board">).
Leert das alte Sudoku, falls bereits eines existiert.
Erstellt ein leeres Board (generateEmptyBoard()) und füllt es mit Zahlen (fillBoard(board)).

4. Erstellen der Eingabefelder
    board.forEach((row, i) => {
        row.forEach((num, j) => {
            const input = document.createElement("input");
            input.type = "number";
            input.min = "1";
            input.max = "9";
            input.maxLength = 1;
            input.classList.add("cell");
            input.dataset.row = i;
            input.dataset.col = j;
Durchläuft das 9x9-Array und erstellt für jede Zelle ein <input>-Feld.
input.type = "number" → Nur Zahlen-Eingabe möglich.
min = "1" & max = "9" → Beschränkt Eingaben auf die erlaubten Sudoku-Werte.
dataset.row = i & dataset.col = j → Speichert die Position in data--Attributen.

5. Sperren von vorgegebenen Zahlen
            if (num !== '') {
                input.value = num;
                input.setAttribute("readonly", true);
            }
            container.appendChild(input);
        });
    });
}
Falls die Zelle eine Zahl enthält, wird sie als readonly markiert.
Damit kann der Benutzer diese Zahl nicht ändern.

6. checkInput()
function checkInput(){
    alert("Aufgabe nicht implementiert! Prüfung ob Eingaben korrekt")
}
Wird bei jeder Benutzereingabe aufgerufen.
Hier könnte später eine Funktion implementiert werden, um zu prüfen, ob das Sudoku korrekt gelöst ist.

7. giveUpSudokuGame()
function giveUpSudokuGame() {
    alert("Aufgabe nicht implementiert! Letztendlich soll der, der Aufgegeben hat verloren haben. Wie er verliert muss noch geklärt werden.");
}
Eine Platzhalterfunktion für die Aufgabe-Aufgabe.
Sollte später eine Logik erhalten, z. B. Punkteabzug oder eine "Verloren"-Nachricht.

8. generateSudoku()
function generateSudoku() {
    createBoard();
}
Erstellt ein neues Sudoku, indem createBoard() aufgerufen wird.

9. Event Listener für die Initialisierung
document.addEventListener("DOMContentLoaded", generateSudoku);
document.addEventListener("input", checkInput);
DOMContentLoaded: Erstellt direkt beim Laden der Seite ein Sudoku.
input: Löst checkInput() aus, sobald der Benutzer eine Eingabe macht.
Zusammenfassung
✅ Generiert ein zufälliges Sudoku mit 40% befüllten Feldern
✅ Erstellt HTML-Input-Felder für die Zahlen
✅ Sperrt vorgegebene Zahlen (readonly)
✅ Hat eine Basis für Validierung & Aufgabe-Mechanik
*/