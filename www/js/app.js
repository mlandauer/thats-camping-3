// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

// Allow urls starting with geo
.config( ['$compileProvider', function( $compileProvider ) {
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(file|https?|ftp|mailto|geo):/);
  // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
}])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.campsites', {
      url: '/campsites',
      views: {
        'tab-campsites': {
          templateUrl: 'templates/tab-campsites.html',
          controller: 'CampsitesCtrl'
        }
      }
    })
    .state('tab.campsite-detail', {
      url: '/campsite/:campsiteId',
      views: {
        'tab-campsites': {
          templateUrl: 'templates/campsite-detail.html',
          controller: 'CampsiteDetailCtrl'
        }
      }
    })

    .state('tab.park-detail', {
      url: '/park/:parkId',
      views: {
        'tab-campsites': {
          templateUrl: 'templates/park-detail.html',
          controller: 'ParkDetailCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/campsites');

});
