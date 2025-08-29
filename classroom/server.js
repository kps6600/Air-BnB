const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
const { success } = require("zod");


// creting a variable
const sessionOption = {
        secret: "mysuperscretstring",
         resave: false,
        saveUninitialized: true
};

// both are the use for views path by ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


// using all require elements
app.use(session(sessionOption));
app.use(flash());
app.use((req, res, next) =>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
});



// test the session id
app.get("/test", (req, res) =>{
    res.send("test successfull");
});

// for track the request time
// app.get("/reqcount", (req, res) =>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1;
//     }
//     res.send(`you send a requsest ${req.session.count} time`);
// });

// registration route

app.get("/register", (req, res) =>{
    let {name = "anonymous"} = req.query; 
    req.session.name = name ;
    if(name == "anonymous"){
        req.flash("error", "user not registered");
    }else{
        req.flash("success", "user registered successfully!");
    };
    // console.log(name);
    res.redirect("/hello");
});

//say hello
app.get("/hello", (req, res) =>{
    // console.log(req.flash("success"));
    res.render("page.ejs", {name: req.session.name});
})





// const cookieParser = require("cookie-parser");
// app.use(cookieParser()); 
 
// app.get("/greet",(req, res) =>{
//     let {name = "Kam"} = req.cookies;
//     res.send(`hii ${name}`);
// })

// app.get("/getcookies", (req, res) =>{
//     res.cookie("greet", "hello");
//     res.cookie("madein", "India");
//     res.send("sending some cockies!");
// })
// app.get("/", (req, res) =>{
//     console.dir(req.cookies);
//     res.send("Hi I am root!");
// });

app.listen(1200, () =>{
    console.log("sever in Listening to 1200");
});