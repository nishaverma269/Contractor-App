'use strict';
angular.module('webApp.adminSettings', ['ngRoute', 'firebase']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/adminSettings', {
        templateUrl: 'adminSettings/adminSettings.html'
        , controller: 'adminSettings'
    });
}]).controller('adminSettings', ['$scope', '$firebaseArray', '$location', 'CommonProp', function ($scope, $firebaseArray, $location, CommonProp) {
    $scope.username = CommonProp.getUser();
    if (!$scope.username) {
        $location.path('/home');
    }
    $scope.logout = function () {
        CommonProp.logoutUser();
    }
}]);