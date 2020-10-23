// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
    function geoFindMe() {
        const status = document.querySelector('#status');
        const mapLink = document.querySelector('#map-link');

        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // status.textContent = '';
            // mapLink.href = `http://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true`
            // mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
            // mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
            document.cookie = `lat=${latitude}`;
            document.cookie = `lon=${longitude}`;
        }

        function error() {
            alert('Unable to retrieve your location');
        }

        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
        } else {
            // console.log('Locating…');

            navigator.geolocation.getCurrentPosition(success, error);
        }
    }



    // Get user inputs (restuarant and/or cuisine type selected)
    $(".restaurantSearch").on("submit", function (event) {
        event.preventDefault();

        let userRestaurant = $("#restaurant").val().trim();
        console.log("The user searched for: " + userRestaurant);

        //Clear input field
        $("#restaurant").val("");

        showRestaurants(userRestaurant);
    });

    // Get user inputs (restuarant and/or cuisine type selected)
    $(".dishSearch").on("submit", function (event) {
        event.preventDefault();

        let userDish = $("#dish").val().trim();
        console.log("The user searched for: " + userDish);

        //Clear input field
        $("#dish").val("");

        // showDishes(userDish);
    });


    // Run geoFindMe on load
    geoFindMe();
    getRestaurant();
    newReview();
});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function getRestaurant(){
    let headers = new Headers();
    const apiKey = "A8m2ZTgd7SwOiTFzjb04ljBmgdsAaO1nl50gJcmoZAGQmR4GKf3siNhU7KniFu1ilbbW7XSDVoJmxQuD3ZwrbC_2fWkB6N18duGI_Yy2kFzPiB2ZpY10Mbu_zRmNX3Yx";
    
    headers.append('Access-Control-Allow-Origin', 'http://localhost:8080');
    headers.append('Access-Control-Allow-Credentials', 'true');
  
    headers.append('Content-Type', 'application/json');
    headers.append('GET', 'POST', 'OPTIONS');
   
  
    
    // var queryURL="";

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const queryURL =proxyurl+`https://api.yelp.com/v3/businesses/search?restaurants&latitude=${getCookie("lat")}&longitude=${getCookie("lon")}`;
     // site that doesn’t send Access-Control-*
     console.log(queryURL);
fetch(proxyurl + queryURL,{
    // credentials:"include",
    headers:{
        "Access-Control-Allow-Origin":`http://localhost:8080`,
        "Access-Control-Allow-Credentials":`true`,
        "Content-Type":`application/json`,
        "method":"GET",
    "Authorization":`Bearer ${apiKey}`,  
    }

}) 
.then(response => response.text())
.then(contents => console.log(contents))
.catch(() => console.log("Can’t access " + proxyurl + " response. Blocked by browser?"))
    
  
    }
    
   


// Send the 'userInput' to the restaurant route w/ POST method
function showRestaurants(restaurant) {
    $.post("/api/restaurant-routes", {
            restaurant: restaurant
        })
        .then(function (data) {
            window.location.replace("/index");
            // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(handleLoginErr);
}

function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
}

// When 'Add Review' button is click, the form is display for user to add a new dish review
function newReview() {
    // // Show the form for adding new dish review
    $(".addReviewBtn").on("click", function (event) {
        console.log("test");
        event.preventDefault();
        // Send the GET request (html-routes.js)
        window.location="/reviewform";
        // $.get("/reviewform").then(function() {
        //     // $(".newReview").append($("<h1>").text("Add new dish review: ")); //test html
            
        //     console.log("The blank form is now being displayed");
        // });
        
    });

    // 
    $(".backBtn").on("click", function (event) {
        event.preventDefault();
        // Send the GET request (html-routes.js)
        window.location = "/";
    
    });

    // Store the info the user submitted in the form
    $("#submitReviewBtn").on("click", function (event) {
        event.preventDefault();

        var newReview = {
            name: $("#newDish").val().trim(),
            comments: $("#newComments").val().trim(),
            rating: $("#newRating").val().trim(),
            dishId: 1
        };
        console.log(newReview);

        // Send the review info (review-routes.js)
        $.ajax( {
            url: "/reviews/review",
            type: "POST",
            data: newReview
        }).then(function() {
            console.log("created new review");
            // Reload the page to get the updated list
            // location.reload();
            }
        );

        // // Send just the DISH (dish-routes.js)
        // $.ajax("/api/dish", {
        //     type: "POST",
        //     data: newReview.name
        // }).then(function() {
        //     console.log("created new dish");
        //     // Reload the page to get the updated list
        //     location.reload();
        //     }
        // );



        // clear the form
        $("#newDish").val("");
        $("#newRestaurant").val("");
        $("#newRating").val("");
        $("#newComments").val("");
        
    });
}







//---------------------------------------------------------------------------------------------
// AJAX Call for YELP API
// function yelpAPI(latitude, longitude) {
//     // AJAX call to Yelp Fusion - REST API
//     // ******Note: at this time, the API does not return businesses without any reviews
//     // User geolocation (latitude, longitude) to pull up restaurants nearby
//     const apiKey = "A8m2ZTgd7SwOiTFzjb04ljBmgdsAaO1nl50gJcmoZAGQmR4GKf3siNhU7KniFu1ilbbW7XSDVoJmxQuD3ZwrbC_2fWkB6N18duGI_Yy2kFzPiB2ZpY10Mbu_zRmNX3Yx";

//     const queryURL = "https://api.yelp.com/v3/businesses/search?latitude=" + getCookie("lat") + "&longitude=" + getCookie("lon") + "&key=" + apiKey;
//     console.log(queryURL);


//     // $.ajax({
//     //     url: queryURL,
//     //     method: "GET"
//     // }).then(function (data) {
//     //     console.log("Here's the API data " + data);
//     // });


//     // Axios 
//     let yelpREST = axios.create({
//         baseURL: queryURL,
//         headers: {
//             Authorization: `Bearer ${apiKey}`,
//             "Content-type": "application/json",
//         },
//     });

//     // Try searching for businesses by location
//     yelpREST("/businesses/search", {
//         params: {
//             location: "portland"
//         },
//     }).then( (data) => {
//         console.log(data);
//         let { businesses } = data
//         businesses.forEach((b) => {
//             console.log("Name: ", b.name);
//         });
//     });
// }