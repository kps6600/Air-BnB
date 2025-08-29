
// mapboc sdk serivces for geocoding (forward coding means converting location name into geocoding)
const mbxGeocoding  = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken});

// exporting listing modules
const Listing = require("../models/listing");
const { log } = require("console");

// index route (Render show all Listings)
module.exports.index =  async (req, res) =>{ 
    const allListings = await Listing.find({});
    res.render("Listing/index.ejs", {allListings} );
};  

// Render new listing From
module.exports.renderNewListingForm = (req, res) =>{
    res.render("Listing/new.ejs")
};

// post new listing
module.exports.postNewListing = async (req, res, next) => {
    let response = await geocodingClient.forwardGeocode({
    query: 'New Delhi, India',
    limit: 2
  })
   .send();
    console.log(response);
    res.send("done!");v 
    
    // console.log(req.body);  
    let url = req.file.path; 
    let filename = req.file.filename; 
    // console.log(url,"....", filename);
    const newlisting = new Listing( req.body.listing);
    newlisting.image = {url, filename};
    newlisting.owner = req.user._id;
    let savedData = await newlisting.save();
    req.flash("success" ," New Listing Created!");
    // console.log(savedData);
    res.redirect("/Listing");
};

// show Listing

module.exports.showListing = async (req, res) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id).populate({path:"reviews", populate:{path: "author"}}).populate("owner");
    if(!listing){
        req.flash("error" ," Listing Does Not Exits!");
        res.redirect("/Listing");
    };
    res.render("Listing/show.ejs", {listing});
};

// render edit form
module.exports.renderEditForm = async (req, res) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
     if(!listing){
        req.flash("error" ," Listing Does Not Exits!");
        res.redirect("/Listing");
    };
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
    res.render("Listing/edit.ejs", {listing ,originalImageUrl});
};

// Update Listing
module.exports.updateListing = async(req, res) =>{
    let {id} = req.params;
    let updatedListing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
   
    if(typeof req.file !== "undefined"){
        let url = req.file.path; 
        let filename = req.file.filename;
        updatedListing.image = { url, filename };
         let savedData = await updatedListing.save();
       }
    req.flash("success" ,"Listing Updated!");
    res.redirect(`/Listing/${id}`);
};

// delete listing
module.exports.deleteListing = async( req, res) =>{
    let {id} = req.params;
    let deletedList = await Listing.findByIdAndDelete(id);
    req.flash("success" ,"Listing Deleted!");
    // console.log(deletedList); 
    res.redirect("/Listing");
};