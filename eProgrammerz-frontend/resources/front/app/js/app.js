/**
 * 
 */

angular.module('mainApp',['ui.router','ngSanitize','ngLoadingSpinner'])
.config(function($stateProvider) {
	
	$stateProvider.state("index",{
		url:"",
		views:{
			"chapter-view":{
				//templateUrl : '../resources/front/app/chapter-intro.html',
				controller : 'ChapterIntroCtrl'
			}
		}
	}).state("chapter",{
		url:"/:id",
		params:{chapId:null},
		views:{
			"chapter-view":{
				templateUrl : '../resources/front/app/chapter.html',
				controller : 'ChapterCtrl'
			},
			"content-view":{
				templateUrl : '../resources/front/app/tutorial.html',
				controller : 'TutorialCtrl'
			}
			
		}
	}).state("content",{
		url:"/:chapId/:contentId",
		views:{
			"chapter-view":{
				templateUrl : '../resources/front/app/tutorial.html',
				controller : 'TutorialCtrl'
			}
		}
	});
}).controller('TutorialCtrl',function($scope,$stateParams,TutorialFacotry){
	TutorialFacotry.getTutorials($stateParams.chapId,$stateParams.contentId).then(function() {
		$scope.chapterContents = TutorialFacotry.contents;
	});
	console.log($stateParams);
}).controller('ChapterCtrl',function($stateParams,$scope,ChapterFactory){
	ChapterFactory.getChapter($stateParams.id,$stateParams.chapId).then(function() {
		$scope.chapter = ChapterFactory.chapter;
	});
	console.log($stateParams);
}).controller('ChapterIntroCtrl',function($stateParams){
	console.log("controller called");
	$(function() {
		console.log("radio is being clicked...");
		$("input:radio:first").click();
		console.log($(".list-group>.active").html());
//		$(".list-group>.active").click();
//		$("input:radio[name=category][disabled=false]:first").attr('checked', true);
//		$("input:radio:first").click();​
	});
	
	
})

.controller('ContactCtrl',function($scope,MessageFactory){
    	$scope.success_message = "";
    	$scope.sendMessage =  function() {
			MessageFactory.postMessage($scope.message).success(function(response) {
				$scope.success_message = "Thank you "+$scope.message.name+" for message. We'll contact you as soon as possible!";
				$scope.errors = "";
				$scope.message = "";
				$scope.submitted = false;
				console.log(response);
			}).error(function(response) {
				$scope.success_message = "";
				$scope.errors = response.errors;
				console.log(response);
			});
		};
})

.factory('MessageFactory',function($http){
	var factory ={};
	factory.postMessage = function(message) {
		console.log(message);
		return $http.post('message',message);
	}
	return factory;
})

.factory('TutorialFacotry',function($http){
	var factory ={};
	factory.getTutorials = function(id,slug) {
		console.log("got here");
		return $http.get(id+'/contents').success(function(data) {
			factory.contents = data;
		}).error(function(response) {
			console.log(response);
		});
	}
	return factory;
}).factory('ChapterFactory',function($http){
	var factory = {};
	factory.getChapter = function(langId,chapterId) {
		return $http.get(langId+'/'+chapterId).success(function(data) {
			factory.chapter = data;
		});
	};
	return factory;
})

.filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}])

;