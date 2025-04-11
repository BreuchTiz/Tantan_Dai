# 🧩 Backend

## 📝 Beschreibung  
Dieses Projekt läuft mit **Node.js**. Daher ist die Installation von Node.js erforderlich, um es lokal auszuführen und Daten abzurufen oder zu bearbeiten.

## ⚙️ Node.js-Installation  
Falls Sie Probleme bei der Installation von Node.js haben, folgen Sie diesen Schritten:  
1. 📥 Laden Sie den Windows MSI-Installer von der offiziellen Node.js-Website herunter: [Node.js Download](https://nodejs.org/en/download).  
2. 🛠️ Stellen Sie sicher, dass der Node.js-Pfad korrekt in den Umgebungsvariablen gesetzt ist. Der Standardpfad lautet:  
   `C:\Program Files\nodejs` (dieser wird normalerweise automatisch korrekt gesetzt).  
3. 🧪 Falls ein "Execution Policy"-Fehler auftritt, öffnen Sie PowerShell als Administrator und führen Sie den folgenden Befehl aus:  
   ```powershell
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

## 🚀 Projekt-Installation  
1. 🔁 Klonen Sie das Repository:  
   ```bash
   git clone <repository-url>
   ```  
2. 📂 Wechseln Sie in das Projektverzeichnis:  
   ```bash
   cd backend
   ```  
3. 📦 Installieren Sie die Abhängigkeiten:  
   ```bash
   npm install
   ```

## ▶️ Nutzung  
1. 🟢 Starten Sie den Entwicklungsserver:  
   ```bash
   npm start
   ```
   oder  
   ```bash
   node ./api
   ```
2. 🌐 Greifen Sie auf die Anwendung unter `http://localhost:3000/players` zu.  



## 📚 Dokumentation

### 📦 Verwendete Pakete  
- **Express** – 🧭 Für die Erstellung des Webservers.  
  ```bash
  npm install express
  ```  
- **MongoDB** – 🗄️ Für die Verbindung und Interaktion mit MongoDB.  
  ```bash
  npm install mongodb
  ```  
- **Cors** – 🌍 Für die Aktivierung von Cross-Origin Resource Sharing (CORS).  
  ```bash
  npm install cors
  ```

### 🔌 API-Endpunkte  
- **GET /players**  
  - 📄 Beschreibung: Ruft alle Spielerdaten aus der MongoDB-Datenbank ab.  
  - 💡 Beispielantwort:  
    ```json
    [
      { "name": "John", "score": 100, "time": 120.5 , "difficulty": 50},
      { "name": "Jane", "score": 150, "time": 110.3, "difficulty": 50 }
    ]
    ```

- **POST /players**  
  - 📄 Beschreibung: Speichert neue Spielerdaten in der MongoDB-Datenbank.  
  - 📥 Erwarteter Request-Body (JSON):  
    ```json
    {
      "name": "John",
      "score": 100,
      "time": 120.5,
      "difficulty": 50
    }
    ```  
  - ✅ Beispielantwort:  
    ```json
    {
      "acknowledged": true,
      "insertedId": "64f1a2b3c4d5e6f7g8h9i0j1"
    }
    ```

### 🛠️ Datenbankverbindung  
Die Verbindung zur MongoDB-Datenbank wird beim Start der Anwendung hergestellt.  

💻 Beispielimplementierung:  
```javascript
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
await client.connect();
db = client.db('sudoku');
```

## 🔐 Hinweis  
Die API ist so konfiguriert, dass sie auf die produktive MongoDB-Datenbank auf meinem Server zugreift.  
Falls Sie die MongoDB-Daten einsehen möchten, laden Sie [MongoDB Compass](https://www.mongodb.com/products/compass) herunter und verwenden Sie den folgenden Connection-String:  
```
mongodb://admin:******@webtreedesign.de:27012/?authSource=admin
```  
