'use strict';
angular.module('webApp.reports', ['ngRoute', 'ngCsv', 'ngSanitize', 'firebase']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/reports', {
        templateUrl: 'reports/reports.html',
        controller: 'reportsCtrl'
    });
}]).controller('reportsCtrl', ['$scope', '$firebaseArray', '$filter', '$location', 'CommonProp', function ($scope, $firebaseArray, $filter, $location, CommonProp) {
    /*
        reportsCtrl involves the logic of the reports page. The functions allow the choosing of what should be in the getArray,which holds all of the log information for each contractor based on what date is chosen by the datepicker. reportsCtrl defaults to showing the current day's log information.
    */
    /*
        If user is not authenticated, bring them back to the welcome page.
    */
    $scope.username = CommonProp.getUser();
    if (!$scope.username) {
        $location.path('/welcome');
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
    /*
        rangeDate() inserts all of the dates from the selected date from the datepicker to the current date and displays that log information to the user in reports.html.
    */
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
        /*    specificDate() inserts all of the dates from the selected date from the datepicker from the log information into the getArray and             displays that log information to the user in reports.html.
         */
    $scope.specificDate = function () {
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
    /*
        logout() used to logout the user from the CommonProp service. 
    */
    $scope.logout = function () {
        CommonProp.logoutUser();
    }
}]);