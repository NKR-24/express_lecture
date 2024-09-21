require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("./src/passport_setup");
const verifyToken = require("./src/auth");
const authRoutes = require("./src/auth_routes");

const SERVER_PORT = process.env.SERVER_PORT || 3000;
const BINDING_PORT = "0.0.0.0";
const APP = express();

APP.use(bodyParser.json());

// Add the cookieParser and session middleware
APP.use(cookieParser());
APP.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);
APP.use(passport.initialize());
APP.use(passport.session());

APP.use("/auth", authRoutes);

APP.get("/", (req, res) => {
  res.status(200).send("Hello, this is the root route!");
});

APP.get("/profile", verifyToken, (req, res) => {
  res.status(200).send(`Hello, ${req.user.id}, this is the profile route!`);
});

APP.listen(SERVER_PORT, BINDING_PORT, () => {
  console.log(
    `Server is running on http://localhost:${SERVER_PORT}/auth/google`
  );
});
