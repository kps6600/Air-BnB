const express = require("express");
const router = express.Router({mergeParams: true});
const methodOverride = require("method-override");
const wrapAsync = require("../utils/wrapAsync.js"); 
const {validateReview, isLoggedIn, isAuthor} = require("../middlewares.js")

// requiring - ListingController
 const reviewController = require("../controller/reviews.js");
router.use(express.urlencoded({extended:true}));
router.use(methodOverride("_method"));

// Reviews 
//Post route
router.post("/", 
    isLoggedIn, 
    validateReview,wrapAsync(reviewController.createPost));

// Delete review route
router.delete("/:reviewId", isLoggedIn, isAuthor, wrapAsync(reviewController.deletePost));

    module.exports = router;