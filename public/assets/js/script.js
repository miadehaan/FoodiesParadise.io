
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
            console.log('Locating…');
            navigator.geolocation.getCurrentPosition(success, error);
        }

    }

    // Input for restaurant search
    $(".create-form").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        // let userSearch = $("#restaurantSearch").val().trim();

        yelpAPI(latitude, longitude);


        // // Send the POST request.
        // $.ajax("/api/burgers", {
        //     type: "POST",
        //     data: newBurger
        // }).then(
        //     function () {
        //         console.log("created new burger");
        //         // Reload the page to get the updated list
        //         location.reload();
        //     }
        // );

    });

    // Run geoFindMe on load
    geoFindMe();
});

// AJAX Call for YELP API
function yelpAPI(latitude, longitude) {
    // AJAX call to Yelp Fusion - REST API
    // ******Note: at this time, the API does not return businesses without any reviews
    // User geolocation (latitude, longitude) to pull up restaurants nearby
    const apiKey = "A8m2ZTgd7SwOiTFzjb04ljBmgdsAaO1nl50gJcmoZAGQmR4GKf3siNhU7KniFu1ilbbW7XSDVoJmxQuD3ZwrbC_2fWkB6N18duGI_Yy2kFzPiB2ZpY10Mbu_zRmNX3Yx";
    // const queryURL = "https://api.yelp.com/v3/businesses/latitude=" + latitude + "&longitude=" + longitude + "&key=" + apiKey; // include api key & geolocation coordinates

    // hard-code in lat/long for testing purposes:
    const queryURL = "https://api.yelp.com/v3/businesses/search?latitude=" + getCookie("lat") + "&longitude=" + getCookie("lon") + "&key=" + apiKey;


    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    // }).then(function (data) {
    //     console.log("Here's the API data " + data);
    // });


    
    // Axios 
    let yelpREST = axios.create({
        baseURL: "https://api.yelp.com/v3/",
        headers: {
            Authorization: 'Bearer ${apiKey}',
            "Content-type": "application/json",
        },
    });

    // Try searching for businesses by location
    yelpREST("/businesses/search", {
        params: {
            location: "portland"
        },
    }).then( ({data}) => {
        let { businesses } = data
        businesses.forEach((b) => {
            console.log("Name: ", b.name);
        });
    });

}
