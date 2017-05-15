'use strict';

angular.module('myApp.welcome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/welcome', {
        templateUrl: 'welcome/welcome.html',
        controller: 'WelcomeCtrl'
    });
}])

.controller('WelcomeCtrl', ['$scope','CommonProp', '$location', function($scope,CommonProp, $location) {
	$scope.username = CommonProp.getUser();

	if(!$scope.username) {
		$location.path('/home');
	}

	$scope.logout = function() {
    	CommonProp.logoutUser();
	}

	$scope.players = [
		{
			'id': 'player1',
			'score' : 0,
			'name' :''
		},
		{
			'id': 'player2',
			'score' : 0,
			'name' :''
		},
		{
			'id': 'player3',
			'score' : 0,
			'name' :''
		},
		{
			'id': 'player4',
			'score' : 0,
			'name' :''
		}
	];
}]);
