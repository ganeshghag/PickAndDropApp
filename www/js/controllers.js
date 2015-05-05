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

.controller('PackDetailCtrl', function($scope, $http, $stateParams, $state) {
    $http.get('data/package.json').then(function(data) {
      $scope.parcel = data.data._embedded.parcels[0];
    })

    $scope.onClickClaim = function() {
        console.log('from Claim Click');
        alert("Thanks for claiming a package delivery. We will notify you, when your request is processed");
        $state.go('tab.deliveries');
    }


})

.controller('DeliveriesListCtrl', function($scope, $http) {
    $http.get('data/deliveries.json').then(function(data) {
      $scope.parcels = data.data._embedded.parcels;
      console.log("from DeliveriesListCtrl" + window.localStorage.navFromDeliveryConfirmed);
        if(window.localStorage.navFromDeliveryConfirmed < 3){
            $scope.parcels[0].status="Delivered! Today@5:30 pm";
            console.log("from DeliveriesListCtrl set to deilvered");
            window.localStorage.navFromDeliveryConfirmed++;
        }

            

    })

    $scope.onViewClick = function(){
        $scope.parcels[0].status="Alloted";
    }
    
   
})
.controller('CreditsListCtrl', function($scope, $http) {
  $http.get('data/credits.json').then(function(data) {
      $scope.credits = data.data._embedded.credits;
  })

})

.controller('DeliveryDetailCtrl', function($scope, $http, $stateParams, $state) {
    $http.get('data/package.json').then(function(data) {
      $scope.parcel = data.data._embedded.parcels[0];
      $scope.parcel.status='Alloted';
    })


    $scope.onClickDeliveryConfirm = function() {
        console.log('from onClickDeliveryConfirm()');
        window.localStorage['navFromDeliveryConfirmed'] = 0;
        $state.go('tab.deliveries');
    }

})


.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };

});




