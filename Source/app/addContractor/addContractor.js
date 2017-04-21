'use strict';
angular.module('webApp.addContractor', ['ngRoute', 'firebase']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/addContractor', {
        templateUrl: 'addContractor/addContractor.html',
        controller: 'addContractorCtrl'
    });
}]).controller('addContractorCtrl', ['$scope', '$filter', '$firebaseArray', '$location', 'CommonProp', function ($scope, $filter, $firebaseArray, $location, CommonProp) {
    /*  addContractorCtrl will add a new contractor to the system when the createContractor function is invoked. 
        Also includes the logic for using the datepicker.
    */
    /*
        If user is not authenticated, bring them back to the welcome page.
    */
    $scope.username = CommonProp.getUser();
    if (!$scope.username) {
        $location.path('/welcome');
    }
    /* 
        Used to help with configuring the datepicker, such as
        not allowing future dates to be picked.
    */
    $scope.datepickerConfig = {
        allowFuture: false
    };
    var ref = firebase.database().ref().child('Contractors');
    var companyRef = firebase.database().ref().child('Company');
    $scope.companies = $firebaseArray(companyRef);
    $scope.contractor = $firebaseArray(ref);
    $scope.date = new Date();
    /* 
       createContractor() stores the required information for a contractor in the database.
       Uses the datepicker date for the date field.
    */
    $scope.createContractor = function () {
        var name = $scope.contractor.name;
        var company = $scope.contractor.company;
        var pin = $scope.contractor.pin;
        var contractorDate = $scope.date;
        ref.orderByChild("pin").equalTo(pin).once("value", function (snapshot) {
            var userData = snapshot.val();
            if (userData) {
                 $("#dupContractorModal").modal('show');
                //alert("A contractor is already in the system with the same PIN. Please choose another.");
            } else {
                $scope.contractor.$add({
                    name: name,
                    company: company,
                    pin: pin,
                    logStatus: 0,
                    date: contractorDate
                }).then(function (ref) {
                    $scope.success = true;
                    window.setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.success = false;
                        });
                    }, 2000);
                }, function (error) {
                    console.log(error);
                });
            }
        });
        $scope.contractor.name = ''; // reset name 
        $scope.contractor.company = ''; // reset company
        $scope.contractor.pin = ''; // reset pin
    };
    /*
        Used to logout a user from the site.
    */
    $scope.logout = function () {
        CommonProp.logoutUser();
    }
}]);