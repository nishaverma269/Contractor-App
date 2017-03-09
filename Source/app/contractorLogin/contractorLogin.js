'use strict';
angular.module('webApp.contractorLogin', ['ngRoute', 'firebase']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/contractorLogin', {
        templateUrl: 'contractorLogin/contractorLogin.html'
        , controller: 'ContractorCtrl'
    });
}]).controller('ContractorCtrl', ['$scope', '$firebaseArray', '$location', 'CommonProp', function ($scope, $firebaseArray, $location, CommonProp) {
    $scope.contractorLogin = function () {};
    $scope.contractorLogout = function () {}
}]);