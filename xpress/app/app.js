'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.login',
  'myApp.register',
  'myApp.dashboard',
  'myApp.addDetails',
  'myApp.version',
  'myApp.delivery_request',
  'myApp.delivery_guy',
  'myApp.dvguy_response',
  'myApp.cust_request'

]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({
  	redirectTo: '/login'
  });
}]);
