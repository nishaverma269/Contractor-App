'use strict';
angular.module('webApp.contractorLogin', ['ngRoute', 'firebase']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/contractorLogin', {
        templateUrl: 'contractorLogin/contractorLogin.html'
        , controller: 'contractorLoginCtrl'
    });
}]).controller('contractorLoginCtrl', ['$scope', 'CommonProp', '$firebaseArray', '$firebaseObject', '$location', function ($scope, CommonProp, $firebaseArray, $firebaseObject, $location) {
    $scope.loginPin = "";
    $scope.contractorLogin = function () {
        var ref = firebase.database().ref();
        ref.child("Contractors").orderByChild("pin").equalTo($scope.loginPin).once("value", function (snapshot) {
            var userData = snapshot.val();
            if (userData) {
                console.log("exists!")
            }
            else {
                console.log("Fail");
            }
        });
    };
}]);