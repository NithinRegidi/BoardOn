const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const defaultImage = "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

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
        // type: String,
        // default: "https://unsplash.com/photos/black-and-white-bed-near-brown-wooden-table-T5pL6ciEn-I", // Correctly set default value here
        // set: (v) => v === "" ? "https://unsplash.com/photos/black-and-white-bed-near-brown-wooden-table-T5pL6ciEn-I" : v,

        type: String,
        default: defaultImage, // Use the defaultImage constant
        set: (v) => v.trim() === "" ? defaultImage : v, // Simplified set function
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

