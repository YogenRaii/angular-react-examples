'use strict';
angular.module('myapp.delivery_request',['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/delivery_request', {
        templateUrl: 'delivery_request/delivery_request.html',
        controller: 'delivery_requestCtrl'
    });
}])

.controller('delivery_requestCtrl', ['$scope','$location','$firebase','LoginService', function($scope,$location,$firebase,LoginService)){
	var firebaseObj = new Firebase("https://x-press-2016.firebaseio.com/delivery_request");
    var fb = $firebase(firebaseObj);

    $scope.add_Delivery_Request = function(){
    	var billNo = $scope.deliveryRequest.billNo;
    	var fullName = $scope.deliveryRequest.fullName;
    	var noOfBox = $scope.deliveryRequest.boxNum;
    	var weightOfBox = $scope.deliveryRequest.weight;
    	var amount = $scope.deliveryRequest.amount;
    	var amountPaid = $scope.deliveryRequest.paidAmt;
    	var addressLine1 = $scope.deliveryRequest.addressLine1;
    	var addressLine2 = $scope.deliveryRequest.addressLine2;
    	var city = $scope.deliveryRequest.state;
    	var state = $scope.deliveryRequest.state;
    	var zip = $scope.deliveryRequest.zip;
    	var estimatedDeliveryTime = $scope.deliveryRequest.deliveryTime;
    }
}