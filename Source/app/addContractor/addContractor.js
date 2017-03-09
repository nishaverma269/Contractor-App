'use strict';
angular.module('webApp.addContractor', ['ngRoute', 'firebase']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/addContractor', {
        templateUrl: 'addContractor/addContractor.html'
        , controller: 'addContractorCtrl'
    });
}]).controller('addContractorCtrl', ['$scope', '$filter', '$firebaseArray', '$location', 'CommonProp', function ($scope, $filter, $firebaseArray, $location, CommonProp) {
    $scope.username = CommonProp.getUser();
    if (!$scope.username) {
        $location.path('/home');
    }
    var ref = firebase.database().ref().child('Contractors');
    $scope.contractor = $firebaseArray(ref);
    $scope.createContractor = function () {
        var name = $scope.contractor.name;
        var company = $scope.contractor.company;
        var pin = $scope.contractor.pin;
        $scope.date = $filter("date")(Date.now(), 'MM-dd-yyyy');
        var date = $scope.date;
        $scope.contractor.$add({
            name: name
            , company: company
            , pin: pin
            , logStatus: 0
            , date: date
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
        $scope.contractor.name = ''; // reset name 
        $scope.contractor.company = ''; // reset company
        $scope.contractor.pin = ''; // reset pin
    };
    $scope.logout = function () {
        CommonProp.logoutUser();
    }
}]);