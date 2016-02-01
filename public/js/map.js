function initMap() {
//map
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 18.48605749999999, lng: -69.9312116999999},
          zoom: 12
        });

        var infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);

        service.getDetails({
          placeId: 'ChIJq6V-EPGJr44RZMEVJ7iHxdY'
        }, function(place, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            var marker = new google.maps.Marker({
              map: map,
              position: place.geometry.location
            });
            google.maps.event.addListener(marker, 'mouseover', function() {
              infowindow.setContent('<div><strong>'+
                place.formatted_address + '<br> Área de Trabajo en Proyecto Génesis</div>');
              infowindow.open(map, this);
            });
            document.getElementById("panelMap").innerHTML = "<h2> "+place.formatted_address+"</h2>";
          }
        });

//map2
          var map2 = new google.maps.Map(document.getElementById('map2'), {
          center: {lat: 19.173773, lng: -96.1342241},
          zoom: 12
        });

        var infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map2);

        service.getDetails({
          placeId: 'ChIJxXjKRUJBw4URmwE26ULWpBg'
        }, function(place, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            var marker = new google.maps.Marker({
              map: map2,
              position: place.geometry.location
            });
            google.maps.event.addListener(marker, 'mouseover', function() {
              infowindow.setContent('<div><strong>'+
                place.formatted_address + '<br> Área de Trabajo en Proyecto Génesis</div>');
              infowindow.open(map2, this);
            });
            document.getElementById("panelMap2").innerHTML = "<h2> "+place.formatted_address+"</h2>";
          }
        });

//map3
          var map3 = new google.maps.Map(document.getElementById('map3'), {
          center: {lat: 19.0413068, lng: -98.20619339999999},
          zoom: 12
        });

        var infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map3);

        service.getDetails({
          placeId: 'ChIJIddBa5HAz4URzcuSDOQ4WYU'
        }, function(place, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            var marker = new google.maps.Marker({
              map: map3,
              position: place.geometry.location
            });
            google.maps.event.addListener(marker, 'mouseover', function() {
              infowindow.setContent('<div><strong>'+
                place.formatted_address + '<br> Área de Trabajo en Proyecto Génesis</div>');
              infowindow.open(map3, this);
            });
            document.getElementById("panelMap3").innerHTML = "<h2> "+place.formatted_address+"</h2>";
          }
        });

//map4
          var map4 = new google.maps.Map(document.getElementById('map4'), {
          center: {lat: 9.9280694, lng: -84.0907246},
          zoom: 12
        });

        var infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map4);

        service.getDetails({
          placeId: 'ChIJxRUNxULjoI8RgrgRn2pqdOY'
        }, function(place, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            var marker = new google.maps.Marker({
              map: map4,
              position: place.geometry.location
            });
            google.maps.event.addListener(marker, 'mouseover', function() {
              infowindow.setContent('<div><strong>'+
                place.formatted_address + '<br> Área de Trabajo en Proyecto Génesis</div>');
              infowindow.open(map4, this);
            });
            document.getElementById("panelMap4").innerHTML = "<h2> "+place.formatted_address+"</h2>";
          }
        });


//map5
          var map5 = new google.maps.Map(document.getElementById('map5'), {
          center: {lat: 31.69036380000001, lng: -106.4245478},
          zoom: 12
        });

        var infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map5);

        service.getDetails({
          placeId: 'ChIJnTILPcte54YRdHmcVABhGQs'
        }, function(place, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            var marker = new google.maps.Marker({
              map: map5,
              position: place.geometry.location
            });
            google.maps.event.addListener(marker, 'mouseover', function() {
              infowindow.setContent('<div><strong>'+
                place.formatted_address + '<br> Área de Trabajo en Proyecto Génesis</div>');
              infowindow.open(map5, this);
            });
            document.getElementById("panelMap5").innerHTML = "<h2> "+place.formatted_address+"</h2>";
          }
        });


//map6
          var map6 = new google.maps.Map(document.getElementById('map6'), {
          center: {lat: 13.6929403, lng: -89.2181911},
          zoom: 12
        });

        var infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map6);

        service.getDetails({
          placeId: 'ChIJXXcRtGcwY48Rllz7k4iXdR8'
        }, function(place, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            var marker = new google.maps.Marker({
              map: map6,
              position: place.geometry.location
            });
            google.maps.event.addListener(marker, 'mouseover', function() {
              infowindow.setContent('<div><strong>'+
                place.formatted_address + '<br> Área de Trabajo en Proyecto Génesis</div>');
              infowindow.open(map6, this);
            });
            document.getElementById("panelMap6").innerHTML = "<h2> "+place.formatted_address+"</h2>";
          }
        });


      }
