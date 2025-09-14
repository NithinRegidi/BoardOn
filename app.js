
const express = require("express");
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const MONGO_URL = "mongodb://127.0.0.1:27017/BoardOn";
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended : true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.engine("ejs", ejsMate);

// MongoDB Database Connected
main()
.then(() => {
    console.log("Connected to DataBase");
})
.catch((err) => {
    console.log("Error in Connecting to Database");
    console.log(err);
    process.exit(1); // Exit if database connection fails
});

async function main() {
    await mongoose.connect(MONGO_URL);
}
 

app.get("/", (req, res) => {
    res.send("BoardOn Project");
})

// Index Route
app.get("/listings", wrapAsync(async (req, res) => {
    const allListings = await Listing.find();
    res.render("index.ejs", { Listings : allListings });
}));


// New Listing Route
app.get("/listings/new", (req, res) =>{
    res.render("new.ejs");
})

// Show Route 
app.get("/listings/:id", wrapAsync(async (req, res, next) => {
    let {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ExpressError("Invalid Listing ID", 400);
    }
    const listingById = await Listing.findById(id);
    if (!listingById) {
        throw new ExpressError("Listing not found", 404);
    }
    res.render("show.ejs", {listings : listingById});
}));


// create route
app.post("/listings", wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body);
    await newListing.save();
    res.redirect("/listings");
    console.log("New listing added");
}));


//edit listing
app.get("/listings/:id/edit", wrapAsync(async (req, res, next) => {
    let {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ExpressError("Invalid Listing ID", 400);
    }
    const listingById = await Listing.findById(id);
    if (!listingById) {
        throw new ExpressError("Listing not found", 404);
    }
    res.render("edit.ejs", {listing : listingById});
}));

app.put("/listings/:id", wrapAsync(async (req, res, next) => {
    let {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ExpressError("Invalid Listing ID", 400);
    }
    await Listing.findByIdAndUpdate(id, {...req.body});
    res.redirect(`/listings/${id}`);
}));


// Delete Listing
app.delete("/listings/:id", wrapAsync(async (req, res, next) => {
    let {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ExpressError("Invalid Listing ID", 400);
    }
    const deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) {
        throw new ExpressError("Listing not found", 404);
    }
    res.redirect("/listings");
}));


// 404 Handler - For non-existent routes
app.use((req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});

// Global Error Handler
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error", { statusCode, message });
});



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