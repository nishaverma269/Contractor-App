'use strict';
angular.module('webApp.addCompany', ['ngRoute', 'firebase']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/addCompany', {
        templateUrl: 'addCompany/addCompany.html',
        controller: 'AddCompanyCtrl'
    });
}]).controller('AddCompanyCtrl', ['$scope', '$firebaseArray', '$location', 'CommonProp', function ($scope, $firebaseArray, $location, CommonProp) {
    /* 
        AddCompanyCtrl does the neccessary Firebase methods to create a new company in the database that will be included in the dropdown menu for addContractor.
    */
    /*
        If user is not authenticated, bring them back to the welcome page.
    */
    $scope.username = CommonProp.getUser();
    if (!$scope.username) {
        $location.path('/welcome');
    }
    /*
        Done to create the firebaseArray for Company that can show up in the dropdown menu for Companies
    */
    var ref = firebase.database().ref().child('Company');
    $scope.companies = $firebaseArray(ref);
    /* 
        createCompany() will invoke when user press Create button in the view which will use the Company table in the database to add a new company entered by a user.
    */
    $scope.createCompany = function () {
        $scope.addedCompany = false;
        var company = $scope.company.titleTxt;
        $scope.companies.$add({
            company: company
        }).then(function (ref) {
            $scope.addedCompany = true;
            console.log(ref);
            $scope.success = true;
            window.setTimeout(function () {
                $scope.$apply(function () {
                    $scope.success = false;
                });
            }, 2000);
        }, function (error) {
            console.log(error);
        });

    };
}]);