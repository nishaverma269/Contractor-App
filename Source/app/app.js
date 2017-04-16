'use strict';
// Declare app level module which depends on views, and components
angular.module('webApp', [
  'ngRoute', 'ngCsv', 'ui.bootstrap', 'angularMoment', 'ngFlatDatepicker'
  , 'webApp.home'
  , 'webApp.register'
  , 'webApp.welcome'
  , 'webApp.contractorAdmin'
  , 'webApp.adminSettings'
  , 'webApp.reports'
  , 'webApp.showContractors'
  , 'webApp.addContractor', 'webApp.addCompany'
  , 'webApp.contractorLogin', 'webApp.safetyTraining'
]).
config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $routeProvider.otherwise({
        redirectTo: '/welcome'
    });
}]);