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


      }
