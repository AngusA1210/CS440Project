// Database uses SQLite

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run('CREATE TABLE items (id INTEGER PRIMARY KEY, title TEXT, cost REAL, description TEXT)');
});

// Database functions
function getItems(callback) {
    db.all('SELECT * FROM items', callback);
}

function addItem(title, cost, description, callback) {
    db.run('INSERT INTO items (title, cost, description) VALUES (?, ?, ?)', [title, cost, description], callback);
}

module.exports = { getItems, addItem };