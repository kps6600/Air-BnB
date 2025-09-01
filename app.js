
// this is for config my image
if(process.env.NODE_ENV != "production"){
require("dotenv").config();
};
// requiring - express
const express = require("express");
const app = express (); // using exprss as app

// requiring - mongoose
const mongoose = require("mongoose");

// requiring - path
const path = require("path");


// requiring - methodOverride function
const methodOverride = require("method-override");

// requiring - ejsMte engine
const ejsMate= require("ejs-mate");


// requiring - routers
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js")
const userRouter = require("./routes/user.js");

// requiring - expressError
const ExpressError = require("./utils/ExpressError.js"); 

// requiring - express-session
const session = require("express-session"); 
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

 
// let MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust
const atlasDbUrl = process.env.ATLASDB_URL;
async function main() {
    await mongoose.connect(atlasDbUrl);
};

main().then(() =>{
    console.log("connected to DB"); 
}).catch((err) =>{
    console.log("some err in DB", err);
    
}); 


app.use(express.json()); // For JSON API
app.set("views", path.join(__dirname, "views"));
app.set("view eng ine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public"))); 


// session options variables 
const sessionOptions = {
    secret: "mysecretcode",
    resave: false,
    saveUninitialized: true,
   cookie :{
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge:  7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
   },
};
 
//1st we need to use  session with theri sessions option variables to initialized the passport
app.use(session(sessionOptions)); 

// useed flash 
app.use(flash());

// 2nd we needs to  initialized the passport
app.use(passport.initialize());

// 3rd we need to connect the passport with session
app.use(passport.session());

// 4th we need to create new localStrategy to authenticate user by static method authenticate() 
passport.use(new LocalStrategy(User.authenticate()));

// 5th we need to serialized user (store user data after login)
passport.serializeUser(User.serializeUser());
// 6th we need to deserialized  User (remove user  date afer logout)
passport.deserializeUser(User.deserializeUser());

// this is for define locals memory
app.use((req, res, next) =>{
    res.locals.success = req.flash("success"); 
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});


// demoUser - Creation
// app.get("/demouser", async(req, res)=>{
//     let fakeUser = new User({
//         email: "Kam123@gmail.com",
//         username: "ks6600",
//     });
//     let registeredUser = await User.register(fakeUser, "helloworld");
//     res.send(registeredUser);
// });

// importing listing route
app.use("/Listing",listingRouter);

// importing review route
app.use("/Listing/:id/reviews", reviewRouter);

// Importing user route
app.use("/", userRouter);


app.all("*", (req, res, next) =>{
    next(new ExpressError(404, "Page Not Found!"));
});
  
app.use((err, req, res, next) =>{ 
    let {statusCode =500, message = "Something went wrong!"} = err;
    res.render("error.ejs", {err})
    // res.status(statusCode).send(message);
    next();
})

app.listen(8080, () =>{
    console.log("server is listening to port 8080"); 
});