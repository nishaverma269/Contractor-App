'use strict';

angular.module('webApp.showContractors', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/showContractors', {
		templateUrl: 'showContractors/showContractors.html',
		controller: 'showContractorsCtrl'
	});
}])

.controller('showContractorsCtrl', ['$scope', 'CommonProp', '$firebaseArray', '$firebaseObject', '$location', function ($scope, CommonProp, $firebaseArray, $firebaseObject, $location) {
    $scope.username = CommonProp.getUser();
    $scope.contractorData = {
        companyName: "",
        contractorName: ""
    };


    if (!$scope.username) {
        $location.path('/home');
    }

    var rootRef = firebase.database().ref().child('Contractors');

    $scope.contractors = $firebaseArray(rootRef);

    $scope.editContractor = function (id) {
        var ref = firebase.database().ref().child('Contractors/' + id);
        $scope.editContractorData = $firebaseObject(ref);
    };

    $scope.updateContractor = function (id) {
        var ref = firebase.database().ref().child('Contractors/' + id);
        ref.update({
            name: $scope.editContractorData.name,
            company: $scope.editContractorData.company,
            pin: $scope.editContractorData.pin
        }).then(function (ref) {
            $scope.$apply(function () {
                $("#editModal").modal('hide');
            });
        }, function (error) {
            console.log(error);
        });
    };

    $scope.deleteCnf = function (contractor) {
        $scope.deleteContractor = contractor;
    };

    $scope.finalizeDelete = function (deleteContractor) {
        $scope.contractors.$remove(deleteContractor);
        $("#deleteModal").modal('hide');
    };

    $scope.logout = function () {
        CommonProp.logoutUser();
    }
    $scope.searchCompany = function () {
        var rootRef = firebase.database().ref().child('Contractors');
        var filterRef;
        if($scope.contractorData.companyName == undefined || $scope.contractorData.companyName === ""){
            $scope.contractors = $firebaseArray(rootRef);
        }
        else{
            filterRef = rootRef.orderByChild('company').equalTo($scope.contractorData.companyName);
            $scope.contractors = $firebaseArray(filterRef);
        }
    };
    $scope.searchName = function () {
        var rootRef = firebase.database().ref().child('Contractors');
        var filterRef;
        if($scope.contractorData.contractorName == undefined || $scope.contractorData.contractorName === ""){
            $scope.contractors = $firebaseArray(rootRef);
        }
        else{
            filterRef = rootRef.orderByChild('name').equalTo($scope.contractorData.contractorName);
            $scope.contractors = $firebaseArray(filterRef);
        }
    };
    
    $scope.logout = function(){
        CommonProp.logoutUser();
    };

}]);