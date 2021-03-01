// dependencies
const path = require("path");
var express = require("express");
const sequelize = require("sequelize");
var app = express.Router();

// loads the primary HTML page 
app.get("/", function (req, res) {
    // res.sendFile(path.join(__dirname, "../views/index.html"));
    res.render("index");
});

app.get("/reviewHistory", function (req, res) {
    res.render("reviews");
});

module.exports = app;