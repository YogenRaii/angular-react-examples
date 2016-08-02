angular.module( 'ngBoilerplate.language', [
  'ui.router',
  'placeholders',
  'ui.bootstrap',
  'ngFileUpload'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'languages', {
    url: '/languages',
    views: {
      "main": {
        controller: 'LanguageCtrl',
        templateUrl: '/resources/back/src/app/languages/language.tpl.html'
      }
    },
    data:{ pageTitle: "Languages" }
  });
})

.directive('fileModel', [ '$parse', function($parse) {
	return {
		restrict : 'A',
		link : function(scope, element, attrs) {
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;

			element.bind('change', function() {
				scope.$apply(function() {
					modelSetter(scope, element[0].files[0]);
				});
			});
		}
	};
} ])

.controller( 'LanguageCtrl', function LanguageCtrl( $scope,$state,LanguageFactory,Upload,$timeout ) {
  LanguageFactory.getAllLanguages().then(function() {
	$scope.languages = LanguageFactory.languages;
  });
  
  $scope.deleteLanguage = function(language,index){
	  $scope.deleteMsg = "";
	  $("#deleteModal").modal("show");
	  
	  $scope.deleteLanguageConfirm = function confirm() {
		  LanguageFactory.deleteLanguage(language).then(function deleteSuccess() {
			  $scope.deleteMsg = "Language Deleted!";
			  $scope.languages.splice(index,1);
		  });
	  };	  
  };
  
  $scope.editLanguage = function edit(language) {
	  $scope.language =language;
  };
  
  $scope.submitClick = function() {
	  var language = $scope.language.name;
	  var file = $scope.myFile;
	  console.log('file is '+JSON.stringify(file));
	  var langId = $scope.language.id;
	  if(! langId){
		  langId = 0;
	  }
	  var file = $scope.f;
	  if (file) {
          LanguageFactory.addLanguage(language,file,langId).success(function(response) {
        	  $scope.languages.push({name: response.name,id:response.id});
              $scope.added = "Added Successfully.";	
              $scope.existsMsg ="";
              $scope.errFile = {};
              $state.go('languages');
          }).error(function(response) {
        	  console.log(response);
        	  $scope.added = "";
        	  $scope.existsMsg = "Language Already Exists!!";
          });
      }else{
    	  LanguageFactory.updateLanguage(language).then(function(data) {
    		  $scope.added = "Updated Successfully!";
    	  });
      }   
	  
  };

  $scope.uploadFiles = function(file, errFiles) {
      $scope.f = file;
      $scope.errFile = errFiles && errFiles[0];
      $scope.added ="";
      $scope.existsMsg ="";
      /*if (file) {
          file.upload = Upload.upload({
              url: 'languages/upload',
              data: {file: file}
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
      }   */
  }
})


.factory('LanguageFactory',function LanguageFactory($http){
	var factory ={};
	factory.getAllLanguages = function() {
		return $http.get('languages').success(function(data) {
			factory.languages = data;
		});
	};
	
	factory.addLanguage = function(language,file,langId) {
		var fd = new FormData();
        fd.append('file', file);
        fd.append('name',language);
        fd.append('id',langId);
        console.log(fd);
        return $http.post('languages/add',fd,{
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        });
	};
	
	factory.deleteLanguage = function(language) {
		return $http.delete('languages/delete/'+language.id).success(function(data) {
			console.log(data);
		});
	};
	
	factory.updateLanguage = function(language) {
		console.log(language);
		return $http.put('languages/update',language).success(function(data) {
			factory.updatedLanguage = data;
		});
	};
	return factory;
})
;
