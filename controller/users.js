
// exporting reviews modules  
//requiring - userSchema
const User = require("../models/user.js");

// User - signup page rendering 
module.exports.renderingSignupPage = (req, res) =>{
    res.render("users/signup.ejs")
  }; 

// User - Post Signup Page
module.exports.PostSignupPage = async(req, res)=>{
    try{
         let {username, email, password} = req.body;
        const newUser = new User({email, username});
        const registeredUser =await User.register(newUser, password);
        // console.log(registeredUser);
        req.login(registeredUser, (err) =>{
          if(err){
            return next(err);
          }
          req.flash("success","Welcome to Wanderlust!");
          res.redirect("/Listing");
        });
    }catch(e){
          req.flash("error", e.message);
          res.redirect("/signup");
    }     
};

// User - Rendering Login Page
module.exports.renderingLogginPage = (req, res) =>{
    res.render("users/login.ejs");
};

// User - Post Login Page
module.exports.postLoginPage = async(req, res) =>{
  req.flash("success", "Welcome back to Wanderlust");
  let redirectUrl = res.locals.redirectUrl || "/Listing";
  res.redirect(redirectUrl);
};

// User - Logout page
module.exports.logout = (req, res, next) =>{  
  req.logOut((err) =>{
    if(err){
      return next(err);
    }
    req.flash("success", " you are logged out");  
    res.redirect("/Listing");
  });
};
