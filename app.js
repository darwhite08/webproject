const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const pg = require("pg");
const passport = require("passport");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require("express-session");
const env = require("dotenv");
const Strategy = require('passport-local')
const axios = require('axios')

const app = express();
const port = process.env.PORT || 3000 ;
env.config();


// Middleware
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000 * 60 * 60  // session timeout of 60 seconds
  },
}));


const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: { rejectUnauthorized: false }
});


app.use(passport.initialize());
app.use(passport.session());


db.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch(err => {
    console.error('Error connecting to PostgreSQL database:', err);
  });



app.get('/',async(req,res) => {
    res.render('main' ,{tab:"home", user_authenticated:req.isAuthenticated});


});


// app.get('/best-anime-list', async (req, res) => {
//   if (req.isUnauthenticated()) {
//     const result = await db.query("SELECT * FROM best_anime_list_user JOIN best_anime_list ON best_anime_list_user.id = best_anime_list.user_link_id ");
//     res.render('main', { animeList: result.rows, total: result.rows.length, userTrue: false, pageSelection: "none" });
//   }
//   if (req.isAuthenticated()) {
//     const result = await db.query("SELECT * FROM best_anime_list_user JOIN best_anime_list ON best_anime_list_user.id = best_anime_list.user_link_id ");
//     res.render('main', { animeList: result.rows, total: result.rows.length, userTrue: true, profile_picture: req.user.profilePicture, pageSelection: "none" });
//   }

// });
app.get('/blog', async (req, res) => {
  if (req.isUnauthenticated()) {
    
    res.render('main', {userTrue:false, tab: "blog"});
  }
  if (req.isAuthenticated()) {
    res.render('main', {userTrue:true, tab: "blog" });
  }

});
app.get('/countdown', async (req, res) => {
  if (req.isUnauthenticated()) {
    const result = await db.query("SELECT * FROM anime_countdown JOIN best_anime_list_user ON anime_countdown.user_content_id = best_anime_list_user.id ");
    res.render('main', { animeList: result.rows, total: result.rows.length, userTrue: false, tab: "countdown" });
  }
  else {
    res.render('main', { userTrue: false, pageSelection: "countdown" });
  }
});



var anime = ["kodomomuke","shonen","shoujo","seinen","josei","mecha","sliceOfLife","mahouShoujo","isekai","yaoi","yuri","harem","ecchi","idol"];
// Don't use VAR here it will create clouser problem
for (let i = 0; i < anime.length; i++) {
  app.get(`/best-anime-list/${anime[i]}`, async (req, res) => {
      if (req.isUnauthenticated()) {
      const result = await db.query("SELECT * FROM best_anime_list JOIN best_anime_list_user ON best_anime_list_user.id = best_anime_list.user_id JOIN best_anime_list_content ON best_anime_list_content.id = best_anime_list.content_id WHERE lower(anime_type) = $1  LIMIT 10", [anime[i]]);
      if (result.length !== 0) {
        console.log(result.row)
        res.render('main', { animeList: result.rows, total: result.rows.length, userTrue: false, tab: "bestanimelist" });
        
      } else if(result.length === 0) {
        res.redirect('*');
      }
      } else {
        res.render('main', { userTrue: false, pageSelection: anime[i] });
      }

      // const response = await axios.get('https://m.imdb.com/title/tt9054364')
      // console.log(response.data)
      
  });
}
app.get('/login', async (req, res) => {
  res.render('Auth/loginpage'); // 
});


app.get('/auth/google', passport.authenticate("google", {
  scope: ["profile", "email"]
}));

app.get('/auth/google/secrets', passport.authenticate("google", {
  successRedirect: "/",
  failureRedirect: "/login"
}));

// Dash board router
app.get('/user/dash-board', async (req, res) => {
  if (req.isAuthenticated()) {
    res.render('main2' , {userTrue: true , profile_picture: req.user.profilePicture, username:req.user.username, email: req.user.email,settings:false,profile:true,content_upload:false});
  }
  else {
    res.render('Auth/loginPage');
  }
});
// profile router

app.get('/user/dash-board/profile', async (req, res) => {
  if (req.isAuthenticated()) {
    res.render('main2' , {userTrue: true , uploadcontenxt: true, profile_picture: req.user.profilePicture, username:req.user.username, email: req.user.email,settings:false,profile:true,content_upload:false});
  }
  else {
    res.render('Auth/loginPage');
  }
});
// upload content router
app.get('/user/dash-board/upload-content', async (req, res) => {
  if (req.isAuthenticated()) {
    res.render('main2' , {userTrue: true , uploadcontenxt: true, profile_picture: req.user.profilePicture, username:req.user.username, email: req.user.email,settings:false,profile:false,content_upload:true});
  }
  else {
    res.render('Auth/loginPage');
  }
});
// settings router
app.get('/user/dash-board/settings', async (req, res) => {
  if (req.isAuthenticated()) {
    res.render('main2' , {userTrue: true , uploadcontenxt: true, profile_picture: req.user.profilePicture, username:req.user.username, email: req.user.email,settings:true,profile:false,content_upload:false});
  }
  else {
    res.render('Auth/loginPage');
  }
});

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://www.animeunwatched.com/auth/google/secrets/",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        console.log(profile);
        const result = await db.query("SELECT * FROM best_anime_list_user WHERE email = $1", [
          profile.email,
        ]);
        if (result.rows.length === 0) {
          const newUser = await db.query(
            "INSERT INTO best_anime_list_user (email, user_password,user_image,google_id,user_name,user_id) VALUES ($1, $2,$3,$4,$5,$6)",
            [profile.email, "google", profile.picture, profile.id, profile.displayName ,profile.id ]
          );
          return cb(null, newUser.rows[0]);
        } else {
          return cb(null, result.rows[0]);
        }s
      } catch (err) {
        return cb(err);
      }
    }
  )
);


passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, userId: user.user_id, username: user.user_name, profilePicture: user.user_image, email: user.email, });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

app.get('*', (req, res) => {
  res.render('error')
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
