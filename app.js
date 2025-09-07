
const express = require("express");
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const MONGO_URL = "mongodb://127.0.0.1:27017/BoardOn";
const Listing = require("./models/listing");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

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
    mongoose.connect(MONGO_URL);
}

app.get("/", (req, res) => {
    res.send("Hello World");
})

// Index Route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find();
    res.render("index.ejs", { Listings : allListings });
})













app.listen(port, () => {
    console.log("Server is running");
})

// {
// Sample Listing
// app.get("/test", async (req, res) => {
//     let List = new Listing({
//         title : "Cozy Downtown Apartment",
//         description: "A comfortable apartment in the heart of the city, close to all attractions.",
//         price : 120,
//         location : "New York",
//         country : "USA"
//     })

//     await List.save();
//     console.log("Successfully Added");
//     res.send("Added");
// })
// }