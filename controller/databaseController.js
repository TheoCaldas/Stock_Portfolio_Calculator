import mysql from 'mysql2';
import dotenv from 'dotenv';    

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise();

/*  Get all user stocks.
    Returns stock array. */
export async function getUserStocks() {
    const [rows] = await pool.query("SELECT * FROM portfolio");
    return rows;
};

/*  Get single user stock by ticker.
    Returns stock object. 
    Returns undefined if ticker not found.  */
export async function getUserStock(ticker) {
    try{
        const [rows] = await pool.query(
            `SELECT * FROM portfolio
            WHERE ticker = ?`, [ticker]);
        return rows[0];
    } catch (error){
        return undefined;
    }
};

/*  Create user stock (ticker should be unique).
    Returns created stock if succeed.  */
export async function createUserStock(ticker, shares, cost) {
    const [result] = await pool.query(
        `INSERT INTO portfolio (ticker, shares, cost)
        VALUES (?,?,?)`, [ticker, shares, cost]);
    return getUserStock(ticker);
};

/*  Update single user stock by ticker.
    Returns if succeed. */
export async function updateUserStock(ticker, shares, cost) {
    const [result] = await pool.query(
        `UPDATE portfolio
        SET shares = ?, cost = ?
        WHERE ticker = ?`, [shares, cost, ticker]);
    return result.changedRows > 0;
};

/*  Delete all user stocks.
    Returns if succeed. */
export async function deleteUserStocks() {
    const [result] = await pool.query("DELETE FROM portfolio");
    return result.affectedRows > 0;
};

/*  Delete single user stock by ticker.
    Returns if succeed. */
export async function deleteUserStock(ticker) {
    const [result] = await pool.query(
        `DELETE FROM portfolio
        WHERE ticker = ?`, [ticker]);
    return result.affectedRows > 0;
};