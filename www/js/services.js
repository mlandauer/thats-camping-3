angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Campsites', ['$http', '$q', '$filter', function($http, $q, $filter) {
  // Might use a resource here that returns a JSON array

  var deferred = $q.defer();
  $http.get('/data.json').success(function(data, status, headers, config) {
    var campsites = data["campsites"];
    // Latitude and longitude is stored differently in data.json
    campsites.forEach(function(campsite){
      campsite.position = {lat: campsite.latitude, lng: campsite.longitude};
      campsite.latitude = null;
      campsite.longitude = null;
    });
    deferred.resolve(campsites);
  });
  var campsites = deferred.promise;

  return {
    all: function() {
      return campsites;
    },
    get: function(campsiteId) {
      return campsites.then(function(data) {
        // Search through array for the correct entry
        return $filter('filter')(data, {id: parseInt(campsiteId)}, true)[0];
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
