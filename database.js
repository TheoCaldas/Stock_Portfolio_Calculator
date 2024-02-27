import mysql from 'mysql2';
import dotenv from 'dotenv';    

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise();

// console.log('Connected!');

export async function getUserStocks() {
    const [rows] = await pool.query("SELECT * FROM portfolio");
    return rows;
};

export async function getUserStock(ticker) {
    const [rows] = await pool.query(
        `SELECT * FROM portfolio
        WHERE ticker = ?`, [ticker]);
    return rows[0];
};

export async function createUserStock(ticker, shares, cost) {
    const [result] = await pool.query(
        `INSERT INTO portfolio (ticker, shares, cost)
        VALUES (?,?,?)`, [ticker, shares, cost]);
    return getUserStock(ticker);
};

export async function deleteUserStock(ticker) {
    const [result] = await pool.query(
        `DELETE FROM portfolio
        WHERE ticker = ?`, [ticker]);
    return result.affectedRows > 0;
};

// var result;
// result = await deleteUserStock("PETR4.SA");
// console.log(result);
// result = await createUserStock("PETR4.SA", "10", "14.20");
// console.log(result);
// const userStocks = await getUserStocks();
// console.log(userStocks);
// const userStock = await getUserStock("PETR4.SA");
// console.log(userStock);