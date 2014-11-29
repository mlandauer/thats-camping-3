angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Campsites', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var campsites = [
    {
      id: 0,
      shortName: "Acacia Flat",
      longName: "Acacia Flat",
      latitude: -33.6149,
      longitude: 150.3553,
      toilets: "non_flush",
      picnicTables: false,
      barbecues: "wood",
      showers: "none",
      drinkingWater: false,
      caravans: false,
      trailers: false,
      car: false,
      description: "Explore the \"cradle of conservation\", the Blue Gum Forest. Enjoy birdwatching, long walks and plenty of photogenic flora.",
      park_id: 1
    },
    {
      id: 1,
      shortName: "Euroka (trailer area)",
      longName: "Euroka campground - Appletree Flat campervan and camper trailer area",
      latitude: -33.80002,
      longitude: 150.61707,
      toilets: "non_flush",
      picnicTables: true,
      barbecues: "wood",
      showers: "none",
      drinkingWater: false,
      caravans: false,
      trailers: true,
      car: true,
      description: "See the general Euroka campground information for facilities and activities. NOTE: Bring your own firewood - collecting firewood from the bush at Euroka is prohibited. \n\nPlease note that the campervan sites are suitable for small campervans or campertrailers - the sites are adjacent to the road edge.",
      park_id: 1
    }
  ];

  return {
    all: function() {
      return campsites;
    },
    get: function(campsiteId) {
      // Simple index lookup
      return campsites[campsiteId];
    }
  }
});
