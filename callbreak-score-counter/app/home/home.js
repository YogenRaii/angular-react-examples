'use strict';

angular.module('myApp.home', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
});
}])

.controller('HomeCtrl', ['$scope','$location','CommonProp','$firebaseAuth',function($scope,$location,CommonProp,$firebaseAuth) {
    var loginObj = $firebaseAuth();

    $scope.user = {};
    $scope.SignIn = function(e) {
        e.preventDefault();
        var username = $scope.user.email;
        var password = $scope.user.password;
        loginObj.$signInWithEmailAndPassword(username, password)
        .then(function(user) {
            //Success callback
            console.log('Authentication successful');
            CommonProp.setUser(user.email);
            $location.path('/welcome');
        }, function(error) {
            //Failure callback
            console.log('Authentication failure');
        });
    }


}])
.service('CommonProp',['$location', '$firebaseAuth', function($location, $firebaseAuth) {
    var user = '';
    var loginObj = $firebaseAuth();
    return {
        getUser: function() {
            if(user == '') {
                user = localStorage.getItem('userEmail');
            }
            return user;
        },
        setUser: function(value) {
            localStorage.setItem('userEmail', value);
            user = value;
        },
        logoutUser: function() {
            loginObj.$signOut().then(function() {
                //sign out success
                console.log("Logout done..");
                user = '';
                localStorage.removeItem('userEmail');
                $location.path('/home');
            }, function(error) {
                console.log("Logout error", error);
            });
            
        }
    };
}]);
