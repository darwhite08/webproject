
// // routes/index.js
// const express = require('express');
// const router = express.Router();
// const pg = require("pg");
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth2");
// const session = require("express-session");
// const env = require("dotenv");
// const Strategy = require('passport-local');
// const ejs = require("ejs");

// env.config();
// const app = express();
// const db = new pg.Client({
//     user: process.env.PG_USER,
//     host: process.env.PG_HOST,
//     database: process.env.PG_DATABASE,
//     password: process.env.PG_PASSWORD,
//     port: process.env.PG_PORT,
//   });

//   app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       maxAge: 60000 * 60 * 60  // session timeout of 60 seconds
//     },
//   }));
  
  
//   app.use(passport.initialize());
//   app.use(passport.session());

// router.get('/page1', (req, res) => {
//     res.render('page1'); // Render page1.ejs
// });

// router.get('/page2', (req, res) => {
//     res.render('page2'); // Render page2.ejs
// });

// db.connect()
//   .then(() => {
//     console.log('Connected to PostgreSQL database');
//   })
//   .catch(err => {
//     console.error('Error connecting to PostgreSQL database:', err);
//   });


// router.get('/', async (req, res) => {
//   if (req.isAuthenticated()) {
//     const result = await db.query("SELECT * FROM best_anime_list_user JOIN best_anime_list ON best_anime_list_user.id = best_anime_list.user_link_id ");
//     // var currentUserData  = await db.query("SELECT * FROM best_anime_list_user WHERE user_id=$1",[req.profile])
//     res.render('main', { animeList: result.rows, total: result.rows.length, userTrue: true,profile_picture:req.user.profilePicture  });
//     console.log(req.user.sub)
//   }
//   else {
//     res.render('Auth/loginPage');
//   }
// });

// router.get('/login', async (req, res) => {
//   res.render('Auth/loginPage'); // 
// });

// router.get('/auth/google', passport.authenticate("google", {
//   scope: ["profile", "email"]
// }));

// router.get('/auth/google/secrets', passport.authenticate("google", {
//   successRedirect: "/",
//   failureRedirect: "/login"
// }));

// router.get('/user/dash-board', async (req, res) => {
//   if (req.isAuthenticated()) {
//     res.render('main2',{userName:req.user.userName,email:req.user.email, profilePicture:req.user.profilePicture});
//   }
//   else {
//     res.render('Auth/loginPage');
//   }
// });

// router.get('/logout', async (req, res) => {
//   req.logout((err)=>{
//     if (err) {
//       res.send("logout failed");
//     }
//     else{
//       res.render('main',{userTrue:false});
//     }
//   });
// });

// passport.use(
//     "google",
//     new GoogleStrategy(
//       {
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: "http://localhost:3000/auth/google/secrets",
//         userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
//       },
//       async (accessToken, refreshToken, profile, cb) => {
//         try {
//           console.log(profile);
//           const result = await db.query("SELECT * FROM best_anime_list_user WHERE email = $1", [
//             profile.email,
//           ]);
//           if (result.rows.length === 0) {
//             const newUser = await db.query(
//               "INSERT INTO best_anime_list_user (email, user_password,user_image,user_id,user_name) VALUES ($1, $2,$3,$4,$5)",
//               [profile.email, "google", profile.picture,profile.id,profile.displayName]
//             );
//             return cb(null, newUser.rows[0]);
//           } else {
//             return cb(null, result.rows[0]);
//           }
//         } catch (err) {
//           return cb(err);
//         }
//       }
//     )
//   );
  
  
//   passport.serializeUser(function (user, cb) {
//     process.nextTick(function () {
//       cb(null, { id: user.id,userId:user.user_id, username: user.user_name, profilePicture: user.user_image, email: user.email,});
//     });
//   });
  
//   passport.deserializeUser(function (user, cb) {
//     process.nextTick(function () {
//       return cb(null, user);
//     });
//   });
  
// module.exports = router;
