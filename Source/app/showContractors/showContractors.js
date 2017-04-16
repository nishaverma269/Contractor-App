'use strict';
angular.module('webApp.showContractors', ['ngRoute', 'firebase']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/showContractors', {
        templateUrl: 'showContractors/showContractors.html',
        controller: 'showContractorsCtrl'
    });

}]).controller('showContractorsCtrl', ['$scope', 'CommonProp', '$firebaseArray', '$firebaseObject', '$location', function ($scope, CommonProp, $firebaseArray, $firebaseObject, $location) {
    $scope.username = CommonProp.getUser();
    if (!$scope.username) {
        $location.path('/welcome');
    }
    /*
        showContractorsCtrl maintains the model involved with all of the contractors, which is adding, deleting and updating contractors. At first, it shows all contractors involved and can change by typing in the search bar in showContractors.html, which filters out contractors based on what it is typed. 
        For Example: Typing in cameron will give all contractors with that name and typing in 213 will give all contractors with that pin.
    */
    /*
        Done to create the firebaseArray for Company that can show up in the dropdown menu for Companies
    */
    var companyRef = firebase.database().ref().child('Company');
    $scope.companies = $firebaseArray(companyRef);
    
    $scope.date = new Date();
    $scope.datepickerConfig = {
        allowFuture: false
    };
    $scope.username = CommonProp.getUser();
    $scope.contractorData = {
        companyName: "",
        contractorName: "",
        search: ""
    };
    if (!$scope.username) {
        $location.path('/home');
    }
    $scope.currentDate = new Date();
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
            name: $scope.editContractorData.name,
            company: $scope.editContractorData.company,
            pin: $scope.editContractorData.pin,
            date: $scope.date
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
    /* 
        Method to search a contractor by company 
        Not used, but can be used in future
    */
    $scope.searchCompany = function () {
        var rootRef = firebase.database().ref().child('Contractors');
        var filterRef;
        if ($scope.contractorData.companyName == undefined || $scope.contractorData.companyName === "") {
            $scope.contractors = $firebaseArray(rootRef);
        } else {
            filterRef = rootRef.orderByChild('company').equalTo($scope.contractorData.companyName);
            $scope.contractors = $firebaseArray(filterRef);
        }
    };
    /* 
        Method to search a contractor by name
        Not used, but can be used in future
    */
    $scope.searchName = function () {
        var rootRef = firebase.database().ref().child('Contractors');
        var filterRef;
        if ($scope.contractorData.contractorName == undefined || $scope.contractorData.contractorName === "") {
            $scope.contractors = $firebaseArray(rootRef);
        } else {
            filterRef = rootRef.orderByChild('name').equalTo($scope.contractorData.contractorName);
            $scope.contractors = $firebaseArray(filterRef);
        }
    };
    /* Logout method for Admin */
    $scope.logout = function () {
        CommonProp.logoutUser();
    };
}]);