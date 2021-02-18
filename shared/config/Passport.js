const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
//const OIDCStrategy  = require("passport-azure-ad").OIDCStrategy;
const User = require("../model/adminModel");
require("dotenv").config();

// for deploy
let path = "/";
if (process.env.NODE_ENV !== "production") {
  //for local setup
  path = "http://localhost:8080/";
}

// pass user.id to encrypt
passport.serializeUser((req, user, done) => {
  done(null, user);
});

// get user.id from cookie and decrypt
passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.googleClientID,
      clientSecret: process.env.googleClientSecret,
      callbackURL: process.env.redirectURL,
    },
    (accessToken, refreshToken, profile, done) => {
      const { sub: googleId, name, email, picture, hd } = profile._json;

      // check the email is admin or not
      const adminEmail = process.env.adminemail;
      if (email === adminEmail && hd && hd === "uottawa.ca") {
        const newUser = new User({
          googleId: googleId,
          name: name,
          email: email,
          admin: true,
        });

        // Check if database has already had this user
        User.findOneAndUpdate({ googleId: googleId }, { admin: true }).then(
          (currentUser) => {
            // if it has, don't save
            if (currentUser) {
              done(null, currentUser);
            } else {
              // if it does not, save the new user
              newUser.save().then((newUser) => {
                done(null, newUser);
              });
            }
          }
        );
      } else {
        done(new Error("Invaild host domain!"));
      }
    }
  )
);

// passport.use(
//   new OIDCStrategy (
//     {
//       clientID: process.env.OAUTH_clientID,
//       clientSecret: process.env.OAUTH_clientSecret,
//       identityMetadata:`${process.env.OAUTH_AUTHORITY}${process.env.OAUTH_ID_METADATA}`,
//       responseType: "code id_token",
//       responseMode: "form_post",
//       redirectUrl: process.env.OAUTH_REDIRECTURI,
//       allowHttpForRedirectUrl :true,
//       validateIssuer :true,
//       issuer:process.env.OAUTH_ISSUER,
//       passReqToCallback :false,
//       scope:process.env.OAUTH_SCOPES.split(' '),
//     },
//     signInComplete  
//   ));

//   async function signInComplete(iss, sub, profile, accessToken, refreshToken, params, done) {
    
//     if (!profile.oid) {
//       return done(new Error("No OID found in user profile."));
//     }
  
//     try{
//       const {oid:outlookId, name, email, tid } = profile._json;

//       // check the email is admin or not
//       const adminEmail = process.env.adminemail;
//       if (email == adminEmail && tid && tid == process.env.OAUTH_TID) {
//         const newUser = {
//           outlookId: outlookId,
//           name: name,
//           email: email,
//           admin: true,
//         };
//         //set user
//         // Check if database has already had this user
//         User.findOneAndUpdate({ outlookId: outlookId }, { admin: true }).then(
//           (currentUser) => {
//             // if it has, don't save
//             if (currentUser) {
//               done(null, currentUser);
//             } else {
//               // if it does not, save the new user
//               newUser.save().then((newUser) => {
//                 done(null, newUser);
//               });
//             }
//           }
//         );
//       } 
//        else {
//         done(new Error("Invaild account!"));
//       }
//     } catch (err) {
//       return done(err);
//     }
// }
  