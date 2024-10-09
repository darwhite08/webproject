const client = require('../elastic-search/client');
const pg = require('pg');
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



async function bulkIndexAnimeData() {
    const animeDataList = await db.query("SELECT * FROM anime_by_year");
    const body = animeDataList.flatMap((doc) => [{ index: { _index: 'anime' } }, doc]);
  
    const response = await client.bulk({ refresh: true, body });
    console.log('Bulk Indexing Completed:', response);
  }
  

  
  bulkIndexAnimeData(animeDataList);
