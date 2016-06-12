var Map = function(latLng, zoom) {

    this.googleMap = new google.maps.Map( document.getElementById('map'), {
        center: latLng,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        scrollwheel: false,
        zoom: zoom,
    });

    this.addInfoWindow = function( latLng, weather) {
        var current = weather.data.current_condition[0];
        var title = "Weather: " + current.weatherDesc[0].value + "Pressure: " + current.pressure + "mb\nCurrent temperature: " + current.temp_C + "C\nFeels like: " + current.FeelsLikeC + "C\nCloudcover: " + current.cloudcover + "%\nWind Speed: " + current.windspeedKmph + "Kmph\nWind Direction: " + current.winddir16Point;
        // var title = "Here";
        var infowindow = new google.maps.InfoWindow({
            content: title
        });

        var newIcon = weather.data.current_condition[0].weatherIconUrl[0].value;
        var marker = this.addMarker( latLng, newIcon );
        marker.addListener( 'click', function() {
            infowindow.open(this.map, this);
        } );

    };

    this.addMarker = function( latLng, newIcon ) {
        var marker = new google.maps.Marker( {
            position: latLng,
            map: this.googleMap,
            icon: newIcon,
            animation: google.maps.Animation.DROP
        });
        return marker;
    };


    this.bindClick = function() {
        google.maps.event.addListener( this.googleMap, 'click', function(event) {
            // var randomLabel = Math.random().toString(36).slice(2);
            var latLng = {lat: event.latLng.lat(), lng: event.latLng.lng()};
            dataRequest( latLng, this );
            // this.addInfoWindow( latLng, "Whats up fools!", randomLabel );
        }.bind(this) );
    };

    this.resetCenter = function( latLng ) {
        this.googleMap.panTo( latLng );
        this.googleMap.setZoom(13);
    };
};
