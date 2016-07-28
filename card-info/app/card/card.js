'use strict';

angular.module('myApp.card', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/card', {
    templateUrl: 'card/card-tpl.html',
    controller: 'CardCtrl'
  });
}])

.controller('CardCtrl', ['$scope',function($scope) {
	var cardNum = $scope.cardNumber;
}])

.filter('ccLogo',function(){
	return function(cardNumber){
		var cardType = "";
		//first check for MasterCard
		if(/^5[1-5]/.test(cardNumber)){
			cardType = "mastercard";
		}
		//check for visa card
		else if(/^4/.test(cardNumber)){
			cardType = "visa";
		}
		//check for amex card
		else if(/^3[47]/.test(cardNumber)){
			cardType = "amex";
		}
		return cardType;
	}
});