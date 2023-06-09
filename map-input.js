function initialize() {
    var markers = [];
    var map = new google.maps.Map(document.getElementById('map'), {
      mapTypeId: google.maps.MapTypeId.SATELLITE,
      disableDefaultUI: true,
      tilt: 0,
    });
    var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(51.456, -2.608),
        new google.maps.LatLng(51.454, -2.603));
    map.fitBounds(defaultBounds);

    var input = /** @type {HTMLInputElement} */(
      document.getElementById('Address')
    );

    const options = {
      componentRestrictions: { country: 'gb' }
    };

    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    var searchBox = new google.maps.places.SearchBox(input, {country: ['(en-gb)']});
    google.maps.event.addListener(searchBox, 'places_changed', function() {
      var places = searchBox.getPlaces();
      if (places.length == 0) {
        return;
      }
      for (var i = 0, marker; marker = markers[i]; i++) {
        marker.setMap(null);
      }
      markers = [];
      var bounds = new google.maps.LatLngBounds();
      for (var i = 0, place; place = places[i]; i++) {
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
        // drag response
        google.maps.event.addListener(marker, 'dragend', function(e) {
          displayPosition(this.getPosition());
          document.getElementById('lat').value = pos.lat();
          document.getElementById('lng').value = pos.lng();
        });
        // click response
        google.maps.event.addListener(marker, 'click', function(e) {
          displayPosition(this.getPosition());
        });
        markers.push(marker);
        bounds.extend(place.geometry.location);
      }
      map.fitBounds(bounds);
    });
    google.maps.event.addListener(map, 'bounds_changed', function() {
      var bounds = map.getBounds();
      searchBox.setBounds(bounds);
    });
    // displays a position on two <input> elements
    function displayPosition(pos) {
      document.getElementById('lat').value = pos.lat();
      document.getElementById('lng').value = pos.lng();
      console.log(lat, lng);
    }
  }  
  google.maps.event.addDomListener(window, 'load', initialize);
