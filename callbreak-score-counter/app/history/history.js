'use strict';

angular.module('myApp.history', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/history', {
    templateUrl: 'history/history.html',
    controller: 'HistoryCtrl'
});
}])

.controller('HistoryCtrl', ['$scope','$location','$firebaseObject', '$firebaseAuth', function($scope,$location,$firebaseObject, $firebaseAuth) {
  $scope.mesg = 'Hello';
    var auth = $firebaseAuth();
    
}])

.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
]);
