const db = require("../models/review.js");

const express = require("express");
const {
    Router
} = require("express");

var router = express.Router();


router.get("/review", function (req, res) {
    db.Review.findAll({
        include: [db.Post]
    }).then(function (dbReview) {
        res.json(dbReview)
    });
});

router.get("/review/:id", function (req, res) {
    db.Review.findOne({
        where: {
            id: req.pramas.id
        },
        include: [db.Post]
    }).then(function (dbReview) {
        res.json(dbReview);
    });
});

router.post("/review", function (req, res) {
    db.Review.create(req.body).then(function (dbReview) {
        res.json(dbReview);
    });
});

router.delete("/review/:id", function (req, res) {
    db.Review.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (dbReview) {
        res.json(dbReview);
    })
})


module.exports = router;