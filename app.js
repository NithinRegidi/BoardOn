
const express = require("express");
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const MONGO_URL = "mongodb://127.0.0.1:27017/BoardOn";
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended : true }));
app.use(methodOverride("_method"));

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


// New Listing Route
app.get("/listings/new", (req, res) =>{
    res.render("new.ejs");
})

// Show Route 
app.get("/listings/:id", async (req, res) => {
    let {id} = req.params;
    const listingById = await Listing.findById(id);
    res.render("show.ejs", {listings : listingById});
})


// create route
app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body);
    await newListing.save();
    res.redirect("/listings");
    console.log("New listing added");
});


//edit listing
app.get("/listings/:id/edit", async (req, res) => {
    let {id} = req.params;
    const listingById = await Listing.findById(id);
    console.log("Updated Listing ID: ", listingById)
    res.render("edit.ejs", {listings : listingById});
})

app.put("/listings/:id", async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body});
    res.redirect(`/listings/${id}`);
})


// Delete Listing
app.delete("/listings/:id", async (req, res) => {
    let {id} = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log("Deleted Listing: ", deletedListing);
    res.redirect("/listings");
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