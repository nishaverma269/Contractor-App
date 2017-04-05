'use strict';
angular.module('webApp.addContractor', ['ngRoute', 'firebase']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/addContractor', {
        templateUrl: 'addContractor/addContractor.html'
        , controller: 'addContractorCtrl'
    });
}]).controller('addContractorCtrl', ['$scope', '$filter', '$firebaseArray', '$location', 'CommonProp', function ($scope, $filter, $firebaseArray, $location, CommonProp) {
    /* Controller will invoke createContractor method when ng-click directive is used.*/
    $scope.username = CommonProp.getUser();
    if (!$scope.username) {
        $location.path('/home');
    }
    $scope.datepickerConfig = {
        allowFuture: false
        , dateFormat: 'MM/DD/YYYY'
    };
    var ref = firebase.database().ref().child('Contractors');
    $scope.contractor = $firebaseArray(ref);
    var date = "";
    /* All the required information is being stored in Contractors table in database.*/
    $scope.createContractor = function () {
        var name = $scope.contractor.name;
        var company = $scope.contractor.company;
        var pin = $scope.contractor.pin;
        var contractorDate = $scope.date;
        ref.orderByChild("pin").equalTo(pin).once("value", function (snapshot) {
            var userData = snapshot.val();
            if (userData) {
                console.log("exists!")
            }
            else {
                $scope.contractor.$add({
                    name: name
                    , company: company
                    , pin: pin
                    , logStatus: 0
                    , date: contractorDate
                }).then(function (ref) {
                    $scope.success = true;
                    window.setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.success = false;
                        });
                    }, 2000);
                }, function (error) {
                    console.log(error);
                });
            }
        });
        $scope.contractor.name = ''; // reset name 
        $scope.contractor.company = ''; // reset company
        $scope.contractor.pin = ''; // reset pin
    };
    $scope.logout = function () {
        CommonProp.logoutUser();
    }
}]);