angular.module( 'ngBoilerplate.chapterContent', [
  'ui.router',
  'placeholders',
  'ui.bootstrap',
  'ngSanitize',
  'ngFileUpload'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'chapterContent', {
	    url: '/:chapterId/chapterContent',
	    params:{languageId : null},
	    views: {
	      "main": {
	        controller: 'ChapterContentCtrl',
	        templateUrl: '/resources/back/src/app/chapterContent/chapterContent.tpl.html'
	      }
	    },
	    data:{ pageTitle: 'Tutorials' }
	  }).state('addChapterContent',{
	  url:'/:chapterId/add_chapterContent',
	  views : {
		  "main":{
			  controller : 'ManageChapterContentCtrl',
			  templateUrl : '/resources/back/src/app/chapterContent/manage-chapterContent.tpl.html'
		  }
	  },
	  data : {pageTitle : 'Add Chapter'}
  }).state('editChapterContent',{
	  url : '/:chapterId/edit_chapterContent',
	  params : {chapterContent : null},
	  views : {
		  "main" : {
			  controller : 'ManageChapterContentCtrl',
			  templateUrl : '/resources/back/src/app/chapterContent/manage-chapterContent.tpl.html'
		  }
	  },
	  data: {pageTitle : 'Edit Tutorial'}
  });
})

.controller( 'ChapterContentCtrl', function ChapterCtrl( $scope,ChapterContentFactory,$stateParams ) {
	$scope.chapterId = $stateParams.chapterId;
	$scope.langId = $stateParams.languageId;
	ChapterContentFactory.getAllChapterContents($scope.chapterId).then(function() {
		$scope.chapterContents = ChapterContentFactory.allChapterContents;
	});
	
	$scope.deleteChapterContent =  function(chapterContent,index) {
		$scope.deleteMsg = "";
		$("#deleteModal").modal("show");
		
		$scope.deleteChapterContentConfirm = function() {
			ChapterContentFactory.deleteChapterContent(chapterContent,$scope.chapterId).then(function(response) {
				$scope.deleteMsg = "Tutorial Deleted Successfully!";
				$scope.chapterContents.splice(index,1);
			});
		};			
	};
	
  
})
.controller('ManageChapterContentCtrl',function($scope,$stateParams,ChapterContentFactory,Upload){
	$scope.chapterContent = $stateParams.chapterContent;
	$scope.chapterId = $stateParams.chapterId;
	
	$scope.uploadFiles = function(file, errFiles) {
	      $scope.f = file;
	      $scope.errFile = errFiles && errFiles[0];
	     
	      if (file) {
	    	  console.log(JSON.stringify(file));
	          file.upload = Upload.upload({
	              url: $scope.chapterId+'/chapterContents/upload',
	              data: {file: file}
	          }).error(function(response) {
	        	  $scope.response = response;
	          });

	          file.upload.then(function (response) {
	              $timeout(function () {
	                  file.result = response.data;
	              });
	          }, function (response) {
	              if (response.status > 0)
	                  $scope.errorMsg = response.status + ': ' + response.data;
	          }, function (evt) {
	              file.progress = Math.min(100, parseInt(100.0 * 
	                                       evt.loaded / evt.total));
	          });
	      }   
	  }
	
	
	console.log($scope.chapterId);
	
	if($scope.chapterContent){
		CKEDITOR.instances.desText.setData($scope.chapterContent.description);
	}
	
	$scope.submitChapterContent = function() {
		var text =CKEDITOR.instances.desText.getData();
		$scope.chapterContent.description = text;
		$scope.chapterContent.chapterId = $scope.chapterId;
		var chapterContent = $scope.chapterContent;
		
		console.log(chapterContent);
		
		/*if there is chapter, then update it, else add chapter*/
		if(chapterContent.id){

			console.log("got here-->update");
			ChapterContentFactory.updateChapterContent(chapterContent).success(function(response) {
				$scope.success = "Chapter updated succesfully!";
			}).error(function(response) {
				$scope.error = "There is error while updating chapter";
				console.log(response);
			});
		}else{
			ChapterContentFactory.saveChapterContent(chapterContent).success(function(response) {
				console.log(response);
				$scope.success = "Tutorial added succesfully!";
			}).error(function(response) {
				$scope.error = "Tutorial already exists!";
				console.log(response);
			});
		}		
	};
})

.filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}])

.factory('ChapterContentFactory',function ChapterContentFactory($http){
	var factory ={};
	
	factory.getAllChapterContents = function(chapterId) {
		return $http.get(chapterId+"/chapterContents").success(function(response) {
			console.log(response);
			factory.allChapterContents = response;
		});
	};
	
	factory.saveChapterContent = function(chapterContent) {
		return $http.post(chapterContent.chapterId+"/chapterContents/add",chapterContent);
	}
	
	factory.updateChapterContent = function(chapterContent) {
		return $http.put(chapterContent.chapterId+"/chapterContents/update",chapterContent);
	}
	
	factory.deleteChapterContent = function(chapter,chapterId) {
		return $http.delete(chapterId+"/chapterContents/delete/"+chapter.id).success(function(response) {
			console.log(response);
		});
	}
	return factory;
})
;
