const express = require("express");
const router = express.Router({mergeParams: true});
const methodOverride = require("method-override");
const wrapAsync = require("../utils/wrapAsync.js"); 

 // requiring - ListingController
 const listingController = require("../controller/listing.js");

// requring  - isLoggedIn-middleware
const {isLoggedIn, isOwner} = require("../middlewares.js");
 
// requiring  cloudinary and storage
const{ storage } = require("../cloudConfig.js");

// requiring - multer (for encoding file data form the url)
const multer = require("multer");
// set path locally where image can store 
const upload = multer({ storage});

 
router.use(express.urlencoded({extended:true}));
router.use(methodOverride("_method"));

// combining routes
router
   .route("/")
   .get(wrapAsync(listingController.index))  // Index Route
   .post( isLoggedIn, upload.single('listing[image][url]'), wrapAsync(listingController.postNewListing));  //Create Post Route
 
// New Route
router.get("/new", isLoggedIn, listingController.renderNewListingForm);


 router
   .route("/:id")
   .get(wrapAsync(listingController.showListing)) // Show  Route
   .put(isLoggedIn, isOwner, upload.single('listing[image]'), wrapAsync(listingController.updateListing)); // Update Route

// Edit Route
 router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));

// Delete Route
router.get("/:id/delete", isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

module.exports = router; 