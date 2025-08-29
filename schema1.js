const { z } = require("zod");
const Joi = require("joi");

module.exports.listingSchema = z.object({
  listing: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    image: z.object({
        url: z.string().url("Must be a valid URL"),
        filename: z.string().optional().nullable(),
      }).optional(),
    price: z.coerce.number().min(0, "Price must be a non-negative number"),
    location: z.string().min(1, "Location is required"),
    country: z.string().min(1, "country is required"),
  })
});
 
 

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    Comment: Joi.string().required(),
  }).required(),
});

