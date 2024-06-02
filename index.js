const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");


const app = express();
const port = process.env.PORT || 3000 ;



// Middleware
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',async(req,res) => {

    res.render('index' );
  });
  



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
