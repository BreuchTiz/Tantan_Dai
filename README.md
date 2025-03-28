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
Dieses Projekt ist ein Sudoku-Spiel, das direkt im Browser gespielt werden kann oder lokal über den Dateiexplorer (`index.html`) aufgerufen werden kann. Es bietet eine dynamische Sudoku-Generierung und ein Scoreboard (das Scoreboard ist nur in Verbindung mit dem Backend verfügbar).  

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
1. **HTML/CSS-Struktur** für das Spielfeld erstellen  
2. **Sudoku-Raster generieren** mit gültiger Lösung  
3. **Lösbarkeit gewährleisten**, indem Zahlen entfernt werden  
4. **Interaktive Spielfelder** mit Benutzereingabe  
5. **Modulare Funktionen** entwickeln und testen

---

## 👨‍💻 Eigene Mitarbeit im Projekt

### 🔄 Projektplanung  
- Zeitplan festgelegt  
- Aufgaben aufgeteilt  
- Meilensteine gesetzt

### 📐 Modellierung  
- Darstellung der Systemarchitektur (z. B. Klassendiagramm)

### 💻 Implementierung  
- **Programmiersprache:** JavaScript  
- **Implementieungsschritte:** Visual Studio Code  
- **Codebespiele:** Git

### 📁 Qualitätssicherung  

### Codebeispiele Beispiel: `createBoard()`
```js
function createBoard() {
  const board = document.getElementById('sudoku-board');
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = document.createElement('input');
      cell.type = 'text';
      cell.maxLength = 1;
      board.appendChild(cell);
    }
  }
}
