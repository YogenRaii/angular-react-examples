angular.module( 'ngBoilerplate.chapter', [
  'ui.router',
  'placeholders',
  'ui.bootstrap',
  'ngSanitize'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'chapter', {
	    url: '/:languageId/chapters',
	    views: {
	      "main": {
	        controller: 'ChapterCtrl',
	        templateUrl: '/resources/back/src/app/chapter/chapter.tpl.html'
	      }
	    },
	    data:{ pageTitle: 'Chapters' }
	  }).state('addChapter',{
	  url:'/:langId/add_chapter',
	  views : {
		  "main":{
			  controller : 'ManageChapterCtrl',
			  templateUrl : '/resources/back/src/app/chapter/manage-chapter.tpl.html'
		  }
	  },
	  data : {pageTitle : 'Add Chapter'}
  }).state('editChapter',{
	  url : '/:langId/edit_chapter',
	  params : {chapter : null},
	  views : {
		  "main" : {
			  controller : 'ManageChapterCtrl',
			  templateUrl : '/resources/back/src/app/chapter/manage-chapter.tpl.html'
		  }
	  },
	  data: {pageTitle : 'EditChapter'}
  });
})

.controller( 'ChapterCtrl', function ChapterCtrl( $scope,ChapterFactory,$stateParams ) {
// console.log($stateParams.languageId);
	$scope.currentLangId = $stateParams.languageId;
	ChapterFactory.getAllChapters($stateParams.languageId).then(function() {
		$scope.chapters = ChapterFactory.allChapters;
// console.log($scope.chapters);
	});
	
	$scope.deleteChapter =  function(chapter,index) {
		$scope.deleteMsg = "";
		$("#deleteModal").modal("show");
		
		$scope.deleteChapterConfirm = function() {
			ChapterFactory.deleteChapter(chapter,$scope.currentLangId).then(function(response) {
				$scope.deleteMsg = "Chapter Deleted Successfully!";
				$scope.chapters.splice(index,1);
			});
		};			
	};
	
  
})

.filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}])

.controller('ManageChapterCtrl',function($scope,$stateParams,ChapterFactory){
	$scope.currentLang = $stateParams.langId;
	$scope.chapter = $stateParams.chapter;
	
	if($scope.chapter){
		CKEDITOR.instances.desText.setData($scope.chapter.description);
	}
	
	$scope.submitChapter = function() {
		$scope.chapter.langId = $stateParams.langId;
		var text =CKEDITOR.instances.desText.getData();
		$scope.chapter.description = text;
		var chapter = $scope.chapter;
		console.log(chapter);
		
		/*if there is chapter, then update it, else add chapter*/
		if(chapter.id){
			ChapterFactory.updateChapter(chapter).success(function(response) {
				console.log(chapter);
				$scope.success = "Chapter updated succesfully!";
			}).error(function(response) {
				$scope.error = "There is error while updating chapter";
				console.log(response);
			});
		}else{
			ChapterFactory.saveChapter(chapter).success(function(response) {
				console.log(response);
				$scope.success = "Chapter added succesfully!";
			}).error(function(response) {
				$scope.error = "Chapter already exists!";
				console.log(response);
			});
		}		
	};
})

.factory('ChapterFactory',function ChapterFactory($http){
	var factory ={};
	
	factory.getAllChapters = function(langId) {
		return $http.get(langId+'/chapters').success(function(response) {
			factory.allChapters = response;
		});
	};
	
	factory.saveChapter = function(chapter) {
		return $http.post(chapter.langId+"/chapters/add",chapter);
	}
	
	factory.updateChapter = function(chapter) {
		return $http.put(chapter.langId+"/chapters/update",chapter);
	}
	
	factory.deleteChapter = function(chapter,currentLangId) {
		return $http.delete(currentLangId+"/chapters/delete/"+chapter.id).success(function(response) {
			console.log(response);
		});
	}
	return factory;
})
;
