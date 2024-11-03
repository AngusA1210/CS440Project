// Backend for the server

// Requirements
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const controller = require('./controllers/controller');
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Loads files from Client folder
app.use(express.static(path.join(__dirname, '../client')));

// Routes are used by the controller
app.get('/api/items', controller.getItems);
app.post('/api/items', controller.addItem);

// Load index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});