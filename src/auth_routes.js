const express = require("express");
const passport = require("./passport_setup");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.redirect("/profile");
  }
);

module.exports = router;
