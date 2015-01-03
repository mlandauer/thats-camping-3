angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Campsites', ['$http', '$q', '$filter', function($http, $q, $filter) {
  // Might use a resource here that returns a JSON array

  var data = $http.get('data.json').then(function(result) {
    var campsites = [];
    // Latitude and longitude is stored differently in data.json
    result.data["campsites"].forEach(function(campsite){
      if (campsite.latitude != null && campsite.longitude != null) {
        // For some reason some of the coordinates are stored as strings but not all
        campsite.position = {lat: parseFloat(campsite.latitude), lng: parseFloat(campsite.longitude)};
        campsite.latitude = null;
        campsite.longitude = null;
      };
      campsites[campsite.id] = campsite;
    });
    var parks = [];
    result.data["parks"].forEach(function(park) {
      parks[park.id] = park;
    });
    // Add campsites arrays to parks
    parks.forEach(function(park){
      park.campsites = [];
    });
    // Add park objects to campsites
    campsites.forEach(function(campsite){
      campsite.park = parks[campsite.park];
      campsite.park.campsites.push(campsite);
    });
    return {
      campsites: campsites,
      parks: parks
    };
  });

  return {
    allCampsites: function() {
      return data.then(function(data) {
        return data.campsites;
      });
    },
    getCampsite: function(campsiteId) {
      return data.then(function(data) {
        return data.campsites[parseInt(campsiteId)];
      });
    },
    getPark: function(parkId) {
      return data.then(function(data) {
        return data.parks[parseInt(parkId)];
      });
    }
  }
}])

.factory('geolocation', ['$q', function($q) {
  var cachedPosition = null;

  return {
    getPosition: function() {
      return cachedPosition;
    },
    updatePosition: function() {
      var deferred = $q.defer();
      // TODO implement reject
      navigator.geolocation.getCurrentPosition(function(position) {
        cachedPosition = {lat: position.coords.latitude, lng: position.coords.longitude}
        deferred.resolve(cachedPosition);
      });
      return deferred.promise;
    }
  };
}]);
