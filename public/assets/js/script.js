// const { response } = require("express");

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

    // Onclick, open or close navbar
    $('#sidebarCollapse').on('click', function () {
        // open or close navbar
        $('#sidebar').toggleClass('active');
    });

    // Change icon if menu is open or closed
    if( $('#sidebar').is("active") === true  ) {
        // If menu is open, show 'x' icon
        $('#sidebarCollapse').append(`
            <i class="fas fa-window-close"></i>
        `);
    }
    else if($('#sidebar').is("active") === false ) {
        // If menu is closed, show search icon
        $('#sidebarCollapse').append(`
            <i class="fas fa-search"></i>
        `);
    }

    // Run geoFindMe on load
    geoFindMe();

    // Initial call yo YelpAPI based on geolocation
    let lat = getCookie("lat");
    let lon = getCookie("lon");
    getRestaurant(`https://api.yelp.com/v3/businesses/search?restaurants&latitude=${lat}&longitude=${lon}`, "geolocationResults");

    // button that goes back to main menu
    $(".backBtn").on("click", function (event) {
        event.preventDefault();
        window.location = "/";
    });


    // Get user inputs (restuarant and/or cuisine type selected)
    $(".restaurantSearch").on("submit", function (event) {
        event.preventDefault();

        let inputRestaurant = $("#restaurant").val().trim();
        let inputLocation = $("#resLocation").val().trim();
        console.log("The user searched for: " + inputRestaurant);

        // call YelpAPI
        // first get restaurant coordinates based on text location
        getRestaurantCoordinates(inputRestaurant, inputLocation);

        //Clear input field
        $("#restaurant").val("");
        $("#resLocation").val("");
    });

    // Get user inputs (restuarant and/or cuisine type selected)
    $(".dishSearch").on("submit", function (event) {
        event.preventDefault();

        let userDish = $("#dish").val().trim();
        console.log("The user searched for: " + userDish);

        //Clear input field
        $("#dish").val("");

        // Search DB if dish exists yet
    
    });

});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function getRestaurantCoordinates(restaurant, location) {
    // OpenCage Geocoding API - (forward geocoding) to get lat/lon of user searched city
    const apiKey = '2a4ca683387841f49a4463c0c58596cb';
    const queryURL = `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${apiKey}`;

    fetch(queryURL)
    .then(res => res.json())
    .then( (data) => {
        // console.log(data.results);
        //display the restaurant found in specified location/city
        let x = data.results[0].geometry.lat; // latitude
        let y = data.results[0].geometry.lng; // longitude

        // get restaurant results from Yelp API
        getRestaurant(`https://api.yelp.com/v3/businesses/search?term=${restaurant}&latitude=${x}&longitude=${y}`, "searchedResults");
    })
    .catch(() => console.log("Error... not working"));


}

function getRestaurant(queryURL, display){
    let headers = new Headers();
    const apiKey = "A8m2ZTgd7SwOiTFzjb04ljBmgdsAaO1nl50gJcmoZAGQmR4GKf3siNhU7KniFu1ilbbW7XSDVoJmxQuD3ZwrbC_2fWkB6N18duGI_Yy2kFzPiB2ZpY10Mbu_zRmNX3Yx";
    
    headers.append('Access-Control-Allow-Origin', 'http://localhost:8080');
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('Content-Type', 'application/json');
    headers.append('GET', 'POST', 'OPTIONS');

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    // site that doesn’t send Access-Control-*
    // console.log(queryURL);

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
    .then(response => response.json()) // parse the data using json()
    .then( (data) => {
        // Show 10 restaurants nearby based on user Geolocation (index / html-routes)
        //  Loop through object and display first 10  'businesses'
        console.log(data.businesses);
        let business = data.businesses;

        // remove original results from geolocation - user searches for specific restaurant
        // if (display === "searchedResults") {
        //     // remove previous HTML
        //     $("#restaurantsNearby").remove( $("<li>") );
        // } 

        for(var i=0; i < 20; i++) {
            // console.log(name); // get the restaurant's name
            let name = business[i].name;
            let address = [business[i].location.display_address[0]];
            let city = [business[i].location.display_address[1]];
            let category = business[i].categories[0].title;
            let pricing = business[i].price;
            let rating  = business[i].rating;
            

            $("#restaurantsNearby").append(
                $("<li>").append(`
                <div class="container listItem">
                    <div class="row">
                    
                        <div class="col-md-8 col-12"> <h4 class="restaurantItem">${name}   </h4></div>
                        
                        <div class="col-md-4 col-12"> 
                            <a href="/reviews/review/name/${name}" class="restaurantLink"><button class="btn btn-dark"> Review a Dish </button></a>
                            <a href="/reviews/reviewhistory/name/${name}"><button id="reviewBtn" class="btn btn-dark dishBtn">View Reviews</button></a>  
                        </div>

                        <div class="container">
                        <div class="row">
                            <div class="restaurantDetails col-md-12 col-12">
                                <p class="info"> ${pricing}      |      Rating: ${rating}/5       |       Cuisine: ${category} </p>
                                <p class="info"> ${address}, ${city} </p>
                            </div>
                        </div>
                        </div>

                    </div>
                </div> `)
            );
        }

    }).catch(() => console.log("Can’t access " + proxyurl + " response. Blocked by browser?"));

}

function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
}




