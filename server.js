const express = require("express");
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 8080;
const db = require("./models");
const app = express();

app.use(cookieParser())
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// Import routes and give the server access to them.
app.set("view engine", "handlebars");

// routes acquisition
const htmlRoutes = require("./routes/html-routes");
const dishRoutes = require("./routes/dish-routes");
const restaurantRoutes = require('./routes/restaurant-routes')
const reviewRoutes = require("./routes/review-routes");

app.use("/", htmlRoutes)
app.use("/api", dishRoutes)
app.use("/rest", restaurantRoutes)
app.use("/reviews", reviewRoutes)


// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");


// Start our server so that it can begin listening to client requests.

db.sequelize.sync({
  force: true
}).then(function () {
  app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });

});