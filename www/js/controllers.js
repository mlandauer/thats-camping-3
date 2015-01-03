// TODO Hmmm shouldn't really do this I don't think
Number.prototype.toRad = function() {
  return (this * Math.PI / 180);
}

Number.prototype.toDeg = function() {
  return (this * 180 / Math.PI);
}

angular.module('starter.controllers', [])

.controller('CampsitesCtrl', function($scope, Campsites, geolocation) {
  Campsites.all().then(function(data) {
    $scope.campsites = data;
  })
  $scope.position = geolocation.getPosition();
  $scope.locateMe = function() {
    $scope.updatingPosition = true;
    geolocation.updatePosition().then(function(position) {
      $scope.updatingPosition = false;
      $scope.position = position;
    });
  };
})

.filter('orderByDistanceTo', function($filter) {
  return function(campsites, position) {
    distance = function(campsite) {
      return $filter('distanceInMetres')(campsite.position, position);
    };
    return $filter('orderBy')(campsites, distance, false);
  };
})

.filter('distanceInMetres', function() {
  return function(position1, position2) {
    if (position1 == null || position2 == null)
      return null;

    var R = 6371000;
    var dLat = (position2.lat - position1.lat).toRad();
    var dLon = (position2.lng - position1.lng).toRad();
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(position1.lat.toRad()) * Math.cos(position2.lat.toRad()) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  };
})

.filter('distanceText', function() {
  // Distance needs to be in metres
  return function(distance) {
    units = undefined
    if(distance == null) {
      return "";
    }
    if(distance > 1000) {
      distance /= 1000;
      units = "km";
    }
    else {
      units = "m"
    }
    return(distance.toFixed(0) + " " + units);
  };
})

.filter('bearingInDegrees', function() {
  return function(position1, position2) {
    if (position1 == null || position2 == null)
      return null;

    var lon2 = position2.lng.toRad();
    var lat2 = position2.lat.toRad();
    var lon1 = position1.lng.toRad();
    var lat1 = position1.lat.toRad();
    var dLon = lon1 - lon2;
    var y = Math.sin(dLon) * Math.cos(lat1);
    var x = Math.cos(lat2) * Math.sin(lat1) - Math.sin(lat2) * Math.cos(lat1) * Math.cos(dLon);
    // This is a number between 0 and 360
    var bearing = (Math.atan2(y, x).toDeg() + 360.0) % 360;
    return bearing;
  };
})

.filter('bearingText', function() {
  return function(bearing) {
    if (bearing == null) {
      return ""
    }
    // Dividing the compass into 8 sectors that are centred on north
    sector = Math.floor(((bearing + 22.5) % 360.0) / 45.0);
    sectorNames = [ "N", "NE", "E", "SE", "S", "SW", "W", "NW" ];
    return sectorNames[sector];
  };
})

.filter('accessFields', function() {
  return function(campsite) {
    var have = [];
    var notHave = [];

    if (campsite == null) {
      return {have: [], notHave: []};
    }

    var caravans = campsite.caravans;
    var trailers = campsite.trailers;
    var car = campsite.car;

    if (caravans) {
      have.push("caravans");
    }
    else {
      notHave.push("caravans");
    }
    if (trailers) {
      have.push("trailers");
    }
    else {
      notHave.push("trailers");
    }
    if (car) {
      have.push("car camping");
    }
    else {
      notHave.push("car camping");
    }

    return {have: have, notHave: notHave};
  };
})

.filter('facilitiesFields', function() {
  return function(campsite) {
    var have = [];
    var notHave = [];

    if (campsite == null)
      return {have: [], notHave: []};

    var toilets = campsite.toilets;
    var picnicTables = campsite.picnicTables;
    var barbecues = campsite.barbecues;
    var showers = campsite.showers;
    var drinkingWater = campsite.drinkingWater;

    if (toilets == "flush") {
      have.push("flush toilets");
    }
    else if (toilets == "non_flush") {
      have.push("non-flush toilets");
    }
    else if (toilets == "none") {
      notHave.push("toilets");
    }

    if (picnicTables) {
      have.push("picnic tables");
    }
    else {
      notHave.push("picnic tables");
    }

    // TODO: show whether you need to bring your own firewood elsewhere
    // Like "You will need to bring firewood (if you want to use the wood BBQs) and drinking water"
    if(barbecues == "wood" || barbecues == "wood_supplied" || barbecues == "wood_bring_your_own") {
      have.push("wood BBQs");
    }
    else if (barbecues == "gas_electric") {
      have.push("gas/electric BBQs");
    }
    else if (barbecues == "none") {
      notHave.push("BBQs");
    }

    if (showers == "hot") {
      have.push("hot showers");
    }
    else if (showers == "cold") {
      have.push("cold showers");
    }
    else if (showers == "none") {
      notHave.push("showers");
    }

    if (drinkingWater) {
      have.push("drinking water");
    }
    else {
      notHave.push("drinking water");
    }
    return {have: have, notHave: notHave};
  };
})

.filter('haveFacilitiesFields', function($filter) {
  return function(campsite) {
    return $filter('facilitiesFields')(campsite)["have"];
  }
})

.filter('notHaveFacilitiesFields', function($filter) {
  return function(campsite) {
    return $filter('facilitiesFields')(campsite)["notHave"];
  }
})

.filter('haveAccessFields', function($filter) {
  return function(campsite) {
    return $filter('accessFields')(campsite)["have"];
  }
})

.filter('notHaveAccessFields', function($filter) {
  return function(campsite) {
    return $filter('accessFields')(campsite)["notHave"];
  }
})

.filter('listAsText', function() {
  return function(list) {
    if (list.length == 0) {
      return null;
    }
    else if (list.length == 1) {
      return list[0];
    }
    else {
      return list.slice(0, -1).join(", ") + " and " + list[list.length - 1];
    }
  };
})

.controller('CampsiteDetailCtrl', function($scope, $stateParams, Campsites) {
  Campsites.get($stateParams.campsiteId).then(function(data) {
    $scope.campsite = data;
  });
})

.controller('ParkDetailCtrl', function($scope, $stateParams, Campsites) {
  Campsites.getPark($stateParams.parkId).then(function(data) {
    $scope.park = data;
  });
  Campsites.inPark($stateParams.parkId).then(function(data) {
    $scope.campsites = data;
  });
});
