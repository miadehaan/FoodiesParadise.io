const db = require("../models/restaurant.js");

var express = require("express");
const {
    Router
} = require("express");

var router = express.Router();


router.get("/restaurant", function (req, res) {
    db.Restaurant.findAll({
        include: [db.Post]
    }).then(function (dbRestaurant) {
        res.json(dbRestaurant)
    });
});

router.get("/restaurant/:id", function (req, res) {
    db.Restaurant.findOne({
        where: {
            id: req.pramas.id
        },
        include: [db.Post]
    }).then(function (dbRestaurant) {
        res.json(dbRestaurant);
    });
});

router.post("/restaurant", function (req, res) {
    db.Restaurant.create(req.body).then(function (dbRestaurant) {
        res.json(dbRestaurant);
    });
});

router.delete("/restaurant/:id", function (req, res) {
    db.Restaurant.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (dbRestaurant) {
        res.json(dbRestaurant);
    })
})


module.exports = router;