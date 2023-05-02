function initialize() {
    var markers = [];
    var input = document.getElementById('Address');
    var options = {
        componentRestrictions: {
            country: 'gb'
        },
    }
    var autocomplete = new google.maps.places.Autocomplete(input, options);
    var map = new google.maps.Map(document.getElementById('map'), {
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        disableDefaultUI: true,
        tilt: 0,
    });
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();
        if (!place) {
            return;
        }
        var bounds = new google.maps.LatLngBounds();
        var image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };
        var marker = new google.maps.Marker({
            draggable: true,
            map: map,
            icon: image,
            title: place.name,
            position: place.geometry.location
        });
        markers.push(marker);
        bounds.extend(place.geometry.location);
        // Set a larger LatLngBounds manually
        var zoomOutFactor = 2; // Adjust this factor as needed
        var extendedBounds = extendBounds(bounds, zoomOutFactor);
        map.fitBounds(extendedBounds);
        document.getElementById('Lat').value = marker.getPosition().lat();
        document.getElementById('Lng').value = marker.getPosition().lng();
        // Add a listener to the marker for the dragend event
        google.maps.event.addListener(marker, 'dragend', function() {
            // Get the updated position of the marker
            var newPosition = marker.getPosition();
            // Update the latitude and longitude fields with the new coordinates
            document.getElementById('Lat').value = newPosition.lat();
            document.getElementById('Lng').value = newPosition.lng();
        });

    });
    google.maps.event.addListener(map, 'bounds_changed', function() {
        var bounds = map.getBounds();
        autocomplete.setBounds(bounds);
    });
}

function extendBounds(bounds, factor) {
    var sw = bounds.getSouthWest();
    var ne = bounds.getNorthEast();
    var latDiff = Math.abs(sw.lat() - ne.lat()) * factor;
    var lngDiff = Math.abs(sw.lng() - ne.lng()) * factor;
    var newSw = new google.maps.LatLng(sw.lat() - latDiff, sw.lng() - lngDiff);
    var newNe = new google.maps.LatLng(ne.lat() + latDiff, ne.lng() + lngDiff);
    var newBounds = new google.maps.LatLngBounds(newSw, newNe);
    return newBounds;
}
