const db = require("../models/review.js");

const express = require("express");
const {
    Router
} = require("express");

var router = express.Router();


router.get("/review", function (req, res) {
    db.review.findAll({
        include: [db.Post]
    }).then(function (dbReview) {
        res.json(dbReview)
    });
});

router.get("/review/:id", function (req, res) {
    db.review.findOne({
        where: {
            id: req.pramas.id
        },
        include: [db.Post]
    }).then(function (dbReview) {
        res.json(dbReview);
    });
});


// store new review
router.post("/api/review", function (req, res) {
    console.log(req.body);

    db.review.create(req.body).then(function (dbReview) {
        res.json(dbReview);
    });
});

router.delete("/review/:id", function (req, res) {
    db.review.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (dbReview) {
        res.json(dbReview);
    })
})


module.exports = router;