'use strict';
angular.module('webApp.home', ['ngRoute', 'firebase']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html'
        , controller: 'HomeCtrl'
    });
}]).controller('HomeCtrl', ['$scope', 'CommonProp', '$firebaseArray', '$firebaseObject', '$location', function ($scope, CommonProp, $firebaseArray, $firebaseObject, $location) {
    $scope.username = CommonProp.getUser();
    $scope.date = new Date();
    var rootRef = firebase.database().ref().child('LogInformation');
    $scope.contractors = $firebaseArray(rootRef);
    if (!$scope.username) {
        $location.path('/home');
    }
    $scope.logout = function () {
        CommonProp.logoutUser();
    }
}])