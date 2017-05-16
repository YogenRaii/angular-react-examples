'use strict';

angular.module('myApp.survey', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/survey', {
		templateUrl: 'survey/survey-tpl.html',
		controller: 'SurveyCtrl'
	});
}])

.controller('SurveyCtrl', ['$scope',function($scope) {
	$scope.ratings = [
	{
		id:1,
		starRating: 0,
		title: 'Seat Comfort: '
	},
	{
		id:2,
		starRating: 0,
		title: 'On-time Departure: '
	},
	{
		id:3,
		starRating: 0,
		title: 'On-time Arrival: '
	},
	{
		id:4,
		starRating: 0,
		title: 'Food: '
	},
	{
		id:5,
		starRating: 0,
		title: 'In-flight Entertainment(IFE): '
	},
	{
		id:6,
		starRating: 0,
		title: 'Rest Room: '
	},
	{
		id:7,
		starRating: 0,
		title: 'Flight Attendants:  '
	},
	{
		id:8,
		starRating: 0,
		title: 'Overall Cabin Experience: '
	},
	{
		id:9,
		starRating: 0,
		title: 'Wifi: '
	}

	];

	$scope.submit = function() {
		console.log("form submitted...");
		var passengerResponse = {
			ratings: $scope.ratings,
			passengerInfo: $scope.passenger
		}
		console.log(passengerResponse);
	};

	var currentRatings = new Array();

	$scope.ratings.forEach(rating => currentRatings.push(rating.starRating));

	$scope.click = function (param, id) {
		console.log('Click(' + param + ', ' + id+')');
		$scope.ratings[id-1].starRating = param;
		currentRatings[id-1] = param;
	};

	$scope.mouseHover = function (param, id) {
		console.log('mouseHover(' + param + ')');
		$scope.ratings[id-1].starRating = param;
	};

	$scope.mouseLeave = function (param, id) {
		console.log('mouseLeave(' + param + ')');
		$scope.ratings[id-1].starRating = currentRatings[id-1];
	};
}])

.directive('starRating', function () {
	return {
		scope: {
			rating: '=',
			maxRating: '@',
			readOnly: '@',
			click: "&",
			mouseHover: "&",
			mouseLeave: "&"
		},
		restrict: 'EA',
		template:
		"<div style='display: inline-block; margin: 0px; padding: 0px; cursor:pointer;' ng-repeat='idx in maxRatings track by $index'> \
		<img ng-src='{{((hoverValue + _rating) <= $index) && \"http://www.codeproject.com/script/ratings/images/star-empty-lg.png\" || \"http://www.codeproject.com/script/ratings/images/star-fill-lg.png\"}}' \
		ng-Click='isolatedClick($index + 1)' \
		ng-mouseenter='isolatedMouseHover($index + 1)' \
		ng-mouseleave='isolatedMouseLeave($index + 1)'></img> \
		</div>",
		compile: function (element, attrs) {
			if (!attrs.maxRating || (Number(attrs.maxRating) <= 0)) {
				attrs.maxRating = '5';
			};
		},
		controller: function ($scope, $element, $attrs) {
			$scope.maxRatings = [];

			for (var i = 1; i <= $scope.maxRating; i++) {
				$scope.maxRatings.push({});
			};

			$scope._rating = $scope.rating;
			
			$scope.isolatedClick = function (param) {
				if ($scope.readOnly == 'true') return;

				$scope.rating = $scope._rating = param;
				$scope.hoverValue = 0;
				$scope.click({
					param: param
				});
			};

			$scope.isolatedMouseHover = function (param) {
				if ($scope.readOnly == 'true') return;

				$scope._rating = 0;
				$scope.hoverValue = param;
				$scope.mouseHover({
					param: param
				});
			};

			$scope.isolatedMouseLeave = function (param) {
				if ($scope.readOnly == 'true') return;

				$scope._rating = $scope.rating;
				console.log('isolatedMouseLeave(' + $scope._rating + ')');
				$scope.hoverValue = 0;
				$scope.mouseLeave({
					param: param
				});
			};
		}
	};
});