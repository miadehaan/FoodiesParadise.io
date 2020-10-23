const db = require("../models");

var express = require("express");
const {
    Router
} = require("express");

var router = express.Router();


router.get("/dish", function (req, res) {
    db.dish.findAll().then(function (dbDish) {
        res.json(dbDish)
    });
});

router.get("/dish/:id", function (req, res) {
    db.dish.findOne({
        where: {
            id: req.pramas.id
        }

    }).then(function (dbDish) {
        res.json(dbDish);
    });
});

router.post("/dish", function (req, res) {
    db.dish.create(req.body).then(function (dbDish) {
        res.json(dbDish);
    });
});

router.delete("/dish/:id", function (req, res) {
    db.dish.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (dbDish) {
        res.json(dbDish);
    })
})


module.exports = router;