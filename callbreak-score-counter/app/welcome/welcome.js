'use strict';

angular.module('myApp.welcome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/welcome', {
		templateUrl: 'welcome/welcome.html',
		controller: 'WelcomeCtrl'
	});
}])

.controller('WelcomeCtrl', ['$scope','CommonProp', '$location', function($scope,CommonProp, $location) {
	$scope.home = true;

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

	$scope.scores = [
	{
		'player1' : 0,
		'player2' : 0,
		'player3' : 0,
		'player4' : 0
	},
	{
		'player1' : 0,
		'player2' : 0,
		'player3' : 0,
		'player4' : 0
	},
	{
		'player1' : 0,
		'player2' : 0,
		'player3' : 0,
		'player4' : 0
	},
	{
		'player1' : 0,
		'player2' : 0,
		'player3' : 0,
		'player4' : 0
	}
	];

	$scope.player1_scoreSub = 0;
	$scope.player2_scoreSub = 0;
	$scope.player3_scoreSub = 0;
	$scope.player4_scoreSub = 0;

	$scope.updateScore = function() {
		$scope.player1_scoreSub = 0;
		$scope.player2_scoreSub = 0;
		$scope.player3_scoreSub = 0;
		$scope.player4_scoreSub = 0;
		var index;
		for(index = 0; index < $scope.scores.length; index ++) {
			$scope.player1_scoreSub += parseFloat($scope.scores[index].player1);
			$scope.player2_scoreSub += parseFloat($scope.scores[index].player2);
			$scope.player3_scoreSub += parseFloat($scope.scores[index].player3);
			$scope.player4_scoreSub += parseFloat($scope.scores[index].player4);
		}
	};

	$scope.lostItr = function(value) {
		return value < 0;
	}

	$scope.playFinalGame = function() {
		return ($scope.player1_scoreSub + $scope.player2_scoreSub + $scope.player3_scoreSub + $scope.player4_scoreSub) == 52;
	}
	
}]);
