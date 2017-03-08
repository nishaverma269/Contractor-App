'use strict';

angular.module('webApp.reports', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/reports', {
		templateUrl: 'reports/reports.html',
		controller: 'reportsCtrl'
	});
}])

.controller('reportsCtrl', ['$scope', '$firebaseArray', '$location', 'CommonProp', function($scope, $firebaseArray, $location, CommonProp){

	$scope.username = CommonProp.getUser();

	if(!$scope.username){
		$location.path('/home');
	}
    
    $scope.logout = function(){
		CommonProp.logoutUser();
	}
}]);


