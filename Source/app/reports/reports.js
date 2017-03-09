'use strict';
angular.module('webApp.reports', ['ngRoute', 'ngCsv', 'ngSanitize', 'firebase']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/reports', {
        templateUrl: 'reports/reports.html'
        , controller: 'reportsCtrl'
    });
}]).controller('reportsCtrl', ['$scope', '$firebaseArray', '$location', 'CommonProp', function ($scope, $firebaseArray, $location, CommonProp) {
    $scope.username = CommonProp.getUser();
    if (!$scope.username) {
        $location.path('/home');
    }
    var rootRef = firebase.database().ref().child('Contractors');
    $scope.contractors = $firebaseArray(rootRef);
    $scope.currentDate = new Date();
    $scope.contractors.$loaded().then(function () {
        angular.forEach($scope.contractors, function (user) {
            console.log(user);
            $scope.getArray = [{
                a: user.name
                , b: user.company
            }];
        })
    });
    $scope.logout = function () {
        CommonProp.logoutUser();
    }
}]);