const database = require('../database_layer/database');

// Get all items from the database
async function getItems() {
    try {
        return await database.getItems();
    } catch (error) {
        throw new Error('Could not retrieve items');
    }
}

// Add a new item to the database
async function addItem(title, cost, description) {
    if (!title || isNaN(cost) || !description) {
        throw new Error('Invalid item data');
    }
    
    try {
        await database.addItem(title, cost, description);
    } catch (error) {
        throw new Error('Could not add item');
    }
}

module.exports = { getItems, addItem };