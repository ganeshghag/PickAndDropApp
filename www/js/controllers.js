angular.module('starter.controllers', ['ngResource'])

.controller('DashCtrl', function($scope) {})

.controller('LoginCtrl', function($scope, $ionicPopup, $state) {
    $scope.submit = function(login) {
        console.log('from login click'+login.name+login.password);
        if(!login.name){
            $ionicPopup.alert({
               title: 'Login Name is Required!'
            });
        }else if(!login.password){
            $ionicPopup.alert({
               title: 'Password is Required!'
            });
        }
        else
            $state.go('tab.locations');
    }

    $scope.onClickSignUp = function() {
        console.log('from signup click');
        $state.go('tab.account');
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

  $scope.doRefresh = function() {
      console.log("from inside do refresh for loca list");
      /*
   $http.get('data/pickupLocations.json').then(function(data) {
      $scope.locdata = data.data._embedded.pickupLocations;
    }).finally(function() {
        $scope.$broadcast('scroll.refreshComplete');
    })
    */

    $scope.$broadcast('scroll.refreshComplete');
  }

})

.controller('PackagesCtrl', function($scope, $http, $stateParams, PickAndDropAppServices) {
    $http.get('data/parcels.json').then(function(data) {
        $scope.parcels = data.data._embedded.parcels;
    })
    
    $scope.doRefresh = function() {
        console.log("from inside do refresh for packages list");
        $scope.$broadcast('scroll.refreshComplete');
    }


})




.controller('PackDetailCtrl', function($scope, $http, $stateParams, $state, $ionicPopup) {
    $http.get('data/package.json').then(function(data) {
      $scope.parcel = data.data._embedded.parcels[0];
    })

    $scope.onClickClaim = function() {
        console.log('from Claim Click');
        alert("Thanks for claiming a package delivery. We will notify you, when your request is processed");
        $state.go('tab.deliveries');
    }

    // Triggered on a button click, or some other target
    $scope.showPopupBidAmount = function() {
      $scope.data = {}

      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template: 'Amount in Rs.<input type="text" ng-model="data.bidAmount" ng-init="data.bidAmount=150.00" style="border:1px solid #ff0000">',
        title: 'Delivery Fees',
        subTitle: 'Please enter a bid amount for which you agree to do delivery',
        scope: $scope,
        buttons: [
          //{ text: 'Cancel' },
          {
            text: '<b>Bid!</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.data.bidAmount) 
                  { e.preventDefault(); } 
              else { return $scope.data.bidAmount; }
            }
          }
        ]
      });
      myPopup.then(function(res) {
        console.log('Tapped!', res);
        console.log('after bid amount submit');
        //window.localStorage['navFromDeliveryConfirmed'] = 0;
        $state.go('tab.deliveries');
      });
      $timeout(function() {
         myPopup.close(); //close the popup after 3 seconds for some reason
      }, 30000);
     };



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
      $scope.mytoday=new Date().toString().slice(4,21);
      $scope.total=450;
  })

  $scope.doRefresh = function() {
        console.log("from inside do refresh for credits list");
        var newcredit = new Object();
        newcredit.packageId="PCK99901";
        newcredit.deliveryDateTime=new Date().toString().slice(4,21);
        newcredit.creditAmount="150.00";
        newcredit.status="Awaiting Payment";
        $scope.credits.push(newcredit);
        $scope.$broadcast('scroll.refreshComplete');

        $scope.total=$scope.total+150;
        $scope.mytoday=new Date().toString().slice(4,21);
  }


})

.controller('DeliveryDetailCtrl', function($scope, $http, $stateParams, $state, $ionicPopup, $timeout) {
    $http.get('data/package.json').then(function(data) {
      $scope.parcel = data.data._embedded.parcels[0];
      $scope.parcel.status='Alloted';
    })


    $scope.onClickDeliveryConfirm = function() {
        console.log('from onClickDeliveryConfirm()');
        window.localStorage['navFromDeliveryConfirmed'] = 0;
        $state.go('tab.deliveries');
    }

    $scope.onClickUploadFromCamera = function() {
        console.log('from onClickUploadFromCamera()'+JSON.stringify(navigator.camera));
        
        if(navigator.camera !== undefined){
            navigator.camera.getPicture(function(imageURI) {
                console.log('from getpicture URL='+imageURI);
            }, function(err) {
                console.log('err during getpicture err='+JSON.stringigy(err));
            });
        }else{
            console.log('navigator.camera was undefined');
        }

        
    }

    //window.localStorage['navFromDeliveryConfirmed'] = 0;
    //$state.go('tab.deliveries');


    

}) //end of DeliveryDetailCtrl


.controller('AccountCtrl', function($scope, $state) {
  $scope.settings = {
    enableFriends: true
  };

  $scope.onClickSaveAccount = function() {
        console.log('from save account');
        $state.go('tab.login');
  }

});




