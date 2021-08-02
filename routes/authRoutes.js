const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const usersAuth = require("../controllers/auth");

router.route("/register").get(usersAuth.registerUser).post(usersAuth.postUser);

router
  .route("/login")
  .get(usersAuth.getLogin)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    usersAuth.postLogin
  );

router.get("/logout", usersAuth.logout);

module.exports = router;
