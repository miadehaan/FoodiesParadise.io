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
app.get("", function (req, res) {
    // res.sendFile(path.join(__dirname, "../views/index.html"));

    res.render("index");

});


module.exports = app;