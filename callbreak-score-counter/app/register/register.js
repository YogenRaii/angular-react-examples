'use strict';

angular.module('myApp.register', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'register/register.html',
    controller: 'RegisterCtrl'
});
}])

.controller('RegisterCtrl', ['$scope','$location','$firebaseObject', '$firebaseAuth', function($scope,$location,$firebaseObject, $firebaseAuth) {
  $scope.mesg = 'Hello';
    var auth = $firebaseAuth();
    $scope.signUp = function() {
        if (!$scope.regForm.$invalid) {
            var email = $scope.user.email;
            var password = $scope.user.password;
            if (email && password) {
                auth.$createUserWithEmailAndPassword(email, password)
                .then(function(firebaseUser) {
                  $scope.message = "User created with uid: " + firebaseUser.uid;
                  console.log($scope.message);
                })
                .catch(function(error) {
                  // Handle Errors here.
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  // ...
                });;
            }
        }
    };
}])

.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
]);
