// dependencies
const path = require("path");
var express = require("express");
const sequelize = require("sequelize");
var app = express.Router();


// app.get("/test", function (req, res) {
//     console.log("working");
//     res.render("index");

// })

// loads the primary HTML page 
app.get("/", function (req, res) {
    // res.sendFile(path.join(__dirname, "../views/index.html"));

    res.render("index");
    // Display 10 restaurants based on geolocation when user first loads page

    // res.json({
    //     name: "testing"
    // })C:/Users/andrew/Documents/Coding Portfolio/FoodiesParadiseCopy.io/views/index.handlebars
});

// Show the blank form for new reviews
app.get("/reviewform", function (req, res) {
    res.render("newdishform");

});

app.get("/reviewHistory", function (req, res) {
    res.render("reviews");

});

// app.get("/index", function (req, res) {

//     // res.sendFile(path.join(__dirname, "../views/index"));
// });


module.exports = app;