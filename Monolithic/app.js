// Backend for the server

// Requirements
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database');
const app = express();
app.use(bodyParser.json());

// Get html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index', 'index.html'));
});

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

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
