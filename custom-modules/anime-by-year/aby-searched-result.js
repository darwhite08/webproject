const { authenticate } = require("passport");
const pg = require('pg');
const env = require("dotenv");
const aiTextImplementation = require('./elastic-multifield-search-text')

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

// Generic function to fetch data from the database with single condition
async function fetchDatabase(database, field, value) {
    const query = `SELECT * FROM ${database} WHERE lower(${field}) = lower($1)`;
    const result = await db.query(query, [value]);
    return result.rows;
}

// Function to fetch items based on a text field search
async function text_based_searched_items(database, textField, textValue) {
    const result = await aiTextImplementation.searchAnime('a');
    return result;
}

// Function to fetch items based on a year range
async function year_wise_searched_items(database, yearField, startYearValue, endYearValue) {
    const query = `SELECT * FROM ${database} WHERE ${yearField} BETWEEN $1 AND $2`;
    const result = await db.query(query, [startYearValue, endYearValue]);
    return result.rows;
}

// Function to fetch items based on category
async function category_wise_searched_items(database, categoryField, categoryValue) {
    return await fetchDatabase(database, categoryField, categoryValue);
}

// Function to fetch items based on season
async function season_wise_searched_items(database, animeSeasonField, animeSeasonValue) {
    return await fetchDatabase(database, animeSeasonField, animeSeasonValue);
}

// Function to fetch items based on genre
async function type_wise_searched_items(database, animeTypeField, animeTypeValue) {
    return await fetchDatabase(database, animeTypeField, animeTypeValue);
}

module.exports = {
    text_based_searched_items,
    year_wise_searched_items,
    category_wise_searched_items,
    season_wise_searched_items,
    type_wise_searched_items
};
