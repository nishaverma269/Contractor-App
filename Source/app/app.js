'use strict';
// Declare app level module which depends on views, and components
angular.module('webApp', [
  'ngRoute', 'ngCsv', 'ngSanitize'
  , 'webApp.home'
  , 'webApp.register'
  , 'webApp.welcome'
  , 'webApp.addPost'
  , 'webApp.contractorAdmin'
  , 'webApp.adminSettings'
  , 'webApp.reports'
  , 'webApp.showContractors'
  , 'webApp.addContractor'
  , 'webApp.contractorLogin'
]).
config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $routeProvider.otherwise({
        redirectTo: '/welcome'
    });
}]);