'use strict';
angular.module('webApp.reports', ['ngRoute', 'ngCsv', 'ngSanitize', 'firebase']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/reports', {
        templateUrl: 'reports/reports.html',
        controller: 'reportsCtrl'
    });
}]).controller('reportsCtrl', ['$scope', '$firebaseArray', '$filter', '$location', 'CommonProp', function ($scope, $firebaseArray, $filter, $location, CommonProp) {
    $scope.username = CommonProp.getUser();
    if (!$scope.username) {
        $location.path('/home');
    }
    $scope.datepickerConfig = {
        allowFuture: false
    };

    $scope.getArray = [];
    $scope.date = new Date();
    var selectedDate = moment($scope.date, 'MM/DD/YYYY');
    var rootRef = firebase.database().ref().child('LogInformation');
    $scope.contractors = $firebaseArray(rootRef);
    $scope.contractors.$loaded().then(function () {
        angular.forEach($scope.contractors, function (user) {
            if (selectedDate.isSame(moment(user.date, 'MM/DD/YYYY'), 'day')) {
                $scope.getArray.push({
                    "name": user.name,
                    "company": user.company,
                    "pin": user.pin,
                    "loginTime": user.loginTime,
                    "logOutTime": user.logOutTime,
                    "totalHours": user.totalHours,
                    "date": user.date
                });
            }





        })
    });
    $scope.rangeDate = function () {
        var selectedDate = moment($scope.date);
        $scope.getArray = [];
        console.log(selectedDate);
        console.log($scope.date);
        var rootRef = firebase.database().ref().child('LogInformation');
        $scope.contractors = $firebaseArray(rootRef);
        $scope.contractors.$loaded().then(function () {
            angular.forEach($scope.contractors, function (user) {
                if (selectedDate.isSame(moment(user.date, 'MM/DD/YYYY'), 'day') || moment(user.date, 'MM/DD/YYYY').isAfter(selectedDate, 'day')) {
                    $scope.getArray.push({
                        "name": user.name,
                        "company": user.company,
                        "pin": user.pin,
                        "loginTime": user.loginTime,
                        "logOutTime": user.logOutTime,
                        "totalHours": user.totalHours,
                        "date": user.date

                    });
                }
            })

        });
    }

     $scope.specificDate = function(){
        var selectedDate = moment($scope.date);
        $scope.getArray = [];

        var rootRef = firebase.database().ref().child('LogInformation');
        $scope.contractors = $firebaseArray(rootRef);
        $scope.contractors.$loaded().then(function () {
            angular.forEach($scope.contractors, function (user) {
                if (selectedDate.isSame(moment(user.date, 'MM/DD/YYYY'), 'day')) {
                    $scope.getArray.push({
                        "name": user.name,
                        "company": user.company,
                        "pin": user.pin,
                        "loginTime": user.loginTime,
                        "logOutTime": user.logOutTime,
                        "totalHours": user.totalHours,
                        "date": user.date

                    });
                }
            })

        });
     }
    $scope.logout = function () {
        CommonProp.logoutUser();
    }
}]);