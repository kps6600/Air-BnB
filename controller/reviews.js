
// exporting reviews modules
const Listing = require("../models/listing.js"); 
const Review = require("../models/review.js");
// reviews - post
module.exports.createPost = async (req, res) =>{
    let {id} = req.params;
   let list = await Listing.findById(id); 
   let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
   list.reviews.push(newReview);
   await newReview.save();
   await list.save();
    //console.log(newReview);  
   console.log("new review saved");
   req.flash("success", " New Review Created!");
   res.redirect(`/Listing/${id}`) 
};

//review - delete
module.exports.deletePost = async(req, res) => {
        let {id,  reviewId} = req.params;
        await Listing.findByIdAndUpdate(id, {$pull:{reviews: reviewId}})
        await Review.findByIdAndDelete(reviewId);
        req.flash("success", "Review Deleted!");
        res.redirect(`/Listing/${id}`);
    };