'use strict';
angular.module('webApp.adminSettings', ['ngRoute', 'ngCsv', 'ngSanitize', 'firebase']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/adminSettings', {
        templateUrl: 'adminSettings/adminSettings.html'
        , controller: 'adminSettings'
    });
}]).controller('adminSettings', ['$scope', '$firebaseArray', '$location', 'CommonProp', function ($scope, $firebaseArray, $location, CommonProp) {
    $scope.user = firebase.auth().currentUser;
    /* Update method for updating admin's information in firebase. */
    $scope.updateAdmin = function () {
        $scope.user.updateEmail($scope.editData.email).then(function () {}, function (error) {
            console.log(error);
        });
        /* $scope.user.sendEmailVerification().then(function () {
             // Email sent.
         }, function (error) {
             // An error happened.
         });*/
        $scope.user.updatePassword($scope.editData.password).then(function () {
            $scope.$apply(function () {
                $("#editModal").modal('hide');
            });
        }, function (error) {
            console.log(error);
        });
    };
    /* Confirm before deleting */
    $scope.finalizeDelete = function (deleteContractor) {
        $scope.user.delete().then(function () {
            $scope.$apply(function () {
                $("#deleteModal").modal('hide');
            });
        }, function (error) {
            // An error happened.
        });
        $location.path('/contractorAdmin');
    };
    $scope.logout = function () {
        CommonProp.logoutUser();
    }
}]);