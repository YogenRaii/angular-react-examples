var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope) {
  $scope.name = 'World';
  $scope.items = [{name: "One"}];
  setTimeout(function() {
    $scope.$apply(function() {
     $scope.items[0].lateLoader = 'i just loaded';  
    });
    
    
  }, 9000);
});
