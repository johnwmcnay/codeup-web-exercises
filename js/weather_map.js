//TODO: have five divs created once and not re-created every time
// make more details accessible on the smaller screen formats
// polish things with more ES6

(function () {

    const initialCoordinates = [-96.8084, 27.7799];

    //creates the MapBox to attach to a container for display in the HTML
    mapboxgl.accessToken = mapboxToken;
    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: initialCoordinates, // starting position [lng, lat]
        zoom: 3,  // starting zoom
    });

    //creates a marker
    let marker = new mapboxgl.Marker({
        draggable: true})
        .setLngLat(initialCoordinates)
        .addTo(map);

    //using coordinates, uses an ajax call to get weather info and update the screen
    function getWeatherData(lng, lat) {

        //ajax call accessing openweather data
        $.get("http://api.openweathermap.org/data/2.5/forecast", {
            APPID: weatherToken,
            lon: lng,
            lat: lat,
            units: "imperial"
        }).done(function (data) {

            let fiveDayForecast = [];

            //40 entries are returned using three-hour increments, loop increments by 8 to grab five days
            for (let i = 0; i < data.list.length; i += 8) {
                fiveDayForecast.push(data.list[i]);
            }

            $("#city").text(`Current city: ${data.city.name}`);

            //dynamically updates the forecast cards
            for (let day = 0; day < fiveDayForecast.length; day++) {
                updateDayCard(fiveDayForecast[day], `#card${day}`);
            }

            const days = $("#forecast>.day");

            //recursive function to fade in the forecast cards one at a time
            let fadeAllIn = function(index= 0) {
                $(days[index]).animate({opacity: "1"}, 400, "swing", function() {
                    if (index + 1 < days.length) {
                        fadeAllIn(index + 1);
                    }
                });
            }

            fadeAllIn();

        });
    }

    //creates and adds a card to the forecast div
    function updateDayCard(day, id) {

        const $card = $(id);

        const cardContents = {
            "temperature": `${day.main.temp_max.toString()} °F`,
            "date": formatDate(day.dt_txt),
            "icon": `<img src="http://openweathermap.org/img/w/${day.weather[0].icon}.png" alt="icon">`,
            "description": day.weather[0].description,
            "humidity": `<strong>Humidity: </strong>${day.main.humidity}%`,
            "wind": `<strong>Wind: </strong>${day.wind.speed} mph`,
            "pressure": `<strong>Pressure: </strong>${day.main.pressure}`,
        }

        //grabs the inner html from the template
        $card.addClass("day card m-0 p-0 col-6 col-sm-4 col-xl-2")
            .html($("#template").html());

        $card.css("opacity", "0")

        //updates the html of all necessary pieces of the card
        for (let key of Object.keys(cardContents)) {
            $card.find("." + key).html(cardContents[key]);
        }

    }

    //helper function to take the API-formatted date and return an display-formatted date
    function formatDate(str) {

        //makes use of the built-in Date object
        const d = new Date(parseInt(str.substring(0,4)),
            parseInt(str.substring(5,7)) - 1,
            parseInt(str.substring(8,10)));

        let temp = d.toDateString();

        //adds spans with classes to make mobile responsive
        temp = `<span>${temp.substring(0, temp.length - 4)}</span>
            <span class="d-none d-sm-none d-md-block ml-1">${temp.substring(temp.length - 4)}</span>`;

        return temp;
    }

    $("#citySubmit").click(function (e) {
        e.preventDefault();
        searchFor($("#cityInput").val().trim());
    });

    $("#cityInput").on("keypress", function(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            searchFor($(this).val().trim());
        }
    });

    function searchFor(searchStr) {

        if (searchStr === "") {
            return false;
        }

        geocode(searchStr, mapboxToken)
            .then(function (result) {
                getWeatherData(result[0], result[1]);
                return result;
            }).then(function (data) {
                map.flyTo({center: data, zoom: 12});

                marker.setLngLat(data);

                function onDragEnd() {
                    const lngLat = marker.getLngLat();

                    getWeatherData(lngLat.lng, lngLat.lat);
                    map.flyTo({center: [lngLat.lng, lngLat.lat], zoom: 12});
                    document.getElementById("filler").scrollIntoView();
                    $("#cityInput").val("");
                }

                marker.on('dragend', onDragEnd);
                return true;
        });
    }

    searchFor("Dallas, TX");

}());