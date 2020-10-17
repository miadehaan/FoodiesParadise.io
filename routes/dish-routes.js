const db = require("../models/dish.js");

var express = require("express");
const {
    Router
} = require("express");

const app = express();


app.get("/dish", function (req, res) {
    db.Dish.findAll({
        include: [db.Post]
    }).then(function (dbDish) {
        res.json(dbDish)
    });
});

app.get("/dish/:id", function (req, res) {
    db.Dish.findOne({
        where: {
            id: req.pramas.id
        },
        include: [db.Post]
    }).then(function (dbDish) {
        res.json(dbDish);
    });
});

app.post("/dish", function (req, res) {
    db.Dish.create(req.body).then(function (dbDish) {
        res.json(dbDish);
    });
});

app.delete("/dish/:id", function (req, res) {
    db.Dish.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (dbDish) {
        res.json(dbDish);
    })
})


module.exports = Router;