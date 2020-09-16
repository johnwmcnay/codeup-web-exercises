(function () {

    mapboxgl.accessToken = mapboxToken;
    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [-96.8084, 27.7799], // starting position [lng, lat]
        zoom: 3,  // starting zoom
    });

    function getWeatherData(lng, lat) {

        $.get("http://api.openweathermap.org/data/2.5/forecast", {
            APPID: weatherToken,
            lon: lng,
            lat: lat,
            units: "imperial"
        }).done(function (data) {
            let fiveDayForecast = [];
            for (let i = 0; i < data.list.length; i += 8) {
                fiveDayForecast.push(data.list[i]);
            }

            $("#city").text("Current city: " + data.city.name);
            $("#forecast").html("");

            for (let day of fiveDayForecast) {
                createDayCard(day);
            }

            let days = $("#forecast>.day");

            let fadeAllIn = function(index) {
                $(days[index]).fadeIn(400, function() {
                    if (index + 1 < days.length) {
                        fadeAllIn(index + 1);
                    }
                });
            }

            fadeAllIn(0);

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

        $(card).addClass("day card m-0 p-0 col-6 col-sm-4 col-xl-2")
            .html($("#template").html());

        $(card).find(".temperature").text(maxTemp + " °F");
        $(card).find(".date").html(function(str) {
            let d = new Date();
            d.setFullYear(parseInt(str.substring(0,4)));
            d.setMonth(parseInt(str.substring(5,7)) - 1);
            d.setDate(parseInt(str.substring(8,10)));
            let temp = d.toDateString();
            // TODO: continue to add mobile responsiveness to the text, shortening when the screen is smaller

            temp = temp.substring(0, temp.length - 4) + "&nbsp;" + "<span class='d-none d-sm-none d-md-block'>" +
                temp.substring(temp.length - 4) + "</span>";

            return temp;

        }(date));
        $(card).find(".icon").html(
            "<img src='http://openweathermap.org/img/w/" + icon + ".png'>"
        )

        $(card).find(".description").html(description);

        $(card).find(".humidity").html(
            "<strong>Humidity: </strong>" + humidity + "%"
        )

        $(card).find(".wind").html(
            "<strong>Wind: </strong>" + wind + " mph"
        )

        $(card).find(".pressure").html(
            "<strong>Pressure: </strong>" + pressure
        )

        $("#forecast").append($(card).hide());
    }

    $("#citySubmit").click(function (e) {
        e.preventDefault();
        let location = $("#cityInput").val().trim();
        if (location !== "") {
            searchFor(location);
            $("#cityInput").val("");
        }
    });

    $("#cityInput").on("keypress", function(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            let location = $("#cityInput").val().trim();
            if (location !== "") {
                searchFor(location);
                $("#cityInput").val("");
            }
        }
    });

    function searchFor(searchStr) {

        geocode(searchStr, mapboxToken)
            .then(function (result) {
                getWeatherData(result[0], result[1]);
                return result;
            }).then(function (data) {
                map.flyTo({center: data, zoom: 12});

                let marker = new mapboxgl.Marker({
                    draggable: true})
                    .setLngLat(data)
                    .addTo(map);

                function onDragEnd() {
                    let lngLat = marker.getLngLat();

                    getWeatherData(lngLat.lng, lngLat.lat);
                    map.flyTo({center: [lngLat.lng, lngLat.lat], zoom: 12});
                }

                marker.on('dragend', onDragEnd);
        });
    }

    searchFor("Dallas, TX");

}());