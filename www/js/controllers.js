angular.module('starter.controllers', ['ngResource'])

.controller('DashCtrl', function($scope) {})

.controller('LoginCtrl', function($scope, $state) {
    $scope.onClickLogin = function() {
        console.log('from login click');
        $state.go('tab.locations');
    }

})


.controller('LocationsListCtrl', function($scope, $http, PickAndDropAppServices) {
    $http.get('data/pickupLocations.json').then(function(data) {
    //$http.get('http://localhost:8080/pickupLocations').then(function(data) {
        
      $scope.locdata = data.data._embedded.pickupLocations;
    })

   
  $scope.remove = function(locdata) {
    PickAndDropAppServices.remove(locdata);
  }
})

.controller('PackagesCtrl', function($scope, $http, $stateParams, PickAndDropAppServices) {
    $http.get('data/parcels.json').then(function(data) {
      $scope.parcels = data.data._embedded.parcels;
    })

})

.controller('PackDetailCtrl', function($scope, $http, $stateParams, PickAndDropAppServices) {
    $http.get('data/package.json').then(function(data) {
      $scope.parcel = data.data._embedded.parcels[0];
    })

    $scope.onClickClaim = function() {
        console.log('from Claim Click');
        alert("Thanks for claiming a package delivery. We will notify you, when your request is processed");
        //$state.go('tab.inbox');
    }


})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };

});




