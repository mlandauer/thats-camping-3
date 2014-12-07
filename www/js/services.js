angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Campsites', ['$http', '$q', function($http, $q) {
  // Might use a resource here that returns a JSON array

  var deferred = $q.defer();
  $http.get('/data.json').success(function(data, status, headers, config) {
    deferred.resolve(data);
  });
  var campsites = deferred.promise;

  return {
    all: function() {
      return campsites;
    },
    get: function(campsiteId) {
      return campsites.then(function(data) {
        // Simple index lookup
        return data[campsiteId]
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
