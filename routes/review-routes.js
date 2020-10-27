const db = require("../models");
const sequelize = require("sequelize");
const express = require("express");
const { Router } = require("express");
const dish = require("../models/dish");

var router = express.Router();

// Pull dishes from database and show on page
router.get("/reviewHistory/name/:restaurantName", function (req, res) {
  console.log("hi");
  // console.log(req.body);
  let restaurantName = req.params.restaurantName;
  console.log("testing : " + restaurantName); // pulls up the restaurant name that was selected
db.restaurant.findOne({
    where:{
        name:restaurantName
    }
}).then(restaurants=>{

    if(restaurants){
        db.dish
        .findAll({
           
          include: [
            {
              model: db.review,
              
            },
           
          ],
          where:{
            restaurantId:restaurants.id
        }
        }).then(function(dishes){
            console.log(JSON.parse(JSON.stringify(dishes)));
            res.render("reviews",{dishReviews:JSON.parse(JSON.stringify(dishes))});
        })
    
    }
    else{
        res.render("reviews",{dishReviews:null});
    }
    

    // console.log(restaurants.id);
   }).catch(function (err) {
      console.error(err);
    });
});

router.get("/review/id/:id", function (req, res) {
  db.review
    .findOne({
      where: {
        id: req.params.id,
      },
    })
    .then(function (dbReview) {
      res.json(dbReview);
    });
});

// store new review
// clear

// db.restaurant.findOne({
//     where: {
//         name: restaurantName
//     }
// }).then(function (restaurant) {
//     db.dish.findAll({
//         where: {
//             RestaurantId: restaurant.id
//         }
//     }).then(function (dishs) {
//         res.render("newdishform", {"dishs": JSON.parse(JSON.stringify(dishs)), "restaurantName": restaurantName})
//     })
// });
// });

// store new review
router.post("/review/name/:restaurantName", function (req, res) {
  console.log(req.body);
  let restaurantName = req.params.restaurantName;
  let dishId = req.body.dishId;

  db.restaurant
    .findOne({
      where: {
        name: restaurantName,
      },
    })
    .then(function (restaurant) {
      let dish;

      if (req.body.dish == "CREATENEWDISH") {
        dish = [0, req.body.newDishName];
      } else {
        dish = req.body.dish.split("|");
      }

      db.dish
        .findOrCreate({
          where: {
            id: dish[0],
          },
          defaults: {
            name: dish[1],
            restaurantId: restaurant.id,
          },
        })
        .then(function (dishData) {
          let newDishData = dishData[0];

          var newReview = {
            name: newDishData.name,
            comments: req.body.comment,
            rating: req.body.rating,
            dishId: newDishData.id,
          };

          db.review.create(newReview).then(function (dbReview) {
            res.redirect("/");
          });
        });
    });
});
router.get("/review/name/:restaurantName", function (req, res) {
  // console.log(req.body);
  let restaurantName = req.params.restaurantName;

  db.restaurant
    .findOrCreate({
      where: {
        name: restaurantName,
      },
      defaults: {
        name: restaurantName,
      },
    })
    .then(function (restaurant) {
      var created = restaurant[1];
      console.log(`Created ${created}`);
      restaurantInfo = restaurant[0]; //new or found
      db.dish
        .findAll({
          where: {
            RestaurantId: restaurantInfo.id,
          },
        })
        .then(function (dishs) {
          res.render("newdishform", {
            style: "assetscssstyle.css",
            dishs: JSON.parse(JSON.stringify(dishs)),
            restaurantName: restaurantName,
          });
        });
    })
    .catch(function (err) {
      console.error(err);
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
  db.review
    .destroy({
      where: {
        id: req.params.id,
      },
    })
    .then(function (dbReview) {
      res.json(dbReview);
    });
});

module.exports = router;
