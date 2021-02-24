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

        let inputRestaurant = $("#restaurant").val().trim();
        console.log("The user searched for: " + inputRestaurant);
        
        //Clear input field
        $("#restaurant").val("");

        showRestaurant(inputRestaurant);
    });

    // Get user inputs (restuarant and/or cuisine type selected)
    // $(".dishSearch").on("submit", function (event) {
    //     event.preventDefault();

    //     let userDish = $("#dish").val().trim();
    //     console.log("The user searched for: " + userDish);

    //     //Clear input field
    //     $("#dish").val("");

    //     // showDishes(userDish);
    // });

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
    getRestaurant();
    // viewReviews();
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

    let lat = getCookie("lat");
    let lon = getCookie("lon");

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const queryURL = `https://api.yelp.com/v3/businesses/search?restaurants&latitude=${lat}&longitude=${lon}`;
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
    .then(response => response.json())
    // .then(contents => console.log(contents))
    .then( (data) => {
        // Show 10 restaurants nearby based on user Geolocation (index / html-routes)
        //  Loop through object and display first 10  'businesses'
        console.log(data);

        let business = data.businesses;

        for(var i=0; i < 10; i++) {
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

// Send the 'userInput' to the restaurant route w/ POST method
function showRestaurant(restaurant) {
    $.post("/api/restaurant-routes", {
            restaurant: restaurant
        })
        .then(function (data) {
            window.location.replace("/index");
            // If there's an error, handle it by throwing up a bootstrap alert
        })
        .fail(handleLoginErr);
}

function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
}


// button that goes back to main menu
$(".backBtn").on("click", function (event) {
    event.preventDefault();
    // Send the GET request (html-routes.js)
    window.location = "/";

});

