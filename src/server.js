const express = require('express');
const { findDataByName, searchDatabase } = require("./database");
const { join } = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(join(__dirname, 'resources')));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

app.get('/api/name/:name', async (req, res) => {
    const { name } = req.params;

    try {
        const data = await findDataByName(name);
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({ error: 'Data not found' });
        }
    } catch (error) {
        console.error('Database query failed:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
});

app.get('/search?', async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).send({ error: 'Query is required' });
    }

    try {
        const items = await searchDatabase(query);
        res.json(items);
    } catch (error) {
        console.error('Search failed:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = { app }