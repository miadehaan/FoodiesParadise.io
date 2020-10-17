// dependencies
const path = require("path");
var express = require("express");
const {
    Router
} = require("express");

const app = express();
// routes

// index route loads view.html
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/index.html"));
});

// cms route loads cms.html
app.get("/cms", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/index.html"));
});

// blog route loads blog.html
app.get("/blog", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/index.html"));
});

// authors route loads author-manager.html
app.get("/authors", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/index.html"));
});


module.exports = Router;