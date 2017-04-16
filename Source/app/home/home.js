'use strict';
angular.module('webApp.home', ['ngRoute', 'firebase']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
}]).controller('HomeCtrl', ['$scope', 'CommonProp', '$firebaseArray', '$firebaseObject', '$location', function ($scope, CommonProp, $firebaseArray, $firebaseObject, $location) {
    /*
        HomeCtrl performs the logic for the page that admins are welcomed to when they first login in. It also has the logic for what is shown on the admin home page, which are the contractors who are logged in and those who need to update their training based on if it has been at least 11 months since their last training session.
    */
    /*
        If user is not authenticated, bring them back to the welcome page.
    */
    $scope.username = CommonProp.getUser();
    if (!$scope.username) {
        $location.path('/welcome');
    }
    var currentDate = moment(new Date(), "MM/DD/YYYY");
    $scope.getArray = [];
    $scope.username = CommonProp.getUser();
    $scope.date = new Date();
    var rootRefLog = firebase.database().ref().child('LogInformation');
    var rootRefCon = firebase.database().ref().child('Contractors');
    $scope.contractors = $firebaseArray(rootRefLog);
    $scope.contractorsTraining = $firebaseArray(rootRefCon);
    $scope.contractorsTraining.$loaded().then(function () {
        angular.forEach($scope.contractorsTraining, function (user) {
            if (currentDate.isSame(moment(user.date, 'MM/DD/YYYY').add(11, 'months'), 'day') || currentDate.isAfter(moment(user.date, 'MM/DD/YYYY').add(11, 'months'), 'day')) {
                $scope.getArray.push({
                    "name": user.name,
                    "pin": user.pin,
                    "date": user.date
                });
            }
        })

    });
    $scope.logout = function () {
        CommonProp.logoutUser();
    }
}])