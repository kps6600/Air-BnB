const express = require("express");
const app = express ();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const wrapAsync = require("./utils/wrapAsync.js"); 
const methodOverride = require("method-override");
const ejsMate= require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js"); 
const {listingSchema} = require("./schema.js");

 
let MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
async function main() {
    await mongoose.connect(MONGO_URL);
};

main().then(() =>{
    console.log("connected to DB"); 
}).catch((err) =>{
    console.log("some err in Db", err);
    
}); 

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));   

// initialization of Route
app.get("/", (req, res) =>{
    res.send("kam");
});


// const validateListing = (req, res, next) =>{
//     let error = listingSchema.validate(req.body); 
//     if(error){
//         let errMsg = error.details.map((el) =>el.message).join(",");
//      throw new ExpressError(400,errMsg)
//     }
//     else{
//         next();
//     }
// }
// Index Route 
app.get("/Listing", /* validateListing,*/ wrapAsync( async (req, res) =>{ 
    const allListings = await Listing.find({});
    res.render("Listing/index.ejs", {allListings} );
}));

// New Route
app.get("/Listing/new", (req, res) =>{
    res.render("Listing/new.ejs")
});

//Create Post Route
app.post("/Listing", wrapAsync( async (req, res, next) => {
    //let {title, description, image, price, location, country} = req.body; 
       
        let newlisting = new Listing(req.body.listing);
        await newlisting.save();
        res.redirect("/Listing")
    
  
}));

// Show  Route
app.get("/Listing/:id", wrapAsync(async (req, res) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("Listing/show.ejs", {listing});
}));

 // Edit Route
 app.get("/Listing/:id/edit", wrapAsync( async (req, res) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("Listing/edit.ejs", {listing});
}));

// Update Route
app.put("/Listing/:id",/* validateListing,*/ wrapAsync(async(req, res) =>{
    
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/Listing/${id}`)
}));

// Delete Route
app.get("/Listing/:id/delete", wrapAsync(async( req, res) =>{
    let {id} = req.params;
    let deletedList = await Listing.findByIdAndDelete(id);
    console.log(deletedList); 
    res.redirect("/Listing");
}));
app.all("*", (req, res, next) =>{
    next(new ExpressError(404, "Page Not Found!"));
})
  
app.use((err, req, res, next) =>{ 
    let {statusCode =500, message = "Something went wrong!"} = err;
    res.render("error.ejs", {err})
    // res.status(statusCode).send(message);
})

app.listen(8080, () =>{
    console.log("server is listening to port 8080"); 
});