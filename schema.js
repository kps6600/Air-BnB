const Joi = require('joi');
const Listing = require('./models/listing.js');
 module.exports.listingSchema = Joi.object({
    Listing : Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().allow("", null),
        price: Joi.number().required().min(0),
        location: Joi.string().required(),
        country: Joi.string().required(),
         
    }).required()
});