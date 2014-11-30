// TODO Hmmm shouldn't really do this I don't think
Number.prototype.toRad = function() {
  return (this * Math.PI / 180);
}

Number.prototype.toDeg = function() {
  return (this * 180 / Math.PI);
}

angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('CampsitesCtrl', function($scope, Campsites, geolocation) {
  $scope.campsites = Campsites.all();
  $scope.position = geolocation.getPosition();
  $scope.locateMe = function() {
    $scope.updatingPosition = true;
    geolocation.updatePosition().then(function(position) {
      $scope.updatingPosition = false;
      $scope.position = position;
    });
  };
})

.filter('distanceInMetres', function() {
  return function(position1, position2) {
    if (position2 == null)
      return null;

    var R = 6371000;
    var dLat = (position2.lat - position1.lat).toRad();
    var dLon = (position2.lng - position1.lng).toRad();
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(position1.lat.toRad()) * Math.cos(position2.lat.toRad()) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  };
})

.filter('distanceText', function() {
  // Distance needs to be in metres
  return function(distance) {
    units = undefined
    if(distance == null) {
      return "";
    }
    if(distance > 1000) {
      distance /= 1000;
      units = "km";
    }
    else {
      units = "m"
    }
    return(distance.toFixed(0) + " " + units);
  };
})

.filter('bearingInDegrees', function() {
  return function(position1, position2) {
    if (position2 == null)
      return null;

    var lon2 = position2.lng.toRad();
    var lat2 = position2.lat.toRad();
    var lon1 = position1.lng.toRad();
    var lat1 = position1.lat.toRad();
    var dLon = lon1 - lon2;
    var y = Math.sin(dLon) * Math.cos(lat1);
    var x = Math.cos(lat2) * Math.sin(lat1) - Math.sin(lat2) * Math.cos(lat1) * Math.cos(dLon);
    // This is a number between 0 and 360
    var bearing = (Math.atan2(y, x).toDeg() + 360.0) % 360;
    return bearing;
  };
})

.filter('bearingText', function() {
  return function(bearing) {
    if (bearing == null) {
      return ""
    }
    // Dividing the compass into 8 sectors that are centred on north
    sector = Math.floor(((bearing + 22.5) % 360.0) / 45.0);
    sectorNames = [ "N", "NE", "E", "SE", "S", "SW", "W", "NW" ];
    return sectorNames[sector];
  };
})

.controller('CampsiteDetailCtrl', function($scope, $stateParams, Campsites) {
  $scope.campsite = Campsites.get($stateParams.campsiteId);
})

.controller('AccountCtrl', function($scope) {
});
