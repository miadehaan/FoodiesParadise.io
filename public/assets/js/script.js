// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
    function geoFindMe() {
        const status = document.querySelector('#status');
        const mapLink = document.querySelector('#map-link');

        mapLink.href = '';
        mapLink.textContent = '';

        function success(position) {
            const latitude  = position.coords.latitude;
            const longitude = position.coords.longitude;

            // status.textContent = '';
            // mapLink.href = `http://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true`
            // mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
            // mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
            document.cookie = `lat=${latitude}, lon=${longitude}`;
        }

        function error() {
            status.textContent = 'Unable to retrieve your location';
        }

        if(!navigator.geolocation) {
            status.textContent = 'Geolocation is not supported by your browser';
        } else {
            status.textContent = 'Locating…';
            navigator.geolocation.getCurrentPosition(success, error);
        }

    }

    // Input for restaurant search
    $(".create-form").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        let userSearch = $("#restaurantSearch").val().trim();


    //     // Send the POST request.
    //     $.ajax("/api/burgers", {
    //         type: "POST",
    //         data: newBurger
    //     }).then(
    //         function () {
    //             console.log("created new burger");
    //             // Reload the page to get the updated list
    //             location.reload();
    //         }
    //     );
    });

    // Run geoFindMe on load
    geoFindMe();
});