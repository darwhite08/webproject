const { authenticate } = require("passport");
const pg = require ('pg');
const env = require("dotenv");

env.config();

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    // ssl: { rejectUnauthorized: false }
  });
  
  db.connect();

async function user_id_generator(userID, tableName) {
    const user_id = genratedUserId();
    const if_user_id_exists = await db.query(`SELECT ${userID} FROM ${tableName} WHERE ${userID} = $1`, [user_id]);

    // check if user already exists 

    if (if_user_id_exists.rows.length === 0) {
        return genratedUserId()
    }
    else if (if_user_id_exists.rows.length !== 0) {
       userID = genratedUserId();
    }
}
function genratedUserId() {
    const useridPrefix = 'AUID';
    let number = '';
    while (number.length < 16) {
        const randomDigit = Math.floor(Math.random() * 10);
        number += randomDigit.toString();
    }
    return (useridPrefix + number);
}

module.exports = {user_id_generator} ;