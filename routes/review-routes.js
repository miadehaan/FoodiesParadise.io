const db = require("../models");
const sequelize = require("sequelize");
const express = require("express");
const dish = require("../models/dish");
var router = express.Router();

// Show existing dish reviews from MySQL database -----------------------------------------------
router.get("/reviewHistory/name/:restaurantName", function (req, res) {
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


// For NEW  dish reviews ----------------------------------------------------------------

// Send existing restaurant dishes to FORM
router.get("/review/name/:restaurantName", function (req, res) {
  // console.log(req.body);
  let restaurantName = req.params.restaurantName;

  // New restaurnt added to table if doesn't exist
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
        .then(function (dishes) {
          console.log("TESING!!");
          console.log(dishes);

          res.render("newdishform", {
            style: "assetscssstyle.css",
            dishes: JSON.parse(JSON.stringify(dishes)),
            restaurantName: restaurantName,
          });
        });
    })
    .catch(function (err) {
      console.error(err);
    });
});

// Save NEW review to DB
router.post("/review/name/:restaurantName", function (req, res) {
  console.log(req.body);
  let restaurantName = req.params.restaurantName;

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
          // collect data from form
          let newDishData = dishData[0];

          var newReview = {
            name: newDishData.name,
            comments: req.body.comment,
            rating: req.body.rating,
            dishId: newDishData.id,
          };

          // save review to 'review' table
          db.review.create(newReview).then(function (dbReview) {
            res.redirect("/");
          });
        });
    });
});

module.exports = router;
