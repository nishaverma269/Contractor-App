'use strict';
angular.module('webApp.addCompany', ['ngRoute', 'firebase']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/addCompany', {
        templateUrl: 'addCompany/addCompany.html'
        , controller: 'AddCompanyCtrl'
    });
}]).controller('AddCompanyCtrl', ['$scope', '$firebaseArray', '$location', 'CommonProp', function ($scope, $firebaseArray, $location, CommonProp) {
    $scope.username = CommonProp.getUser();
    if (!$scope.username) {
        $location.path('/home');
    }
    var ref = firebase.database().ref().child('Company');
    $scope.companies = $firebaseArray(ref);
    $scope.createCompany = function () {
        var company = $scope.company.titleTxt;
        $scope.companies.$add({
            company: company
        }).then(function (ref) {
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