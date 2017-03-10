'use strict';
angular.module('webApp.contractorLogin', ['ngRoute', 'firebase', 'ui.bootstrap']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/contractorLogin', {
        templateUrl: 'contractorLogin/contractorLogin.html'
        , controller: 'contractorLoginCtrl'
    });
    }]).controller('contractorLoginCtrl', ['$scope', '$uibModal', 'CommonProp', '$firebaseArray', '$firebaseObject', '$location', function ($scope, $uibModal, CommonProp, $firebaseArray, $firebaseObject, $location) {
    $scope.loginPin = "";
    $scope.logoutPin = "";
    $scope.contractorLogin = function () {
        var ref = firebase.database().ref();
        ref.child('Contractors').orderByChild("pin").equalTo($scope.loginPin).once("value", function (snapshot) {
            var userData = snapshot.val();
            if (userData) {
                snapshot.forEach(function (childSnapshot) {
                    var value = childSnapshot.val();
                    $scope.name = value.name;
                    $scope.company = value.company;
                    var modalInstance = $uibModal.open({
                        component: 'myModal'
                        , controller: "contractorLoginCtrl"
                        , scope: $scope //passed current scope to the modal
                    });
                });
            }
            else {
                alert("Doesn't exist. Please see Admin");
            }
        });
    };
    $scope.contractorLogout = function () {
        var ref = firebase.database().ref();
        ref.child('Contractors').orderByChild("pin").equalTo($scope.logoutPin).once("value", function (snapshot) {
            var userData = snapshot.val();
            if (userData) {
                snapshot.forEach(function (childSnapshot) {
                    var value = childSnapshot.val();
                    $scope.name = value.name;
                    $scope.company = value.company;
                    var modalInstance = $uibModal.open({
                        component: 'myModal'
                        , controller: "contractorLoginCtrl"
                        , scope: $scope //passed current scope to the modal
                    });
                });
            }
            else {
                alert("Wrong Pin. Please see Admin!");
            }
        });
    };
    $scope.loginConfirmed = function () {
        var ref = firebase.database().ref();
        ref.child("Contractors").orderByChild("pin").equalTo($scope.loginPin).once("value", function (snapshot) {
            var userData = snapshot.val();
            if (userData) {
                var rootRef = firebase.database().ref().child('Contractors');
                var filterRef;
                filterRef = rootRef.orderByChild('pin').equalTo($scope.loginPin);
                $scope.contractors = $firebaseArray(filterRef);
                $scope.contractors.$loaded().then(function () {
                    angular.forEach($scope.contractors, function (contractor) {
                        var updateRef = firebase.database().ref().child('Contractors/' + contractor.$id);
                        updateRef.update({
                            logStatus: 1
                        }).then(function (ref) {
                            $scope.$apply(function () {
                                $("#loginConfirmModal").modal('hide');
                            });
                        }, function (error) {
                            console.log(error);
                        });
                    })
                });
                console.log($scope.contractors.name);
            }
        });
    };
    $scope.logoutConfirmed = function () {
        var ref = firebase.database().ref();
        ref.child("Contractors").orderByChild("pin").equalTo($scope.logoutPin).once("value", function (snapshot) {
            var userData = snapshot.val();
            if (userData) {
                var rootRef = firebase.database().ref().child('Contractors');
                var filterRef;
                filterRef = rootRef.orderByChild('pin').equalTo($scope.logoutPin);
                $scope.contractors = $firebaseArray(filterRef);
                $scope.contractors.$loaded().then(function () {
                    angular.forEach($scope.contractors, function (contractor) {
                        console.log(contractor.$id);
                        var updateRef = firebase.database().ref().child('Contractors/' + contractor.$id);
                        updateRef.update({
                            logStatus: 0
                        }).then(function (ref) {
                            $scope.$apply(function () {
                                $("#logoutConfirmModal").modal('hide');
                            });
                        }, function (error) {
                            console.log(error);
                        });
                    })
                });
            }
        });
    };
}]);