angular.module( 'ngBoilerplate.writer', [
  'ui.router',
  'ngBoilerplate.language',
  'placeholders',
  'ui.bootstrap',
  'ngFileUpload'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'writers', {
    url: '/writers',
    views: {
      "main": {
        controller: 'WriterCtrl',
        templateUrl: '/resources/back/src/app/content-writer/content-writer.tpl.html'
      }
    },
    data:{ pageTitle: "Writers" }
  }).state('addWriter',{
	  url:'/add_writer',
	  views:{
		  "main":{
			  controller:'ManageWriterCtrl',
			  templateUrl : '/resources/back/src/app/content-writer/manage-writer.tpl.html'
		  }		  
	  },
	  data:{pageTitle : "Add Writer"}
  }).state('editWriter',{
	  url:'/edit_writer/',
	  params:{writer:null},
	  views:{
		  "main":{
			  controller:'ManageWriterCtrl',
			  templateUrl : '/resources/back/src/app/content-writer/manage-writer.tpl.html'
		  }		  
	  },
	  data:{pageTitle : "Edit Writer"}
  });
})

.controller( 'WriterCtrl', function LanguageCtrl( $scope,$state,WriterFactory) {
	WriterFactory.getAllWriters().then(function() {
		$scope.writers = WriterFactory.writers;
	});
  
  $scope.deleteWriter = function(writer,index){
	  $scope.deleteMsg = "";
	  $("#deleteModal").modal("show");
	  
	  $scope.deleteWriterConfirm = function confirm() {
		  WriterFactory.deleteWriter(writer).then(function deleteSuccess() {
			  $scope.deleteMsg = "Writer Deleted!";
			  $scope.writers.splice(index,1);
		  });
	  };	  
  };
 
})

.controller('ManageWriterCtrl',function($scope,$stateParams,WriterFactory,LanguageFactory){
	console.log($stateParams.writer);
	$scope.writer = $stateParams.writer;
	LanguageFactory.getAllLanguages().then(function() {
		$scope.languages = LanguageFactory.languages;
	  });
	
	  $scope.submitClick = function() {
		  var writer = $scope.writer;
		  
		  if(writer.id){
			  console.log("update");
			  WriterFactory.updateWriter(writer).success(function(response) {
					console.log("success");
					$scope.success = "User updated successfully!";
			  }).error(function(response) {
					$scope.errors = response.errors;
			  });
		  }else{
			  console.log("add");
			  WriterFactory.addWriter(writer).success(function(response) {
					console.log("success");
					$scope.success = "User added successfully!";
			  }).error(function(response) {
					console.log(response);
			  });
		  }
	  };
})


.factory('WriterFactory',function WriterFactory($http){
	var factory ={};
	factory.getAllWriters = function() {
		return $http.get('users').success(function(data) {
			factory.writers = data;
		});
	};
	
	factory.deleteWriter = function(writer) {
		return $http.delete('users/delete/'+writer.id).success(function(data) {
			console.log(data);
		});
	};
	
	factory.updateWriter = function(writer) {
		return $http.put('users/update',writer);
	};
	
	factory.addWriter = function(writer) {
		return $http.post('users/add',writer).success(function(response) {
			factory.addedUser = response;
		});
	}
	return factory;
})
;
