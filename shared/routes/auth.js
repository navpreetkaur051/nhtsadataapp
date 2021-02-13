const router = require("express").Router();
const passport = require("passport");
let user = {};

// for deploy
let path = "/";
if (process.env.NODE_ENV !== "production") {
  //for local setup
  path = "http://localhost:3000";
}


router.get("/failed", (req, res) => {
  res.send("Your account is not valid!");
});

router.get("/login/success", (req, res) => {
  if (req.user !== undefined) {
    //check for admin
    res.json({
      authenticated: true,
      user: req.user,
      cookies: req.cookies,
      message: "Authenticated",
    });
  } else {
    res.json({
      authenticated: false,
      cookies: req.cookies,
      message: "Not Authenticate",
    });
  }
});

router.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect(path);
});

//outlook
router.get('/outlook', 
  passport.authenticate('azuread-openidconnect', { failureRedirect: '/auth/failed' }),
  function(req, res) {
    console.log('Login outlook was called');
    res.redirect(path);
});
 
router.post('/outlook/callback',
  passport.authenticate('azuread-openidconnect', { failureRedirect: '/auth/failed' }),
  function(req, res) { 
    res.redirect(path);
  });
 

module.exports = router;
