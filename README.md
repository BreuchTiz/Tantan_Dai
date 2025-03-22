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

## 🚀 Nutzung

### 🖥️ Lokales Öffnen ohne Docker...
Du kannst das Spiel auch lokal öffnen, indem du die Datei `index.html` im `frontend`-Ordner direkt in einem Browser wie Chrome oder Firefox öffnest:
1. Navigiere im Datei-Explorer zum `frontend`-Ordner.
2. Doppelklicke auf die Datei `index.html`.
3. Das Spiel wird im Standardbrowser geöffnet.
### 🗄️ Datenbank
- Stelle sicher, dass MongoDB läuft und die Verbindung in `api.js` korrekt ist.
- Standard-MongoDB-Verbindung:
  ```
  mongodb://admin:******@webtreedesign.de:27012/?authSource=admin
  ```
> **Hinweis**: Datenbank einstellungen nur nodewendig wenn man Frontend und Backend lokal laufen lässt. z.B mit Docker und node. Solange auf die Prod Api zugegriffen wird ist das backend im Ordner völlig egal lol.

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

## Sonstiges

### 🌐 SSL-Zertifikat und Nginx Proxy
Das Projekt verwendet das `jrcs/letsencrypt-nginx-proxy-companion`-Image zusammen mit dem `jwilder/nginx-proxy`-Image, um SSL-Zertifikate automatisch zu generieren und die Dienste über HTTPS bereitzustellen.

#### Docker-Compose-Konfiguration
Die `docker-compose.yml`-Datei enthält die Konfiguration für den Nginx-Proxy und die Let's Encrypt-Integration. Hier ein Überblick:
- **Backend**:
  - Hostname: `sososo.webtreedesign.de`
  - Port: `3000`
- **Frontend**:
  - Hostname: `sudoku.webtreedesign.de`
  - Port: `8080`
- **Netzwerk**:
  - Beide Dienste sind Teil des `nginxproxy`-Netzwerks, das extern definiert ist.

#### Wichtige Umgebungsvariablen
- `VIRTUAL_HOST`: Domainname des Dienstes.
- `LETSENCRYPT_HOST`: Domainname für das SSL-Zertifikat.
- `LETSENCRYPT_EMAIL`: E-Mail-Adresse für Let's Encrypt-Benachrichtigungen.
- `HTTPS_METHOD`: Methode für HTTPS-Weiterleitungen (z. B. `redirect`).

> **Hinweis**: Die vollständige `docker-compose.yml`-Datei wurde nicht bereitgestellt.
## 💡 Nützliche Links
- [Projekt-Website](https://sudoku.webtreedesign.de)
- [API](https://sososo.webtreedesign.de/players)
- [PayPal-Unterstützung](https://www.paypal.com/paypalme/tzbre)

## ❤️ Unterstützung
Dieses Projekt ist kostenlos nutzbar. Wenn du möchtest, kannst du meine Arbeit mit einem freiwilligen Beitrag unterstützen:
[PayPal](https://www.paypal.com/paypalme/tzbre)

## 👥 Mitwirkende
- Johannes
- Justin
- Tizian
- Walter

## 📜 Lizenz
Dieses Projekt ist unter der MIT-Lizenz veröffentlicht.