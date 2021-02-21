const axios = require("axios");

// YELP API
function yelpAPI() {
    // AJAX call to Yelp Fusion - REST API
    // ******Note: at this time, the API does not return businesses without any reviews
    // User geolocation (latitude, longitude) to pull up restaurants nearby
    const apiKey = "A8m2ZTgd7SwOiTFzjb04ljBmgdsAaO1nl50gJcmoZAGQmR4GKf3siNhU7KniFu1ilbbW7XSDVoJmxQuD3ZwrbC_2fWkB6N18duGI_Yy2kFzPiB2ZpY10Mbu_zRmNX3Yx";
    const queryURL = "https://api.yelp.com/v3/";
    console.log(queryURL);


    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    // }).then(function (data) {
    //     console.log("Here's the API data " + data);
    // });

    
    // Axios 
    let yelpREST = axios.create({
        baseURL: queryURL,
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-type": "application/json",
        },
    });

    // Try searching for businesses by location
    yelpREST("/businesses/search", {
        params: {
            location: "portland"
        },
    }).then( ({data}) => {
        console.log(data);
        let { businesses } = data
        businesses.forEach((b) => {
            console.log("Name: ", b.name);
        });
    });
}

yelpAPI();