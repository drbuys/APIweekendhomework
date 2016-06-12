// var initialRequest2 = function() {
//     var url = 'http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=0f7e2e2cb8fbc94c4f7ca544c79ddde0';
//     var request = new XMLHttpRequest();
//
//     console.log(request);
//     request.open("GET", url);
//     request.onload = function() {
//         if(request.status === 200){
//             console.log("got the data");
//             var jsonString = request.responseText;
//             var weather = JSON.parse( jsonString );
//             console.log(weather);
//         }
//     };
//     request.send(null);
// };

var setup = function() {
    var center = {lat: 55.942699, lng: -3.191453};
    var map = new Map(center, 4);
    var locator = new GeoLocator( map );
    locator.setMapCenter();
    map.bindClick();
    return map;
};

var GeoLocator = function( map ) {
    this.map = map;
    this.setMapCenter = function() {
        navigator.geolocation.getCurrentPosition( function( position ) {
            var center = {lat: position.coords.latitude, lng: position.coords.longitude};
            this.map.resetCenter( center );
            dataRequest(center, map);
            // console.log(weatherData.data.current_condition[0].FeelsLikeC);
            // console.log(weatherData.data.current_condition[0].weatherIconURL[0].value);
            // this.map.addMarker(center, "H");
            // map.addInfoWindow( center, weatherData );
        }.bind(this) );
    };

};

var dataRequest = function(center, map) {
    var url = "http://api.worldweatheronline.com/premium/v1/weather.ashx?key=906249a21f6e4b4d96b115507161106&q=" + center.lat + "," + center.lng + "&num_of_days=2&tp=3&format=json";
    var request = new XMLHttpRequest();

    // console.log(request);
    request.open("GET", url);
    request.onload = function() {
        if(request.status === 200){
            console.log("got the data");
            var jsonString = request.responseText;
            var weather = JSON.parse( jsonString );
            console.log(weather);
            var temps = getTemperature(weather);
            var dates = getDate(weather);
            // var time = getCountryNames(countries);
            map.addInfoWindow( center, weather );
            addWeatherInfo(weather);
            new LineChart(temps, dates);
        }
    };
    request.send(null);
};

var getTemperature = function(weather) {
    var data = weather.data.weather;
    var day1 = data[0].hourly;
    var day2 = data[1].hourly;
    var temps = [];
    for (var hour1 in day1) {
        var blah1 = parseInt(day1[hour1].tempC);
        temps.push(blah1);
    }
    for (var hour2 in day2) {
        var blah2 = parseInt(day2[hour2].tempC);
        temps.push(blah2);
    }
    console.log(temps);
    return temps;
};

var getDate = function(weather) {
    var data = weather.data.weather;
    var day1 = data[0].date;
    var day2 = data[1].date;
    var dates = [];
    dates.push(day1);
    dates.push(day2);
    console.log(dates);
    return dates;
};

var addWeatherInfo = function(weather) {

    var ul1 = document.getElementById('day0');
    var ul2 = document.getElementById('day1');

    while (ul1.hasChildNodes()) {
    ul1.removeChild(ul1.firstChild);
    }

    while (ul2.hasChildNodes()) {
    ul2.removeChild(ul2.firstChild);
    }

    var data = weather.data.weather;

    var local = document.getElementById( 'location' );
    local.innerText = "2 Day Weather Synopsis for: " + weather.data.request[0].query;

    for(var day in data) {

        var date = document.createElement( 'li' );
        date.setAttribute( 'id', 'date' );
        date.innerText = "Date: " + data[day].date;

        var moon = document.createElement( 'li' );
        moon.setAttribute( 'id', 'moon' );
        moon.innerText = "Moon rise/set: " + data[day].astronomy[0].moonrise + ", " + data[day].astronomy[0].moonset;

        var suns = document.createElement( 'li' );
        suns.setAttribute( 'id', 'suns' );
        suns.innerText = "Sun rise/set: " + data[day].astronomy[0].sunrise + ", " + data[day].astronomy[0].sunset;

        var maxt = document.createElement( 'li' );
        maxt.setAttribute( 'id', 'maxt' );
        maxt.innerText = "MaxTemp: " + data[day].maxtempC + "C";

        var mint = document.createElement( 'li' );
        mint.setAttribute( 'id', 'mint' );
        mint.innerText = "MinTemp: " + data[day].mintempC + "C";

        var ul = document.getElementById('day' + day);

        ul.appendChild(date);
        ul.appendChild(moon);
        ul.appendChild(suns);
        ul.appendChild(maxt);
        ul.appendChild(mint);
    }

};

window.onload = setup;
