angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Campsites', ['$http', '$q', function($http, $q) {
  // Might use a resource here that returns a JSON array

  var campsites = $http.get('/data.json');

  return {
    all: function() {
      var deferred = $q.defer();
      campsites.success(function(data, status, headers, config) {
        deferred.resolve(data);
      });
      return deferred.promise;
    },
    get: function(campsiteId) {
      // Simple index lookup
      var deferred = $q.defer();
      campsites.success(function(data, status, headers, config) {
        deferred.resolve(data[campsiteId]);
      });
      return deferred.promise;
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
