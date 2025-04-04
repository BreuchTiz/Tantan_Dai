# ITFO2 – Schuljahr 2024/2025  
## Teamorientierte offene Projektarbeit  
### Projektdokumentation – Sudoku 2D

---

## 📌 Projekttitel  
**Sudoku 2D**

## 👥 Teammitglieder  
- Johannes Winkler  
- Tom Van Wüllen  
- Tizian Breuch  
- Walter Wakentin 
- Justin Gasch

---

## 📚 Inhalt  
- [Einleitung](#einleitung)   
- [Vorgehensweise](#vorgehensweise)  
- [Eigene Mitarbeit im Projekt](#eigene-mitarbeit-im-projekt)  
- [Entwicklungsschritte im Detail](#entwicklungsschritte-im-detail)  
- [Gesamtergebnis und Fazit](#gesamtergebnis-und-fazit)  

---

## 🧩 Einleitung  
Dieses Projekt ist ein Sudoku-Spiel, das direkt im Browser gespielt werden kann(sudoku.webtreedesign.de) oder lokal über den Dateiexplorer (`index.html`) aufgerufen werden kann. Es bietet eine dynamische Sudoku-Generierung und ein Scoreboard (das Scoreboard ist nur in Verbindung mit dem Backend verfügbar).  

Ursprünglich war ein 3D-Sudoku geplant, jedoch wurde diese Idee aufgrund der Komplexität verworfen. Stattdessen wurde ein 2D-Sudoku entwickelt, das später um zusätzliche Features erweitert werden kann.

---

### 🎯 Ziel  
#### Muss-Features  
- 🎲 **Dynamische Sudoku-Generierung**: Jedes Spiel ist einzigartig.  
- 🎚️ **Schwierigkeitsgrad**: Drei Schwierigkeitsstufen.  
- 📱 **Responsive Design**: Optimiert für mobile Geräte.  
- 🔄 **Spiel Neustarten**: Beendet die aktuelle Runde und startet ein neues Spiel.  

#### Kann-Features  
- 🏆 **Scoreboard**: Sortiert nach Punkten und Zeit.  
- 🕒 **Timer mit Millisekunden-Präzision**: Verfolge deine Zeit genau.


### 🛠️ Vorgehensweise 
Wir erstellen das Spiel Schritt für Schritt, indem wir jede Funktionalität einzeln umsetzen und testen.
Dabei haben wir uns am **erweiterten Wasserfallmodell** orientiert, bei dem wir einzelne Phasen nacheinander durchlaufen, jedoch auch Rücksprünge bei Bedarf möglich sind.

#### Durchlaufende Phasen:
1. **HTML/CSS-Struktur** für das Spielfeld erstellen  
2. **Sudoku-Raster generieren** mit gültiger Lösung  
3. **Lösbarkeit gewährleisten**, indem Zahlen entfernt werden  
4. **Interaktive Spielfelder** mit Benutzereingabe  d
5. **Modulare Funktionen** entwickeln und testen

Nach einer **Abstimmung im Team** haben wir uns auf einen gemeinsamen Grundbaustein geeinigt bevor wir die Phasen wieder durchlaufen.
Jeder hat zunächst ein eigenes Konzept eingebracht – das beste Konzept wurde per Abstimmung ausgewählt, anschließend haben wir dieses gemeinsam weiterentwickelt und durch individuelle Verbesserungen ergänzt.
Nachdem wir ein Soliden aufbau hatten, haben wir die nächsten Schritte im Entwicklungsprozess umgesetzt und ausgebessert.

---

## 👨‍💻 Projekt übersicht

Wir haben unsere ersten Entwürfe als **Mockups** erstellt, um eine klare Vorstellung vom finalen Layout und Spielfluss zu bekommen. Anschließend wurden die zentralen Funktionalitäten in der Datei `sudoku.js` definiert.

Dabei haben wir uns auf die **Herzstücke** des Projekts konzentriert, insbesondere auf folgende zentrale Funktionen:

- `generateSudoku()`  
- `fillBoard()`  
- `copyBoard()`  
- `removeNumbers()`  
- `createBoard()`

Ein zentrales Element ist die Funktion **`solveSudoku()`**, die aus `removeNumbers()` aufgerufen wird, um sicherzustellen, dass das generierte Sudoku immer nur **eine eindeutige Lösung** hat.  
Sie ist essenziell, um ein gültiges Spielfeld zu gewährleisten.

#### 📐 Ablauf des Programms

Im Folgenden ist der **grobe Ablauf des Programms** grafisch dargestellt:

![Sudoku Aktivitätsdiagramm](./anlagen/Sudoku_Aktivitätsdiagramm.png)

Das Aktivitätsdiagramm zeigt die Hauptphasen des Spiels – vom Laden des DOMs bis hin zur Benutzerinteraktion, Validierung der Eingaben und dem Abspeichern des Highscores. 

### <> Codebeispiele Beispiel: `removeNumbers()`
Diese Funktion entfernt gezielt Zahlen aus dem vollständig gelösten Sudoku-Raster, um ein spielbares Puzzle zu erzeugen. Dabei wird mit Hilfe von `solveSudoku()` überprüft, ob weiterhin **nur eine gültige Lösung** existiert.

```js
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
```

### <> Codebeispiele Beispiel: `solveSudoku()`
Eine rekursive Backtracking-Funktion, die das Sudoku vollständig durchläuft und bei jeder vollständigen Lösung einen Callback auslöst.

```js
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
```

# Eigene Mitarbeit im Projekt – Vorgehensweise und Arbeitsergebnisse

## Projektplanung
Während der Planungsphase habe ich mit dem Team die grundlegenden Anforderungen für das Sudoku-Spiel definiert. Wir haben die Aufgaben nach Interessen und Stärken verteilt. Ich übernahm den Bereich **Backend-Entwicklung**, inklusive Datenbankanbindung und Server-Deployment. Durch eine unerwartete Krankheitsphase habe ich meinen ersten Entwurf der Board-Logik an meine Teammitglieder weitergegeben. Nach meiner Rückkehr stieg ich wieder in die technische Umsetzung ein.

## Modellierung
Die Architektur des Systems wurde so gestaltet, dass das Frontend über eine REST-API mit dem Backend kommuniziert. Die Daten werden persistent in einer MongoDB-Datenbank gespeichert. Die grobe Struktur lässt sich wie folgt darstellen:

- **Frontend** (HTML, CSS, JavaScript)
- **Backend** (Node.js, Express)
- **Datenbank** (MongoDB)
- **Kommunikation**: HTTP (REST), JSON

## Implementierung

### Verwendete Programmiersprache und Entwicklungsumgebung
- **Frontend**: JavaScript (Vanilla), HTML, CSS
- **Backend**: JavaScript mit Node.js und Express
- **Datenbank**: MongoDB
- **Entwicklungsumgebung**: Visual Studio Code

### Implementierungsschritte
1. Entwurf und Implementierung der Funktion `createBoard` im Frontend
2. Entwicklung eines Node.js-Servers mit REST-Endpunkten
3. Anbindung an MongoDB zur Speicherung von Spielergebnissen
4. Deployment des Servers auf einem Webserver
5. Erweiterung der Scoreboard-Logik zur dynamischen Sortierung nach Schwierigkeit, Score und Zeit
6. Fehlerbehebung und Codeoptimierung im Gesamtprojekt

## Eigene Codebeispiele mit kurzen Erklärungen

### Backend: Spielergebnisse speichern
```js
app.post('/players', express.json(), async (req, res) => {
  const { name, score, time, difficulty } = req.body;
  if (!name || score == null || time == null) {
    return res.status(400).send('Name, Score und Zeit sind erforderlich');
  }
  const collection = db.collection('player');
  const result = await collection.insertOne({ name, score, time: parseFloat(time), difficulty });
  res.status(201).json(result);
});
```
Dieser Code speichert ein Spielergebnis in der Datenbank. Die Zeit wird dabei als Zahl gespeichert, um später sortieren zu können.

### Frontend: Score an das Backend senden
```js
fetch("https://sososo.webtreedesign.de/players", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(playerData),
})
```
Nach Spielende wird der Score mit einem POST-Request an das Backend übertragen.

### Frontend: Scoreboard sortieren
```js
players.sort((a, b) => {
  if (b.difficulty !== a.difficulty) return b.difficulty - a.difficulty;
  if (b.score !== a.score) return b.score - a.score;
  return a.time - b.time;
});
```
Diese Logik stellt sicher, dass Spieler mit höherer Schwierigkeit und besseren Zeiten höher gelistet werden.

## Qualitätssicherung
- Während der Entwicklung habe ich regelmäßig manuell getestet, z. B. durch gezielte Eingaben und Kontrolle der Spielstände
- Fehler beim Speichern oder Abrufen von Daten wurden über Konsolenausgaben und HTTP-Statuscodes identifiziert
- Das System wurde mit Testdaten geprüft, um die Sortierlogik im Scoreboard zu validieren

## Entwicklungsschritte für das Sudoku-Spiel
1. Board-Erstellung mit zufälliger Zahlenverteilung
2. Entfernen einzelner Zahlen zur Erzeugung des Spielfelds
3. Dynamisches Erzeugen von Input-Feldern im DOM
4. Validierung der Benutzereingaben mit sofortigem Feedback
5. Punktevergabe für korrekte Eingaben, Abzug bei Fehlern
6. Timer zur Zeitmessung
7. Abfrage und Speicherung des Spielernamens
8. Speicherung der Ergebnisse auf dem Server
9. Sortierung und Anzeige im Scoreboard

