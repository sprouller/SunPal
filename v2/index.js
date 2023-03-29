function initialize() {
    var markers = [];
    var input = /** @type {HTMLInputElement} */
    (document.getElementById('Address'));
    var options = {
        componentRestrictions: {
            country: 'gb'
        }
    }
    var autocomplete = new google.maps.places.Autocomplete(input,options);
    var map = new google.maps.Map(document.getElementById('map'),{
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
            size: new google.maps.Size(71,71),
            origin: new google.maps.Point(0,0),
            anchor: new google.maps.Point(17,34),
            scaledSize: new google.maps.Size(25,25)
        };
        var marker = new google.maps.Marker({
            draggable: true,
            map: map,
            icon: image,
            title: place.name,
            position: place.geometry.location
        });
        // Add a listener to the marker for the dragend event
        google.maps.event.addListener(marker, 'dragend', function() {
            // Get the updated position of the marker
            var newPosition = marker.getPosition();
            // Update the latitude and longitude fields with the new coordinates
            document.getElementById('Lat').value = newPosition.lat();
            document.getElementById('Lng').value = newPosition.lng();
        });
        markers.push(marker);
        bounds.extend(place.geometry.location);
        map.fitBounds(bounds);
    });
    google.maps.event.addListener(map, 'bounds_changed', function() {
        var bounds = map.getBounds();
        autocomplete.setBounds(bounds);
    });
}