'use strict';
angular.module('webApp.showContractors', ['ngRoute', 'firebase']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/showContractors', {
        templateUrl: 'showContractors/showContractors.html'
        , controller: 'showContractorsCtrl'
    });
}]).controller('showContractorsCtrl', ['$scope', 'CommonProp', '$firebaseArray', '$firebaseObject', '$location', function ($scope, CommonProp, $firebaseArray, $firebaseObject, $location) {
    $scope.username = CommonProp.getUser();
    $scope.contractorData = {
        companyName: ""
        , contractorName: ""
    };
    if (!$scope.username) {
        $location.path('/home');
    }
    var rootRef = firebase.database().ref().child('Contractors');
    $scope.contractors = $firebaseArray(rootRef);
    /* Edit method for getting contractor's information from firebase database. */
    $scope.editContractor = function (id) {
        var ref = firebase.database().ref().child('Contractors/' + id);
        $scope.editContractorData = $firebaseObject(ref);
    };
    /* Update method for updating contractor's information in firebase database. */
    $scope.updateContractor = function (id) {
        var ref = firebase.database().ref().child('Contractors/' + id);
        ref.update({
            name: $scope.editContractorData.name
            , company: $scope.editContractorData.company
            , pin: $scope.editContractorData.pin
        }).then(function (ref) {
            $scope.$apply(function () {
                $("#editModal").modal('hide');
            });
        }, function (error) {
            console.log(error);
        });
    };
    /* Delete method */
    $scope.deleteCnf = function (contractor) {
        $scope.deleteContractor = contractor;
    };
    /* Confirm before deleting */
    $scope.finalizeDelete = function (deleteContractor) {
        $scope.contractors.$remove(deleteContractor);
        $("#deleteModal").modal('hide');
    };
    /* Method to search a contractor by company */
    $scope.searchCompany = function () {
        var rootRef = firebase.database().ref().child('Contractors');
        var filterRef;
        if ($scope.contractorData.companyName == undefined || $scope.contractorData.companyName === "") {
            $scope.contractors = $firebaseArray(rootRef);
        }
        else {
            filterRef = rootRef.orderByChild('company').equalTo($scope.contractorData.companyName);
            $scope.contractors = $firebaseArray(filterRef);
        }
    };
    /* Method to search a contractor by name */
    $scope.searchName = function () {
        var rootRef = firebase.database().ref().child('Contractors');
        var filterRef;
        if ($scope.contractorData.contractorName == undefined || $scope.contractorData.contractorName === "") {
            $scope.contractors = $firebaseArray(rootRef);
        }
        else {
            filterRef = rootRef.orderByChild('name').equalTo($scope.contractorData.contractorName);
            $scope.contractors = $firebaseArray(filterRef);
        }
    };
    /* Logout method for Admin */
    $scope.logout = function () {
        CommonProp.logoutUser();
    };
}]);