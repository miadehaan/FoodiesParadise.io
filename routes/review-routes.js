const db = require("../models");

const express = require("express");
const {
    Router
} = require("express");

var router = express.Router();


router.get("/review", function (req, res) {
    db.review.findAll().then(function (dbReview) {
        res.json(dbReview)
    });
});

router.get("/review/id/:id", function (req, res) {
    db.review.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (dbReview) {
        res.json(dbReview);
    });
});


// store new review
router.get("/review/name/:restaurantName", function (req, res) {
    console.log(req.body);
    let restaurantName = req.params.restaurantName;

    db.restaurant.findOne({
        where: {
            name: restaurantName
        }
    }).then(function (restaurant) {
        db.dish.findAll({
            where: {
                RestaurantId: restaurant.id
            }
        }).then(function (dishs) {
            res.render("newdishform", {"dishs": JSON.parse(JSON.stringify(dishs)), "restaurantName": restaurantName})
        })
    });
});


// store new review
router.post("/review/name/:restaurantName", function (req, res) {
    console.log(req.body);
    let restaurantName = req.params.restaurantName;
    let dishId = req.body.dishId;

    db.restaurant.findOne({
        where: {
            name: restaurantName
        }
    }).then(function (dbReview) {
        db.dish.findOne({
            where: {
                id: dishId
            }
        }).then(function (dishData) {
            let dish = req.body.dish.split("|")
            console.log(dish)
            var newReview = {
                name: dish[1],
                comments: req.body.comment,
                rating: req.body.rating,
                dishId: parseInt(dish[0])
            };

            db.review.create(newReview).then(function (dbReview) {
                res.json(dbReview);
            });
        })

    });
    
});


// // store new review
// router.post("/review/:restaurantName", function (req, res) {
//     console.log(req.body);

//     db.review.findOne({
//         where: {
//             name: req.params.restaurantName
//         }
//     }).then(function (dbReview) {
//         var newReview = {
//             name: req.body.name,
//             comments: req.body.comments,
//             rating: req.body.rating,
//             dishId: dbReview.id
//         };
    
//         db.review.create(newReview).then(function (dbReview) {
//             res.json(dbReview);
//         });
//     });
    
// });

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