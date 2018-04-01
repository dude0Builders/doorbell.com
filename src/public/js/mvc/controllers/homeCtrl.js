

app.controller('HomeCtrl',['$scope', function($scope){


  $scope.currentLocation = '';
  //$scope.currentLocation = "Damak -11 , Jhapa, Nepal";


  $scope.detectCurrentLocation = function () {
    console.log("Detecting current Location");
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("GeoLocation is not supported by the browser");
      return;
    }
    function showPosition(position) {
      location.latitude = position.coords.latitude;
      location.longitude = position.coords.longitude;

      var geocoder = new google.maps.Geocoder();
      var latLng = new google.maps.LatLng(location.latitude, location.longitude);
      $("#location").geocomplete({
        bounds:true,
        LatLngBounds: latLng
      });

      if (geocoder) {
        geocoder.geocode({
          'latLng': latLng
        }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            console.log(results[0].formatted_address);
            $scope.currentLocation =  results[0].formatted_address;

          } else {
            console.log("Geocoding failed: " + status);
            $scope.currentLocation = '';
          }
        }); //geocoder.geocode()
      }

    }

  }
  $scope.detectCurrentLocation();

}]);
