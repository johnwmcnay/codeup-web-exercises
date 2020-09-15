(function () {

    mapboxgl.accessToken = mapboxToken;
    let map, marker;

    function getWeatherData(lng, lat) {

        $.get("http://api.openweathermap.org/data/2.5/forecast", {
            APPID: weatherToken,
            lon: lng,
            lat: lat,
            units: "imperial"
        }).done(function (data) {
            console.log(data);
            let fiveDayForecast = [];
            for (let i = 0; i < data.list.length; i += 8) {
                fiveDayForecast.push(data.list[i]);
            }

            $("#city").text("Current city: " + data.city.name);
            console.log(fiveDayForecast);

            $("#forecast").html("");

            for (let day of fiveDayForecast) {
                createDayCard(day);
            }
        });
    }

    function createDayCard(day) {
        let date = day.dt_txt;
        let maxTemp = day.main.temp_max.toString();
        let minTemp = day.main.temp_min.toString();
        let icon = day.weather[0].icon;
        let description = day.weather[0].description;
        let humidity = day.main.humidity;
        let wind = day.wind.speed;
        let pressure = day.main.pressure;
        let card = document.createElement("div");
        $(card).addClass("day card")
            .html($("#template").html());

        $(card).find(".temperature").text(minTemp + " °F / " + maxTemp + " °F");
        $(card).find(".date").text(date);
        $(card).find(".icon").html(
            "<img src='http://openweathermap.org/img/w/" + icon + ".png'>"
        )

        $(card).find(".description").html(
            "<strong>Description: </strong>" + description
        )

        $(card).find(".humidity").html(
            "<strong>Humidity: </strong>" + humidity + "%"
        )

        $(card).find(".wind").html(
            "<strong>Wind: </strong>" + wind + "mph"
        )

        $(card).find(".pressure").html(
            "<strong>Pressure: </strong>" + pressure
        )

        $("#forecast").append(card);
    }

    $("#citySubmit").click(function (e) {
        e.preventDefault();
        let location = $("#cityInput").val().trim();
        console.log(location);
        if (location !== "") {
            searchFor(location);
        }
    });

    function searchFor(searchStr) {

        geocode(searchStr, mapboxToken)
            .then(function (result) {
                getWeatherData(result[0], result[1]);
                return result;
            }).then(function (data) {
                map = new mapboxgl.Map({
                    container: 'map',
                    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
                    center: data, // starting position [lng, lat]
                    zoom: 10,  // starting zoom
                });

                marker = new mapboxgl.Marker({
                    draggable: true})
                    .setLngLat(data)
                    .addTo(map);

                function onDragEnd() {
                    let lngLat = marker.getLngLat();

                    getWeatherData(lngLat.lng, lngLat.lat);
                }

                marker.on('dragend', onDragEnd);
        });
    }

    searchFor("Dallas, TX");

}());