var app = angular.module('Genesis',['ngRoute', 'ngCookies','angular-uuid']);

	
	
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
	    this.uploadFileToUrl = function(file,id,name,text,img,video,audio, uploadUrl,posts){
	        var fd = new FormData();
	        fd.append('file', file);
	        fd.append('id',id);
	        fd.append('name',name)
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
	        .success(function(data, status, headers, config){

	        	posts.unshift(data);

	        })
	        .error(function(){
	        });
	    }
	}]);
	
	app.controller('indexController',function  ($scope, $http, $cookies, fileUpload, uuid) {
		
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

		if ($cookies.session == undefined) {
			if ($cookies.temporalSession == undefined) {
				$cookies.temporalSession = uuid.v4();
			};
		}
		console.log($cookies.temporalSession);

		$scope.posts = [];


		$http.get('/posts').success(function (data, status, headers, config){
			
			$scope.posts = data;

		})
		.error(function (){
			alert('AJAX posts erros');
		})

		$scope.showLikeTooltip = function (button_id){

			var tooltip = angular.element(document.querySelector('#like'+button_id));
		    tooltip.tooltip('show');
			
		}

		$scope.showPrayTooltip = function (button_id){

			var tooltip = angular.element(document.querySelector('#pray'+button_id));
		    tooltip.tooltip('show');
			
		}

		    

		$scope.like = function (postId){

			
			if ($cookies.session){

				var userId = $cookies.session;
				$http.post('/post/like',{userId:userId,postId:postId}).success(function (data, status, headers, config){
	
					var likeModal = angular.element(document.querySelector('#likeModal'));
					likeModal.modal('show');

					var likeButton = angular.element(document.querySelector('#like'+postId));
					likeButton.addClass('active-like-pray');
				})
				.error(function (){
					alert('AJAX error in post like');
				})

			}

			if ($cookies.temporalSession){

				var userId = $cookies.temporalSession;
				$http.post('/post/like',{userId:userId,postId:postId}).success(function (data, status, headers, config){
	
					var likeModal = angular.element(document.querySelector('#likeModal'));
					likeModal.modal('show');

					var likeButton = angular.element(document.querySelector('#like'+postId));
					likeButton.addClass('active-like-pray');

				})
				.error(function (){
					alert('AJAX error in post like');
				})

			}

		}

		$scope.pray4You = function (postId){

			
			if ($cookies.session){

				var userId = $cookies.session;
				$http.post('/post/pray',{userId:userId,postId:postId}).success(function (data, status, headers, config){
	
					var prayModal = angular.element(document.querySelector('#prayModal'));
					prayModal.modal('show');

					var prayButton = angular.element(document.querySelector('#pray'+postId));
					prayButton.addClass('active-like-pray');
				})
				.error(function (){
					alert('AJAX error in post like');
				})

			}

			if ($cookies.temporalSession){

				var userId = $cookies.temporalSession;
				$http.post('/post/pray',{userId:userId,postId:postId}).success(function (data, status, headers, config){
	
					var prayModal = angular.element(document.querySelector('#prayModal'));
					prayModal.modal('show');

					var prayButton = angular.element(document.querySelector('#pray'+postId));
					prayButton.addClass('active-like-pray');

				})
				.error(function (){
					alert('AJAX error in post like');
				})

			}

		}

		$scope.post = function (){

			if($scope.postText == '' && $scope.myFile == undefined){

			}
			else{

				if ($scope.myFile != undefined){

					var file = $scope.myFile;
					var uploadUrl = '/posts';
					var NewPost = fileUpload.uploadFileToUrl(file,$scope.id, $scope.name,$scope.postText, true,false,false ,uploadUrl,$scope.posts);

						$scope.postText = '';
						$scope.myFile = undefined;
						
						var postModal = angular.element(document.querySelector('#postModal'));
						postModal.modal('hide');

					

				}else{

					var file = $scope.myFile;
					var uploadUrl = '/posts';
					var NewPost = fileUpload.uploadFileToUrl(file,$scope.id,$scope.name, $scope.postText, false,false,false ,uploadUrl,$scope.posts);
						$scope.postText = '';
						$scope.myFile = undefined;

												
						var postModal = angular.element(document.querySelector('#postModal'));
						postModal.modal('hide');

					
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

			success(function (data, status, headers, config) {
				 $scope.missionaries = data;
				 
		 	}).
			error(function (data, status, headers, config) {
				      // log error
			});

	});

	app.controller('loginController', function ($scope, $http, $cookies){

		$scope.cookiesAttempUser = $cookies.attempUser;
		$scope.cookiesAttempPass = $cookies.attempPass;		

	});