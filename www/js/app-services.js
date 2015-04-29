angular.module('app.services', [])

.factory('PickAndDropAppServices', function($http) {
  // Might use a resource here that returns a JSON array

  var locations = [{}];

  return {
    remove: function(loc) {
      locations.splice(locations.indexOf(loc), 1);
    },
    get: function(name) {
      for (var i = 0; i < locations.length; i++) {
        if (locations[i].name === parseInt(name)) {
          return locations[i];
        }
      }
      return null;
    }
  };
});
