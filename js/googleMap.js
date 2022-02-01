function myMap() {
  var location = new google.maps.LatLng(40.18111, 44.51361);
  var mapProp = {
    center: location,
    zoom: 14,
    mapId: '7aeb730b0495fae7',
    // panControl: true,
    // zoomControl: true,
    // mapTypeControl: true,
    // scaleControl: true,
    streetViewControl: true,
    // overviewMapControl: true,
    // rotateControl: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };
  var map = new google.maps.Map(document.getElementById('googleMap'), mapProp),
    marker = new google.maps.Marker({
      position: { lat: 40.18111, lng: 44.51361 },
      map: map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: location,
    });
  google.maps.event.addListener(marker, 'dragend', function (evt) {
    let changedLatitude = evt.latLng.lat().toFixed(5);
    let changedLongitude = evt.latLng.lng().toFixed(5);
    document.getElementById(
      'googleMap'
    ).value = `${changedLatitude},${changedLongitude}`;
  });
}
