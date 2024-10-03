const pg = require = (pg);
const blogIdGenerator = require("./custom-modules/blog/blog-id/blog_id_generator");


const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    // ssl: { rejectUnauthorized: false }
  });

  db.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch(err => {
    console.error('Error connecting to PostgreSQL database:', err);
  });

function saveToDatabaseText (blogHeading, BlogBody){
    
}
function saveToDatabaseImage () {
    
}

module.exports = {
    saveToDatabaseText,
    saveToDatabaseImage
}



