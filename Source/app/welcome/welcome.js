'use strict';
angular.module('webApp.welcome', ['ngRoute', 'firebase']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/welcome', {
        templateUrl: 'welcome/welcome.html'
        , controller: 'WelcomeCtrl'
    });
}]).controller('WelcomeCtrl', ['$scope', function ($scope) {
    /* This variable is used to get the current date from the system.*/
    $scope.date = new Date();
}])