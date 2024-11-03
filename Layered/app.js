// Backend for the server

// Requirements
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const business = require('./business_layer/business.js');
const app = express();
app.use(bodyParser.json());

// Get html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'presentation_layer', 'index.html'));
});

// API routes
app.get('/api/items', async (req, res) => {
    try {
        const items = await business.getItems();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/items', async (req, res) => {
    try {
        const { title, cost, description } = req.body;
        await business.addItem(title, cost, description);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});