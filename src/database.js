const mysql = require('mysql2');

const pool = mysql.createPool({
    user: 'root',
    host: '127.0.0.1',
    database: 'Minentory',
    password: 'rootpassword',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const promisePool = pool.promise();

async function findDataByName(name) {
    try {
        const query = `SELECT * FROM items WHERE name LIKE CONCAT('%', ?, '%')`;
        const [results] = await promisePool.query(query, [name]);
        return results;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function searchDatabase(query) {
    try {
        const sqlQuery = `SELECT * FROM items WHERE name LIKE CONCAT('%', ?, '%')`;
        const [results] = await promisePool.query(sqlQuery, [query]);
        return results;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = { findDataByName, searchDatabase };
