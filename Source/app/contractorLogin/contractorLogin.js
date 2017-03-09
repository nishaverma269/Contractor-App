'use strict';
angular.module('webApp.contractorLogin', ['ngRoute', 'firebase']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/contractorLogin', {
        templateUrl: 'contractorLogin/contractorLogin.html',
        controller: 'contractorLoginCtrl'
    });
    }]).controller('contractorLoginCtrl', ['$scope', 'CommonProp', '$firebaseArray', '$firebaseObject', '$location', function ($scope, CommonProp, $firebaseArray, $firebaseObject, $location) {
    $scope.loginPin = "";
    $scope.logoutPin = "";
    $scope.loginConfirmed = function () {
        var ref = firebase.database().ref();
        ref.child("Contractors").orderByChild("pin").equalTo($scope.loginPin).once("value", function (snapshot) {

            var userData = snapshot.val();
            if (userData) {
                var rootRef = firebase.database().ref().child('Contractors');
                var filterRef;
                filterRef = rootRef.orderByChild('pin').equalTo($scope.loginPin);
                $scope.contractors = $firebaseArray(filterRef);
                $scope.contractors.$loaded()
                    .then(function () {
                        angular.forEach($scope.contractors, function (contractor) {
                            console.log(contractor.$id);
                            var updateRef = firebase.database().ref().child('Contractors/' + contractor.$id);
                         updateRef.update({
                                
                                logStatus: 1
                               
                            });
                        })
                    });
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
                $scope.contractors.$loaded()
                    .then(function () {
                        angular.forEach($scope.contractors, function (contractor) {
                            console.log(contractor.$id);
                            var updateRef = firebase.database().ref().child('Contractors/' + contractor.$id);
                            updateRef.update({
                                name: contractor.name,
                                company: contractor.company,
                                pin: contractor.pin,
                                logStatus: 0,
                                date:contractor.date
                            });
                        })
                    });
            }
        });
    };
}]);