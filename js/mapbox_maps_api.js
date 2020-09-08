
mapboxgl.accessToken = mapboxToken;

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [-96.8084, 27.7799], // starting position [lng, lat]
    zoom: 6,  // starting zoom
});


let restaurants = {
    "data": [
        {
            searchStr: "Sushi Zen, Southlake, TX, 76092",
            name: "Sushi Zen",
            favorites: [
                "Ahi Tower",
                "Agedashi Tofu",
                "Shrimp Teriyaki Bento",
            ]
        },
        {
            searchStr: "Veracruz Cafe Bishop Arts District, Dallas, TX",
            name: "Veracruz Cafe",
            favorites: [
                "Carne Asada",
                "Milanesa",
                "Mole",
            ]
        },
        {
            searchStr: "Carrabba's Italian Grill, Hurst, TX",
            name: "Carrabba's Italian Grill",
            favorites: [
                "Chicken Parmesan",
                "Fettuccine Alfredo",
            ]
        },
        {
            searchStr: "Yama Sushi, Dallas, TX",
            name: "Yama Sushi",
            favorites: [
                "Chicken Katsu",
            ]
        }

    ],
    "getCoordinatesAndUpdate": function() {

        let self = this;
        let data = this.data;
        let count = 0;

        self.coordinates = [];
        self.sumLng = 0;
        self.sumLat = 0;

        for (let i = 0; i < data.length; i++) {

            let obj = data[i];

            geocode(obj.searchStr, mapboxToken)
                .then(function(result) {
                    count++;
                    return result;
                })
                .then(function(arr) {
                    self.coordinates.push(arr);
                    obj.lng = arr[0];
                    obj.lat = arr[1];

                    return (count === data.length);
                })
                .then(function(end) {

                    let popup = new mapboxgl.Popup()
                        .setLngLat([obj.lng, obj.lat])
                        .setHTML(function(){

                            let HTML = "<span style='font-size: 20px'><strong>" + obj.name + "</span></strong>" +
                                "<br><br><span style='font-size: 16px'>Favorites:</span><br><ul>";

                            for (let fav of obj.favorites) {
                                HTML += "<li>" + fav + "</li>";
                            }
                            HTML += "</ul>";

                            return HTML;
                        }());

                    var marker = new mapboxgl.Marker()
                        .setLngLat([obj.lng, obj.lat])
                        .setPopup(popup)
                        .addTo(map);

                    if (end) {

                        for (let lngLat of self.coordinates) {
                            self.sumLng += lngLat[0];
                            self.sumLat += lngLat[1];
                        }

                        self.avgLng = self.sumLng / data.length;
                        self.avgLat = self.sumLat / data.length;

                        setTimeout(function(){
                            map.flyTo({ center: [self.avgLng, self.avgLat], zoom: 9 })
                        }, 500);

                    }
                });
        }
    },
}

restaurants.getCoordinatesAndUpdate();
