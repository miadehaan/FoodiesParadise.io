const db = require("../models");

var express = require("express");
const {
    Router
} = require("express");

const sequelize = require("sequelize");

var router = express.Router();


router.get("/restaurant", function (req, res) {
    db.restaurant.findAll().then(function (dbRestaurant) {
        res.json(dbRestaurant)
    });
});

router.get("/restaurant/name", function (req, res) {
    let query = req.query.q;
    let lmt = req.query.limit;

    console.log(`${query}  ${lmt}`)

    db.restaurant.findAll({
        limit: parseInt(lmt),
        where: {
            name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + query + '%')
        }
    }).then(function(restaurants){
        return res.json(restaurants);
    }).catch(function(error){
        console.log(error);
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