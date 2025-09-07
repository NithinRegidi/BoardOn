const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/BoardOn";

// MongoDB Database Connected
main()
.then(() => {
    console.log("Connected to DataBase");
})
.catch((err) => {
    console.log("Error in Connecting to Database");
    console.log(err);
})

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.insertMany(initData);
    console.log("Data was Intialized");
}

initDB();