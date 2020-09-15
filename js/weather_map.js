$.get("http://api.openweathermap.org/data/2.5/forecast", {
    APPID: weatherToken,
    q: "Dallas, TX, US",
    units: "imperial"
}).done(function (data) {
    console.log(data);
    let fiveDayForecast = data.list.slice(0, 5);
    console.log(fiveDayForecast);
});