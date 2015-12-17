var app = angular.module('Genesis',['ngRoute', 'ngCookies']);
	
	app.directive('fileModel', ['$parse', function ($parse) {
	   	 return {
	        restrict: 'A',
	        link: function(scope, element, attrs) {
	            var model = $parse(attrs.fileModel);
	            var modelSetter = model.assign;
	            
	            element.bind('change', function(){
	                scope.$apply(function(){
	                    modelSetter(scope, element[0].files[0]);
	                });
	            });
	        }
	    };
	}]);

	app.service('fileUpload', ['$http', function ($http) {
	    this.uploadFileToUrl = function(file,id,text,img,video,audio, uploadUrl){
	        var fd = new FormData();
	        fd.append('file', file);
	        fd.append('id',id);
	        fd.append('body',text);
	        fd.append('img',img);
	        fd.append('video',video);
	        fd.append('audio',audio);

	        var date = new Date();
	        fd.append('date',date);

	        $http.post(uploadUrl, fd, {
	            transformRequest: angular.identity,
	            headers: {'Content-Type': undefined}
	        })
	        .success(function(){


	        })
	        .error(function(){
	        });
	    }
	}]);
	
	app.controller('indexController',function  ($scope, $http, $cookies, fileUpload) {
		
		$scope.session = function(){
			if($cookies.session != undefined){
				return true;
			}
			else{
				return false;
			}
		}
		$scope.id = decodeURIComponent($cookies.id);
		$scope.name = decodeURIComponent($cookies.name);
		$scope.day = decodeURIComponent($cookies.day);
		$scope.month = decodeURIComponent($cookies.month);
		$scope.servicePlace = decodeURIComponent($cookies.servicePlace);
		$scope.biography = decodeURIComponent($cookies.biography);

		$scope.animation = false;

		$scope.post = function (){

			if($scope.postText == '' && $scope.myFile == undefined){

			}
			else{

				if ($scope.myFile != undefined){

					var file = $scope.myFile;
					var uploadUrl = '/posts';
					fileUpload.uploadFileToUrl(file,$scope.id, $scope.postText, true,false,false ,uploadUrl);

						$scope.postText = '';
						$scope.myFile = null;
						
						var d = document.getElementById("myModal");
						d.className = d.className + "bounceOut";

					

				}else{

					var file = $scope.myFile;
					var uploadUrl = '/posts';
					fileUpload.uploadFileToUrl(file,$scope.id, $scope.postText, false,false,false ,uploadUrl);

						$scope.postText = '';
						$scope.myFile = null;
												
						var d = document.getElementById("myModal");
						d.className = d.className + "bounceOut";

					
				}
			}

		}
	});

	app.controller('addUserController',function  ($scope, $http, $cookies) {
		
		$scope.session = function(){
			if($cookies.session != undefined){
				return true;
			}
			else{
				return false;
			}
		}
		$scope.id = decodeURIComponent($cookies.id);
		$scope.name = decodeURIComponent($cookies.name);
		$scope.day = decodeURIComponent($cookies.day);
		$scope.month = decodeURIComponent($cookies.month);
		$scope.servicePlace = decodeURIComponent($cookies.servicePlace);
		$scope.biography = decodeURIComponent($cookies.biography);

	});

	app.controller('showUserController',function  ($scope, $http, $cookies) {
		
		$scope.session = function(){
			if($cookies.session != undefined){
				return true;
			}
			else{
				return false;
			}
		}
		$scope.id = decodeURIComponent($cookies.id);
		$scope.name = decodeURIComponent($cookies.name);
		$scope.day = decodeURIComponent($cookies.day);
		$scope.month = decodeURIComponent($cookies.month);
		$scope.servicePlace = decodeURIComponent($cookies.servicePlace);
		$scope.biography = decodeURIComponent($cookies.biography);

		$http.get('/user').

			success(function(data, status, headers, config) {
				 $scope.missionaries = data;
				 
		 	}).
			error(function(data, status, headers, config) {
				      // log error
			});

	});

	app.controller('loginController', function ($scope, $http, $cookies){

		$scope.cookiesAttempUser = $cookies.attempUser;
		$scope.cookiesAttempPass = $cookies.attempPass;		

	});