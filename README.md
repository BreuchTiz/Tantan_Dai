# 🧩 Sudoku - Open Source Puzzle Game

## 📖 Projektbeschreibung
Dieses Projekt ist ein Open-Source-Sudoku-Spiel, das direkt im Browser gespielt werden kann. Es bietet eine dynamische Sudoku-Generierung, ein Scoreboard und die Möglichkeit, das Spiel zu teilen und zu unterstützen.

## ✨ Features
- 🎲 **Dynamische Sudoku-Generierung**: Jedes Spiel ist einzigartig.
- 🕒 **Timer mit Millisekunden-Präzision**: Verfolge deine Zeit genau.
- 🏆 **Scoreboard**: Sortiert nach Punkten und Zeit.
- 📱 **Responsive Design**: Optimiert für mobile Geräte.
- 💙 **Unterstützungsmöglichkeit**: Freiwillige Spenden via PayPal.

## 📂 Projektstruktur
```
sudoku/
├── frontend/
│   ├── index.html       # Haupt-HTML-Datei
│   ├── styles.css       # CSS-Styles
│   ├── sudoku.js        # Spiellogik
│   ├── snus.jpg         # Bild für Favicon und Social Media
│   └── Dockerfile       # Dockerfile für das Frontend
├── backend/
│   ├── api.js           # Backend-API
│   └── Dockerfile       # Dockerfile für das Backend
├── README.md            # Projektbeschreibung
```

## 🚀 Installation und Nutzung

### 🖥️ Frontend
1. Navigiere in das `frontend`-Verzeichnis:
   ```bash
   cd sudoku/frontend
   ```
2. Starte das Frontend mit Docker:
   ```bash
   docker build -t sudoku-frontend .
   docker run -p 8080:8080 sudoku-frontend
   ```
3. Öffne das Spiel im Browser:
   ```
   http://localhost:8080
   ```

### 🔧 Backend
1. Navigiere in das `backend`-Verzeichnis:
   ```bash
   cd sudoku/backend
   ```
2. Starte das Backend mit Docker:
   ```bash
   docker build -t sudoku-backend .
   docker run -p 3000:3000 sudoku-backend
   ```
3. Die API ist erreichbar unter:
   ```
   http://localhost:3000
   ```

### 🗄️ Datenbank
- Stelle sicher, dass MongoDB läuft und die Verbindung in `api.js` korrekt ist.
- Standard-MongoDB-Verbindung:
  ```
  mongodb://admin:geheim@webtreedesign.de:27012/?authSource=admin
  ```

### 🖱️ Alternative: Lokales Öffnen
Du kannst das Spiel auch lokal öffnen, indem du die Datei `index.html` im `frontend`-Ordner direkt in einem Browser wie Chrome oder Firefox öffnest:
1. Navigiere im Datei-Explorer zum `frontend`-Ordner.
2. Doppelklicke auf die Datei `index.html`.
3. Das Spiel wird im Standardbrowser geöffnet.

## 🛠️ Technologien
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Datenbank**: MongoDB
- **Containerisierung**: Docker

## 📅 Projektphasen

### Phase 1: Planung
- Zieldefinition: Entwicklung eines Sudoku-Spiels mit modernen Webtechnologien.
- Anforderungen:
  - Dynamische Sudoku-Generierung.
  - Speicherung von Spielergebnissen in einer Datenbank.
  - Responsive Design für mobile Geräte.

### Phase 2: Entwicklung
1. **Frontend**:
   - Erstellung des Sudoku-Boards mit HTML und CSS.
   - Implementierung der Spiellogik in JavaScript.
   - Integration eines Timers und eines Scoreboards.
2. **Backend**:
   - Aufbau einer REST-API mit Express.
   - Speicherung und Abruf von Spielergebnissen in MongoDB.
3. **Responsive Design**:
   - Anpassung des Layouts für verschiedene Bildschirmgrößen.
   - Verwendung von Media Queries.

### Phase 3: Testing und Deployment
- Testen der Spielfunktionalität und der API.
- Deployment auf einem Webserver (z. B. `https://sudoku.webtreedesign.de`).

## 💡 Nützliche Links
- [Projekt-Website](https://sudoku.webtreedesign.de)
- [PayPal-Unterstützung](https://www.paypal.com/paypalme/tzbre)

## ❤️ Unterstützung
Dieses Projekt ist kostenlos nutzbar. Wenn du möchtest, kannst du meine Arbeit mit einem freiwilligen Beitrag unterstützen:
[PayPal](https://www.paypal.com/paypalme/tzbre)

## 👥 Mitwirkende
- Johannes
- Tizian
- Walter
- Justin

## 📜 Lizenz
Dieses Projekt ist unter der MIT-Lizenz veröffentlicht.