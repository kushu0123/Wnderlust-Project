const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new mongoose.Schema ({
    title :  {
       type:  String,
       required: true,
    },
    description: String,
    image:  {
      url: String,
      filename: String,
    },
    price: Number,
    location: String,
    country : String,

    geometry: {
        type:{
            type: String,
            enum: ["Point"],    //'location.type' must be 'Point'
            require: true,
        },
        coordinates: {
            type: [Number],
            require:true,
        },
    },
    
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    category:{
        type:String,
        enum:["trending","rooms","iconic cities","mountain","castles","amazing pools","camping","farms","arctic pools"]
    }
});


listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({_id : {$in : listing.reviews} });
    }
})


//CREATE MODULE

const Listing = mongoose.models.Listing || mongoose.model("Listing", listingSchema);
module.exports = Listing;

