const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors()); // Erlaubt CORS für das Frontend

// MongoDB-Verbindungsdaten
const uri = 'mongodb://admin:geheim@webtreedesign.de:27012/?authSource=admin';
const client = new MongoClient(uri);
let db;

// Verbinde mit MongoDB beim Start
async function connectDB() {
  await client.connect();
  db = client.db('sudoku');
  console.log('✅ Verbunden mit MongoDB');
}

// API-Route für Spielerdaten
app.get('/players', async (req, res) => {
  try {
    const collection = db.collection('player');
    const daten = await collection.find().toArray();
    res.json(daten);
  } catch (err) {
    console.error('❌ Fehler:', err);
    res.status(500).send('Fehler beim Abrufen der Daten');
  }
});

// API-Route zum Speichern von Spielerdaten
app.post('/players', express.json(), async (req, res) => {
  try {
    const { name, score, time } = req.body;
    if (!name || score == null || time == null) {
      return res.status(400).send('Name, Score und Zeit sind erforderlich');
    }
    const collection = db.collection('player');
    const result = await collection.insertOne({ name, score, time: parseFloat(time) }); // Ensure time is stored as a float
    res.status(201).json(result);
  } catch (err) {
    console.error('❌ Fehler beim Speichern des Spielers:', err);
    res.status(500).send('Fehler beim Speichern des Spielers');
  }
});

// Starte den Server nach der MongoDB-Verbindung
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Backend läuft auf http://localhost:${PORT}`));
});
