angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('CampsitesCtrl', function($scope, Campsites) {
  $scope.campsites = Campsites.all();
})

.controller('CampsiteDetailCtrl', function($scope, $stateParams, Campsites) {
  $scope.campsite = Campsites.get($stateParams.campsiteId);
})

.controller('AccountCtrl', function($scope) {
});
