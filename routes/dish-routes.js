const db = require("../models/dish.js");

var express = require("express");
const {
    Router
} = require("express");

const app = express();

app.get("/api/dish", function (req, res) {
    db.Dish.findAll({
        include: [db.Post]
    }).then(function (dbDish) {
        res.json(dbDish)
    });
});

module.exports = Router;