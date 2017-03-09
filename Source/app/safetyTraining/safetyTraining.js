'use strict';
angular.module('webApp.safetyTraining', ['ngRoute', 'firebase']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/safetyTraining', {
        templateUrl: 'safetyTraining/safetyTraining.html'
        , controller: 'safetyTrainingCtrl'
    });
}]).controller('safetyTrainingCtrl', ['$scope', '$firebaseAuth', '$location', 'CommonProp', function ($scope, $firebaseAuth, $location, CommonProp) {}]);