angular.module('ngBoilerplate.message',['ui.router','ngRoute','ngSanitize'])
.config(function config($stateProvider) {
	$stateProvider
	.state('inbox',{
		url:'/inbox',
		views:{
			"main":{
				templateUrl:'/resources/back/src/app/message/email/inbox.html',
				controller:'InboxCtrl',
				controllerAs : 'inbox'
			}
		},
		data:{pageTitle:'Messages'}
	})
	.state('email',{
		url:'/inbox/email/:id',
		views:{
			"main":{
				templateUrl: '/resources/back/src/app/message/email/email.html',
				controller:'EmailCtrl',
				controllerAs: 'email'
			}			
		},
		data:{pageTitle:'Email'}
	});
	/*.otherwise({
		redirectTo:'/inbox'
	});*/
}).run(function($rootScope) {
	$rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
	    console.log(event, current, previous, rejection);
	    alert("Error occured");
	  });
});