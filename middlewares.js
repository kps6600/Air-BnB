const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const {reviewSchema} = require("./schema1.js");

// check loggin  middleware
  module.exports.isLoggedIn = (req, res,  next) =>{
    // console.log(req.user); 
    if(!req.isAuthenticated()){
         req.session.redirectUrl = req.originalUrl;
         req.flash("error", "you are not logged in!");
       return res.redirect("/login");
    }
    next();
};


// find current url middleware
module.exports.saveRedirectUrl= (req, res,  next) =>{
     if(req.session.redirectUrl){
     res.locals.redirectUrl = req.session.redirectUrl;
     }
    next();
}; 


// owner varification  middleware
module.exports.isOwner = async(req, res, next) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    console.log(listing);
    
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the Owner of this Listing");
       return res.redirect(`/Listing/${id}`);
    }
    next();
};

// validate reviewSchema by JOI
module.exports.validateReview = (req, res, next) =>{
    let {error} = reviewSchema.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

// author varification  middleware
module.exports.isAuthor = async(req, res, next) =>{
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the author of this Review");
       return res.redirect(`/Listing/${id}`);
    }
    next();
};