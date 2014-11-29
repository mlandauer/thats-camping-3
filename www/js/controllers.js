angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('CampsitesCtrl', function($scope, Campsites, geolocation) {
  $scope.campsites = Campsites.all();
  $scope.position = geolocation.getLocation();
  $scope.locateMe = function() {
    geolocation.updateLocation().then(function(position) {
      $scope.position = position;
    });
  };
})

.controller('CampsiteDetailCtrl', function($scope, $stateParams, Campsites) {
  $scope.campsite = Campsites.get($stateParams.campsiteId);
})

.controller('AccountCtrl', function($scope) {
});
