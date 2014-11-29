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

.controller('CampsiteDetailCtrl', function($scope, $stateParams, Campsites) {
  $scope.campsite = Campsites.get($stateParams.campsiteId);
})

.controller('AccountCtrl', function($scope) {
});
