angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Campsites', ['$http', '$q', '$filter', function($http, $q, $filter) {
  // Might use a resource here that returns a JSON array

  var campsites = $http.get('data.json').then(function(result) {
    var campsites = result.data["campsites"];
    // Latitude and longitude is stored differently in data.json
    campsites.forEach(function(campsite){
      if (campsite.latitude != null && campsite.longitude != null) {
        // For some reason some of the coordinates are stored as strings but not all
        campsite.position = {lat: parseFloat(campsite.latitude), lng: parseFloat(campsite.longitude)};
        campsite.latitude = null;
        campsite.longitude = null;
      };
    });
    return campsites;
  });

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

.factory('Parks', function($q, $http) {
  var parks = $http.get('data.json').then(function(result) {
    return result.data["parks"];
  });

  return {
    all: function() {
      return parks;
    }
  }
})

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
