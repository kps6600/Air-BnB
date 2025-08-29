
// requiring - express  
const express = require("express");
const router = express.Router(); // using Router from express

// importing userController
const userController = require("../controller/users.js");

// requiring - wrapAsync
const wrapAsync = require("../utils/wrapAsync");

// requiring - passport
const passport = require("passport");

// requiring middlewares
const {saveRedirectUrl} = require("../middlewares.js");


  router
  .route("/signup")
  .get(userController.renderingSignupPage)// signup route - get
  .post(wrapAsync(userController.PostSignupPage));// signup route - post



router
  .route("/login")
  .get(userController.renderingLogginPage)// login router - get
  .post(saveRedirectUrl, passport.authenticate("local", {failureRedirect:"/login", failureFlash: true}), userController.postLoginPage); // login router - post

// logout route 
router.get("/logout", userController.logout);

 module.exports = router;