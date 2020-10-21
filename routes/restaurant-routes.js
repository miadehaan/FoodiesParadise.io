const db = require("../models");

var express = require("express");
const {
    Router
} = require("express");

var router = express.Router();


router.get("/restaurant", function (req, res) {
    db.restaurant.findAll().then(function (dbRestaurant) {
        res.json(dbRestaurant)
    });
});

router.get("/restaurant/:id", function (req, res) {
    db.restaurant.findOne({
        where: {
            id: req.pramas.id
        }
        
    }).then(function (dbRestaurant) {
        res.json(dbRestaurant);
    });
});

router.post("/restaurant", function (req, res) {
    db.restaurant.create(req.body).then(function (dbRestaurant) {
        res.json(dbRestaurant);
    });
});

router.delete("/restaurant/:id", function (req, res) {
    db.restaurant.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (dbRestaurant) {
        res.json(dbRestaurant);
    })
})


module.exports = router;