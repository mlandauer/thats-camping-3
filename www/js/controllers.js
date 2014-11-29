angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('CampsitesCtrl', function($scope, Campsites) {
  $scope.campsites = Campsites.all();
  $scope.position = null;
  $scope.locateMe = function(){
    navigator.geolocation.getCurrentPosition(function(position) {
      $scope.$apply(function() {
        $scope.position = {lat: position.coords.latitude, lng: position.coords.longitude};
      });
    });
  };
})

.controller('CampsiteDetailCtrl', function($scope, $stateParams, Campsites) {
  $scope.campsite = Campsites.get($stateParams.campsiteId);
})

.controller('AccountCtrl', function($scope) {
});
