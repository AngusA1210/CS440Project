// Backend for the server

// Requirements
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database');
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Loads files from Client folder
app.use(express.static(path.join(__dirname, '../client')));

// API routes
app.get('/api/items', (req, res) => {
    db.getItems((err, items) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(items);
    });
});

app.post('/api/items', (req, res) => {
    const { title, cost, description } = req.body;
    db.addItem(title, cost, description, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// Load index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});