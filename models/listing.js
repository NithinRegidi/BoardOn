const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000
    },
    image: {
        default : "https://unsplash.com/photos/black-and-white-bed-near-brown-wooden-table-T5pL6ciEn-I",
        type: String,
        set: (v) => v === "" ? "https://unsplash.com/photos/black-and-white-bed-near-brown-wooden-table-T5pL6ciEn-I" : v,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

