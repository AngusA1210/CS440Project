// Database uses SQLite

const sqlite3 = require('sqlite3').verbose();

// Save database as a file
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
    db.run('CREATE TABLE items (id INTEGER PRIMARY KEY, title TEXT, cost REAL, description TEXT)');
});

// Database functions
function getItems() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM items', (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

function addItem(title, cost, description) {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO items (title, cost, description) VALUES (?, ?, ?)', [title, cost, description], (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}

module.exports = { getItems, addItem };
