// Controller logic will handle client requests

const itemModel = require('../models/model');

// Controller functions
function getItems(req, res) {
    itemModel.getItems((err, items) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(items);
    });
}

function addItem(req, res) {
    const { title, cost, description } = req.body;
    itemModel.addItem(title, cost, description, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
}

module.exports = { getItems, addItem };