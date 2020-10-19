// dependencies
const path = require("path");
var express = require("express");
var app = express.Router();

// const app = express();
// routes
// module.exports = function (app) {

// app.get("/testtemplate", function (req, res) {
//     console.log("working");
//     res.render("index");

// })
app.get("/", function (req, res) {
    // res.sendFile(path.join(__dirname, "../views/index.html"));
    // res.sendFile(path.join(__dirname, "../views/index"));
    res.render("index");

});

// app.get("/index", function (req, res) {
//     res.sendFile(path.join(__dirname, "../views/index"));
// });

// app.get("/index", function (req, res) {
//     res.sendFile(path.join(__dirname, "../views/index"));
// });

// app.get("/index", function (req, res) {
//     res.sendFile(path.join(__dirname, "../views/index"));
// });

// }
module.exports = app;