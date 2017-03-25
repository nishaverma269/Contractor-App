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
    $scope.getArray = [];
    var rootRef = firebase.database().ref().child('LogInformation');
    $scope.contractors = $firebaseArray(rootRef);
    $scope.contractors.$loaded().then(function () {
        angular.forEach($scope.contractors, function (user) {
            $scope.getArray.push({
                "name": user.name
                , "company": user.company
                , "pin": user.pin
                , "loginTime": user.loginTime
                , "logOutTime": user.logoutTime
                , "totalHours": user.totalHours
            });
        })
    });
    $scope.logout = function () {
        CommonProp.logoutUser();
    }
}]);