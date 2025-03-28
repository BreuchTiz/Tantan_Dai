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
- [Ziel](#ziel)  
- [Vorgehensweise](#vorgehensweise)  
- [Eigene Mitarbeit im Projekt](#eigene-mitarbeit-im-projekt)  
- [Entwicklungsschritte im Detail](#entwicklungsschritte-im-detail)  
- [Gesamtergebnis und Fazit](#gesamtergebnis-und-fazit)  

---

## 🧩 Einleitung  
In diesem Projekt entwickeln wir ein interaktives Sudoku-Spiel mithilfe von HTML, CSS und JavaScript. Ziel ist es, ein vollständig funktionierendes Sudoku zu programmieren, das automatisch generiert und vom Benutzer gespielt werden kann.

---

## 🎯 Ziel  
Ein funktionierendes Sudoku-Spiel, das:
- ein gültiges Sudoku-Raster erzeugt,
- ein spielbares Puzzle mit eindeutiger Lösung bereitstellt,
- eine einfache Benutzeroberfläche bietet.

---

## 🛠️ Vorgehensweise  
1. **HTML/CSS-Struktur** für das Spielfeld erstellen  
2. **Sudoku-Raster generieren** mit gültiger Lösung  
3. **Rätsel erzeugen**, indem Zahlen entfernt werden  
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
- **Entwicklungsumgebung:** Visual Studio Code  
- **Versionierung:** Git

### 📁 Implementierungsschritte & Beispiele  

#### Beispiel: `createBoard()`
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
