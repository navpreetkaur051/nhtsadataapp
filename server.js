const express = require("express");
const database = require("./shared/config/Database");
const morgan = require("morgan");
const cors = require("cors");
const cookieSession = require("cookie-session");
const passportSetup = require("./shared/config/Passport");
const passport = require("passport");
const http = require("http");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const authRoutes = require("./shared/routes/auth");
const control = require("./shared/model/controlModel");
require('dotenv').config()


const app = express();

const PORT = process.env.PORT || 8080; //Step 1

if (process.env.NODE_ENV === "production") {
  console.log("dir name", __dirname);
  app.use("/", express.static(path.join(__dirname, "/client/build")));
}

app.all("*", function (req, res, next) {
  if (process.env.NODE_ENV !== "production") {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");

  if (req.method == "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// use cookie-session to encrypt user.id
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.cookieKey],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

// use application/json to submit data
app.use(bodyParser.json({ limit: "5mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);

app.use(passport.initialize());
app.use(passport.session());

// log output
app.use(morgan("tiny"));

// auth router
app.use("/auth", authRoutes);

//control route
app.post("/adminctrlset", (req, res) => {
  
  let typ = req.body.dvw;
  var myquery = { doc: "1" };
  var newvalues = { $set: {vw:typ} };
  control.updateOne(myquery, newvalues, (error,data) => {
    if (error) {
      console.log(error);
    }
    res.send("updated successfully");
  });

});

app.listen(PORT, () => console.log(`Server is starting at ${PORT}`));
