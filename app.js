const express = require("express");
const ejs = require("ejs");
const multer = require("multer");
const bodyParser = require("body-parser");
const path = require("path");
const pg = require("pg");
const passport = require("passport");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require("express-session");
const env = require("dotenv");
const Strategy = require('passport-local')
const axios = require('axios');
const { toInteger, forEach } = require("lodash");
const multerS3 = require("multer-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const algoliasearch = require('algoliasearch');
const {NodeHtmlMarkdown,NodeHtmlMarkdownOptions} = require('node-html-markdown');
const {marked} = require('marked');

const app = express();
const port = process.env.PORT || 3000;
env.config();



// https://animeunwatched-image-bucket.s3.ap-south-1.amazonaws.com/user-profile/abhi.jpg


// middle ware for parsing form data
app.use(bodyParser.urlencoded({ extended: false }))

// middle ware for parsing jason
app.use(bodyParser.json());

// Middleware
app.set('view engine', 'ejs');
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000 * 60 * 60  // session timeout of 60 seconds
  },
}));

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// New Route to the TinyMCE Node module 
// app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce5')));
app.use('/public', express.static(path.join(__dirname, 'public')));


// Bucket Details
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.S3_ACCESS_KEY_ID;
const secretAcessKey = process.env.S3_SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAcessKey
  },
  region: bucketRegion
})

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



app.get('/', async (req, res) => {

  if (req.isAuthenticated()) {
    res.render('main', { tab: "home", value: req.isAuthenticated(), profile_picture: req.user.profilePicture });
  }
  if (req.isUnauthenticated()) {
    res.render('main', { tab: "home", value: req.isAuthenticated() });
  }
});



//blog 
app.get('/blog', async (req, res) => {
  // res.render('maintenance-page')
  res.render('main', { value: false, tab: "blog" })


});
app.get('/countdown', async (req, res) => {
  // if (req.isUnauthenticated()) {
  //   const result = await db.query("SELECT * FROM anime_countdown JOIN best_anime_list_user ON anime_countdown.user_content_id = best_anime_list_user.id ");
  //   res.render('main', { animeList: result.rows, total: result.rows.length, userTrue: false, tab: "countdown", value: false });

  res.render('maintenance-page')
  // }
  // else {
  //   // res.render('main', { userTrue: false, pageSelection: "countdown" });
  //   res.render('main', { animeList: result.rows, total: result.rows.length, userTrue: false, tab: "countdown", value: false });

  // }
});

// Actiob figures
app.get('/action-figures', async (req, res) => {
  // if (req.isAuthenticated()) {

  //   res.render('main', { value: true, tab: "action-figures" });

  // }
  // if (req.isUnauthenticated()) {
  //   // res.render('main', { userTrue: false, pageSelection: "countdown" });
  //   res.render('main', { value: false, tab: "action-figures" });

  // }
  res.render('maintenance-page')
});



const animeRoute = [
  { id: 1, anime_type: 'isekai', anime_category: 'reincarnation' },
  { id: 2, anime_type: 'isekai', anime_category: 'summoning' },
  { id: 3, anime_type: 'isekai', anime_category: 'transmigration' },
  { id: 4, anime_type: 'idol', anime_category: 'lovely' },
  { id: 5, anime_type: 'idol', anime_category: 'pop' },
  { id: 6, anime_type: 'idol', anime_category: 'celeb' },
  { id: 7, anime_type: 'ecchi', anime_category: 'action' },
  { id: 8, anime_type: 'ecchi', anime_category: 'romance' },
  { id: 9, anime_type: 'ecchi', anime_category: 'comedy' },
  { id: 10, anime_type: 'harem', anime_category: 'action' },
  { id: 11, anime_type: 'harem', anime_category: 'romance' },
  { id: 12, anime_type: 'harem', anime_category: 'adventure' },
  { id: 13, anime_type: 'yuri', anime_category: 'supernatural' },
  { id: 14, anime_type: 'yuri', anime_category: 'school of life' },
  { id: 15, anime_type: 'yuri', anime_category: 'romance' },
  { id: 16, anime_type: 'yaoi', anime_category: 'fantasy' },
  { id: 17, anime_type: 'yaoi', anime_category: 'everyday tales' },
  { id: 18, anime_type: 'yaoi', anime_category: 'drama' },
  { id: 19, anime_type: 'mahou shouju', anime_category: 'classic & traditional' },
  { id: 20, anime_type: 'mahou shouju', anime_category: 'dark & Deconstructive' },
  { id: 21, anime_type: 'slice of life', anime_category: 'school life' },
  { id: 22, anime_type: 'slife of life', anime_category: 'romance' },
  { id: 23, anime_type: 'slife of life', anime_category: 'comedy' },
  { id: 24, anime_type: 'slice of life', anime_category: 'coming-of-age' },
  { id: 25, anime_type: 'mecha', anime_category: 'war' },
  { id: 26, anime_type: 'mecha', anime_category: 'super robot' },
  { id: 27, anime_type: 'mecha', anime_category: 'real robot' },
  { id: 28, anime_type: 'mecha', anime_category: 'dystopain' },
  { id: 29, anime_type: 'shonen', anime_category: 'action' },
  { id: 30, anime_type: 'shonen', anime_category: 'supernatural/fantasy' },
  { id: 31, anime_type: 'shonen', anime_category: 'sci-fiction' },
  { id: 32, anime_type: 'shonen', anime_category: 'sports' },
  { id: 33, anime_type: 'josei', anime_category: 'romance' },
  { id: 34, anime_type: 'josei', anime_category: 'everyday life' },
  { id: 35, anime_type: 'josei', anime_category: 'psychological' },
  { id: 36, anime_type: 'josei', anime_category: 'supernatural' },
  { id: 37, anime_type: 'shoujo', anime_category: 'romance' },
  { id: 38, anime_type: 'shoujo', anime_category: 'fantasy' },
  { id: 39, anime_type: 'shoujo', anime_category: 'slice of life' },
  { id: 40, anime_type: 'shoujo', anime_category: 'drama' },
  { id: 41, anime_type: 'seinen', anime_category: 'adventure' },
  { id: 42, anime_type: 'seinen', anime_category: 'thriller' },
  { id: 43, anime_type: 'seinen', anime_category: 'drama' },
  { id: 44, anime_type: 'seinen', anime_category: 'sci-fiction' },
  { id: 45, anime_type: 'kodomomuke', anime_category: 'adventure' },
  { id: 46, anime_type: 'kodomomuke', anime_category: 'comedy' },
  { id: 46, anime_type: 'kodomomuke', anime_category: 'educational' },
];

const groupAnimes = animeRoute.reduce((acc, anime) => {
  // get anime tpyes
  const type = anime.anime_type;

  // If the type doesn't exist in the accumulator, create an array for it
  if (!acc[type]) {
    acc[type] = [];
  }

  // Push the anime category into the corresponding type
  acc[type].push(anime.anime_category);

  return acc;
}, {});

console.log(groupAnimes)
// best anime list route
for (let index = 0; index < animeRoute.length; index++) {
  app.get(`/best-anime-list/${animeRoute[index]["anime_type"]}`, async (req, res) => {
    const animeList = await db.query("SELECT * FROM best_anime_list JOIN best_anime_list_user ON best_anime_list_user.id = best_anime_list.user_id JOIN best_anime_list_content ON best_anime_list_content.id = best_anime_list.content_id WHERE lower(anime_type) = $1  ", [animeRoute[index]["anime_type"].toLowerCase()]);
    // render
    if (req.isAuthenticated()) {
      if (animeList?.rows.length !== 0) {
        res.render('main', { animeList: animeList.rows, anime_type: animeRoute[index]['anime_type'], anime_category: groupAnimes[animeRoute[index]['anime_type']], total: animeList.rows.length, tab: "bestanimelist", value: req.isAuthenticated(), profile_picture: req.user.profilePicture });
      } else if (animeList.rows.length === 0) {
        res.render('maintenance-page')
      }
    } if (req.isUnauthenticated()) {
      if (animeList?.rows.length !== 0) {
        res.render('main', { animeList: animeList.rows, anime_type: animeRoute[index]['anime_type'], anime_category: groupAnimes[animeRoute[index]['anime_type']], total: animeList.rows.length, userTrue: false, tab: "bestanimelist", value: req.isAuthenticated() });
      } else if (animeList.rows.length === 0) {
        res.render('maintenance-page')
      }
    }

    // const response = await axios.get('https://m.imdb.com/title/tt9054364')
    // console.log(response.data)
  });
}

// watch list based on category
for (let index = 0; index < animeRoute.length; index++) {
  app.get(`/best-anime-list/${animeRoute[index]['anime_type']}/${animeRoute[index]['anime_category']}`, async (req, res) => {
    console.log(animeRoute[index])
    const animeList = await db.query("SELECT * FROM best_anime_list JOIN best_anime_list_user ON best_anime_list_user.id = best_anime_list.user_id JOIN best_anime_list_content ON best_anime_list_content.id = best_anime_list.content_id WHERE lower(anime_category) = $1  limit 10", [animeRoute[index]['anime_category'].toLowerCase()]);
    // render
    if (req.isAuthenticated()) {
      if (animeList?.rows.length !== 0) {
        res.render('main', { animeList: animeList.rows, anime_type: animeRoute[index]['anime_type'], anime_category: groupAnimes[animeRoute[index]['anime_type']], total: animeList.rows.length, tab: "bestanimelist", value: req.isAuthenticated(), profile_picture: req.user.profilePicture });
      } else if (animeList.rows.length === 0) {
        res.render('maintenance-page')
      }
    } if (req.isUnauthenticated()) {
      if (animeList?.rows.length !== 0) {
        res.render('main', { animeList: animeList.rows, anime_type: animeRoute[index]['anime_type'], anime_category: groupAnimes[animeRoute[index]['anime_type']], total: animeList.rows.length, userTrue: false, tab: "bestanimelist", value: req.isAuthenticated() });
      } else if (animeList.rows.length === 0) {
        res.render('maintenance-page')
      }
    }
  });
}
// upcoming anime
app.get('/upcoming-anime', async (req, res) => {
  // render
  if (req.isAuthenticated()) {
    res.render('main', { tab: 'upcoming', value: false })
  }
  else if (req.isUnauthenticated()) {
    res.render('main', { tab: 'upcoming', value: false })
  }
});

// anime chart
app.get('/anime-chart', async (req, res) => {
  // render
  if (req.isAuthenticated()) {
    res.render('main', { tab: 'upcoming', value: false })
  }
  else if (req.isUnauthenticated()) {
    res.render('main', { tab: 'upcoming', value: false })
  }
});

// weekly-recommended-anime
app.get('/weekly-reccomendation', async (req, res) => {
  // render
  if (req.isAuthenticated()) {
    res.render('main', { tab: 'weekly-reccomendation', value: false })
  }
  else if (req.isUnauthenticated()) {
    res.render('main', { tab: 'weekly-reccomendation', value: false })
  }
});
// anime by year
app.get('/anime-by-year', async (req, res) => {
  // render
  if (req.isAuthenticated()) {
    res.render('main', { tab: 'anime-by-year', value: false })
  }
  else if (req.isUnauthenticated()) {
    res.render('main', { tab: 'anime-by-year', value: false })
  }
});
// login
app.get('/login', async (req, res) => {
  res.render('Auth/loginpage'); // 
});

// Dash board router
app.get('/user/dash-board', async (req, res) => {
  if (req.isAuthenticated()) {
    res.render('main2', { userTrue: true, profile_picture: req.user.profilePicture, user_data: req.user, username: req.user.username, email: req.user.email, settings: false, profile: true, content_upload: false, watchlist: false, readLater: false, calender: false });
  }
  else {
    res.render('Auth/loginpage');
  }
});

// profile router

app.get('/user/dash-board/profile', async (req, res) => {
  if (req.isAuthenticated()) {
    res.render('main2', { userTrue: true, profile_picture: req.user.profilePicture, username: req.user.username, email: req.user.email, settings: false, profile: true, content_upload: false, watchlist: false, readLater: false, calender: false });
  }
  else {
    res.render('Auth/loginPage');
  }
});

// watchlist router
app.get('/user/dash-board/watchlist', async (req, res) => {
  if (req.isAuthenticated()) {
    res.render('main2', { userTrue: true, profile_picture: req.user.profilePicture, username: req.user.username, email: req.user.email, settings: false, profile: false, content_upload: false, watchlist: true, readLater: false, calender: false });
  }
  else {
    res.render('Auth/loginPage');
  }
});

// readLater router
app.get('/user/dash-board/read-later', async (req, res) => {
  if (req.isAuthenticated()) {
    res.render('main2', { userTrue: true, profile_picture: req.user.profilePicture, user_data: req.user, username: req.user.username, email: req.user.email, settings: false, profile: false, content_upload: false, watchlist: false, readLater: true, calender: false });
  }
  else {
    res.render('Auth/loginPage');
  }
});


// calender : pick by date
app.get('/user/dash-board/calender', async (req, res) => {
  if (req.isAuthenticated()) {
    res.render('main2', { userTrue: true, profile_picture: req.user.profilePicture, username: req.user.username, email: req.user.email, settings: false, profile: false, content_upload: false, watchlist: false, readLater: false, calender: true });
  }
  else {
    res.render('Auth/loginPage');
  }
});
// upload content get router
app.get('/user/dash-board/upload-content', async (req, res) => {
  if (req.isAuthenticated()) {
    res.render('main2', { userTrue: true, uploadcontenxt: true, user_data: req.user, settings: false, profile: false, content_upload: true, watchlist: false, readLater: false, calender: false });
  }
  else {
    res.render('Auth/loginPage');
  }
});

// upload content post router
app.post('/user/dash-board/upload-content/post', async (req, res) => {
  console.log(NodeHtmlMarkdown.translate(req.body.editorcontent));
  var markedDown = NodeHtmlMarkdown.translate(req.body.editorcontent);
  console.log(marked.parse(markedDown));
  res.send('done')
});

// settings router
app.get('/user/dash-board/settings', async (req, res) => {
  if (req.isAuthenticated()) {
    res.render('main2', { userTrue: true, uploadcontenxt: true, user_data: req.user, profile_picture: req.user.profilePicture, username: req.user.username, email: req.user.email, settings: true, profile: false, content_upload: false, watchlist: false, readLater: false, calender: false });
  }
  else {
    res.render('Auth/loginPage');
  }
})

const settingsUpload = upload.fields([{ name: 'username', maxCount: 1 }, { name: 'about', maxCount: 1 }, { name: 'cover-photo', maxCount: 1 }, { name: 'first-name', maxCount: 1 }, { name: 'last-name', maxCount: 1 }, { name: 'email', maxCount: 1 }, { name: 'country', maxCount: 1 }, { name: 'street-address', maxCount: 1 }, { name: 'city', maxCount: 1 }, { name: 'region', maxCount: 1 }, { name: 'postal-code', maxCount: 1 }]);
app.post('/user/dash-board/settings/post', upload.single('cover-photo'), async (req, res, next) => {
  console.log(req.body)
  console.log(req.file.buffer)

  const params = {
    Bucket: bucketName,
    Key: req.file.originalname,
    Body: req.file.buffer,
    ContentType: req.file.mimetype

  };
  const command = new PutObjectCommand(params);
  await s3.send(command);
});

app.post('/blog/post', async (req, res) => {
  console.log();


});
// Note post

app.post('/note-post', async (req, res) => {

});

// Logout
app.get('/logout', function (req, res) {
  req.logout((err) => {
    if (err) {
      console.log(err);
    }
    else {
      res.redirect('/')
    }
  });
});



// Google Oath

app.get('/auth/google', passport.authenticate("google", {
  scope: ["profile", "email"]
}));

app.get('/auth/google/secrets', passport.authenticate("google", {
  successRedirect: "/",
  failureRedirect: "/login"
}));

// 

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/secrets",
      userProfileURL: "https://www.googleapis.com/oauth2/v2/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        console.log(profile);
        const result = await db.query("SELECT * FROM best_anime_list_user WHERE email = $1", [
          profile._json.email,
        ]);
        if (result.rows.length === 0) {
          const newUser = await db.query(
            "INSERT INTO best_anime_list_user (email, user_password,user_image,google_id,user_name) VALUES ($1, $2,$3,$4,$5)",
            [profile._json.email, "google", profile._json.picture, profile._json.id, profile.displayName]
          );
          return cb(null, newUser.rows[0]);
        } else {
          return cb(null, result.rows[0]);
        }
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

// default error
app.get('*', (req, res) => {
  res.render('error')
});

// maintanace page


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
