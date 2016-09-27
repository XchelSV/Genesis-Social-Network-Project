var app = angular.module('Genesis',['ngRoute', 'ngCookies','angular-uuid','LocalStorageModule','angularMoment','angular-loading-bar','cfp.loadingBarInterceptor']);

	app.config(function (localStorageServiceProvider) {
	  localStorageServiceProvider
	    .setPrefix('Genesis')
	    .setStorageType('localStorage')
	    .setNotify(true, true)
	});

	app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
	    
	    cfpLoadingBarProvider.includeSpinner = true;
	    cfpLoadingBarProvider.includeBar = true;
	    cfpLoadingBarProvider.latencyThreshold = 50;

	 
	 }])
	
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

	app.directive('onFinishRender', function ($timeout) {
	    return {
	        restrict: 'A',
	        link: function (scope, element, attr) {
	            if (scope.$last === true) {
	                $timeout(function () {
	                    scope.$emit(attr.onFinishRender);
	                });
	            }
	        }
	    }
	});

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
	}]);app.controller('addUserController',function  ($scope, $http, $cookies) {
		
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

		$http.get('/place').

			success(function (data, status, headers, config) {
				 $scope.places = data;
				 
		 	}).
			error(function (data, status, headers, config) {
				      // log error
			});

	});

	app.controller('devotionalsController', function ($scope,$http,$cookies){

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

	});app.controller('editUserController',function  ($scope, $http, $cookies) {
		
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

	app.controller('indexController',function  ($scope, $http, $cookies, fileUpload, uuid, localStorageService) {
		
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
		

		$scope.posts = [];
		$scope.numberOfPosts;


		$http.get('/posts').success(function (data, status, headers, config){
			
			$scope.posts = data;
			$scope.numberOfPosts = data.length;

			for (var i = 0; i < data.length; i++) {
			 	for (var j = 0; j < data[i].like.length; j++) {
			 		if ($cookies.session) {
			 			if($cookies.session == data[i].like[j]){
			 				localStorageService.set('like'+data[i]._id,true);
			 			}
			 		}
			 		else{
			 			if($cookies.temporalSession == data[i].like[j]){
			 				localStorageService.set('like'+data[i]._id,true);
			 			}
			 		}
			 	};

			 	for (var k = 0; k < data[i].pray4You.length; k++) {
			 		if ($cookies.session) {
			 			
			 			if($cookies.session == data[i].pray4You[k]){
			 				localStorageService.set('pray'+data[i]._id,true);
			 			}
			 		}
			 		else{
			 			
			 			if($cookies.temporalSession == data[i].pray4You[k]){
			 				localStorageService.set('pray'+data[i]._id,true);
			 			}
			 		}
			 	};
			};

		})
		.error(function (){
			alert('AJAX posts erros');
		})

		$scope.morePosts = function (){


			$http.get('/posts/'+$scope.numberOfPosts).success(function (data, status, headers, config){
			
			if(data.length != 0) {

				for (var l=0; l < data.length; l++) {
						
					$scope.posts.push(data[l]);

				};
				

				for (var i = 0; i < data.length; i++) {
				 	for (var j = 0; j < data[i].like.length; j++) {
				 		if ($cookies.session) {
				 			if($cookies.session == data[i].like[j]){
				 				localStorageService.set('like'+data[i]._id,true);
				 			}
				 		}
				 		else{
				 			if($cookies.temporalSession == data[i].like[j]){
				 				localStorageService.set('like'+data[i]._id,true);
				 			}
				 		}
				 	};

				 	for (var k = 0; k < data[i].pray4You.length; k++) {
				 		if ($cookies.session) {
				 			
				 			if($cookies.session == data[i].pray4You[k]){
				 				localStorageService.set('pray'+data[i]._id,true);
				 			}
				 		}
				 		else{
				 			
				 			if($cookies.temporalSession == data[i].pray4You[k]){
				 				localStorageService.set('pray'+data[i]._id,true);
				 			}
				 		}
				 	};
				};

				$scope.numberOfPosts = $scope.numberOfPosts+data.length;

				}

			})
			.error(function (){
				alert('AJAX more posts error');
			})	


		}	

		$scope.accessToPost = function (user_id){

			
			if($cookies.session != undefined){
				if($cookies.id == user_id){
					return true;
				}
				else{
					return false;
				}
			}
			else{
				return false;
			}

		}

		$scope.showPostDetails = function (id){

			$http.get('/post/'+id).success(function (data, status, headers, config){
					
					$scope.postDetails = data;
					
				})
				.error(function (){
					alert('AJAX error in details Post');
					
				})

		}

		$scope.deletePost = function (id,img){

			$http.delete('/post/'+img+'/'+id).success(function (data, status, headers, config){
					
					var postDeleted = angular.element(document.querySelector('#post'+id));
					postDeleted.removeClass('animated fadeIn');
					postDeleted.addClass('animated fadeOut');
					

					var deleteModal = angular.element(document.querySelector('#deleteModal'));
					deleteModal.modal('hide');
					
				})
				.error(function (){
					alert('AJAX error in details Post');
					
				})

		}

		$scope.showLikeTooltip = function (button_id){

			var tooltip = angular.element(document.querySelector('#like'+button_id));
		    tooltip.tooltip('show');
			
		}

		$scope.showPrayTooltip = function (button_id){

			var tooltip = angular.element(document.querySelector('#pray'+button_id));
		    tooltip.tooltip('show');
			
		}

		$scope.clearStorage = function (){
			localStorageService.clearAll();
		}

		$scope.getLikeButtonStatus = function (postId){

			return localStorageService.get('like'+postId);

		}

		$scope.getPrayButtonStatus = function (postId){

			return localStorageService.get('pray'+postId);

		}

		$scope.like = function (postId){

			
			if ($cookies.session){

				var userId = $cookies.session;
				$http.post('/post/like',{userId:userId,postId:postId}).success(function (data, status, headers, config){
					
					if (status == 200){
						var likeModal = angular.element(document.querySelector('#likeModal'));
						likeModal.modal('show');

						var likeButton = angular.element(document.querySelector('#like'+postId));
						
						localStorageService.set('like'+postId,true);
					}

					if (status == 202){
						localStorageService.set('like'+postId,false);
					}
					
				})
				.error(function (){
					alert('AJAX error in post like');
					
				})

			}

			if ($cookies.temporalSession){

				var userId = $cookies.temporalSession;
				$http.post('/post/like',{userId:userId,postId:postId}).success(function (data, status, headers, config){
					
					if (status == 200){
						var likeModal = angular.element(document.querySelector('#likeModal'));
						likeModal.modal('show');

						var likeButton = angular.element(document.querySelector('#like'+postId));
						localStorageService.set('like'+postId,true);
					}
					if (status == 202){
						localStorageService.set('like'+postId,false);
					}

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
					
					if (status == 200){
						var prayModal = angular.element(document.querySelector('#prayModal'));
						prayModal.modal('show');

						var prayButton = angular.element(document.querySelector('#pray'+postId));
						localStorageService.set('pray'+postId,true);
					}
					if (status == 202){
						localStorageService.set('pray'+postId,false);	
					}

				})
				.error(function (){
					alert('AJAX error in post like');
				})

			}

			if ($cookies.temporalSession){

				var userId = $cookies.temporalSession;
				$http.post('/post/pray',{userId:userId,postId:postId}).success(function (data, status, headers, config){
					
					if (status == 200){
						var prayModal = angular.element(document.querySelector('#prayModal'));
						prayModal.modal('show');

						var prayButton = angular.element(document.querySelector('#pray'+postId));
						localStorageService.set('pray'+postId,true);
					}
					if (status == 202){
						localStorageService.set('pray'+postId,false);		
					}

				})
				.error(function (){
					alert('AJAX error in post like');
				})

			}

		}

		$('#image-cropper').cropit({
		  imageBackground: true,
		  imageBackgroundBorderWidth: 15 // Width of background border
		});
		$('.download-btn').click(function() {
		  var imageData = $('#image-cropper').cropit('export');
		  window.open(imageData);
		});

		$scope.crop_div = false;
		$scope.show_img = function(){

				$scope.myFile = undefined;
				$scope.crop_div = true;
				//console.log($('#image-cropper').cropit('export'));

		}

		$scope.reset_img = function (){

			$scope.myFile = undefined;
			$scope.crop_div = false;

		}


		$scope.post = function (){


			var validate_img = $('#image-cropper').cropit('export');
			if($scope.postText == undefined && (validate_img == undefined || $scope.crop_div == false)){

			}
			else{

				if($scope.postText == undefined){
					$scope.postText = '';
				}

				if (validate_img != undefined && $scope.crop_div == true){

					var date = new Date();
					var file = $('#image-cropper').cropit('export');
					//var uploadUrl = '/posts';
					//var NewPost = fileUpload.uploadFileToUrl(file,$scope.id, $scope.name,$scope.postText, true,false,false ,uploadUrl,$scope.posts);

					var post = {file:file,id:$scope.id, name:$scope.name, body:$scope.postText, img:true, video:false, audio:false, date: date}
					$http.post('/posts',post).success(function (data, status, headers, config){
					
						
						var postModal = angular.element(document.querySelector('#postModal'));
						postModal.modal('hide');

						$scope.postText = '';
						$scope.myFile = undefined;
						$scope.crop_div = false;
						$scope.posts.unshift(data);

						$scope.numberOfPosts++;

					})
					.error(function (){
						alert('AJAX error in post');
					})


					

				}else{

					var date = new Date();
					var file = undefined;
					//var uploadUrl = '/posts';
					//var NewPost = fileUpload.uploadFileToUrl(file,$scope.id,$scope.name, $scope.postText, false,false,false ,uploadUrl,$scope.posts);

					var post = {file:file,id:$scope.id, name:$scope.name, body:$scope.postText, img:false, video:false, audio:false, date: date}
					$http.post('/posts',post).success(function (data, status, headers, config){
												
						var postModal = angular.element(document.querySelector('#postModal'));
						postModal.modal('hide');

						$scope.postText = '';
						$scope.myFile = undefined;
						$scope.crop_div = false;
						$scope.posts.unshift(data);

						$scope.numberOfPosts++;

					})
					.error(function (){
						alert('AJAX error in post');
					})

				}
			}

		}
	});app.controller('loginController', function ($scope, $http, $cookies){

		$scope.cookiesAttempUser = $cookies.attempUser;
		$scope.cookiesAttempPass = $cookies.attempPass;		

	});app.controller('showDevotionalsController', function ($scope,$http,$cookies){

		$scope.session = function(){
			if($cookies.session != undefined){
				return true;
			}
			else{
				return false;
			}
		}
		$scope.sessionType = function(){
			if($scope.userType == 'true'){
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
		$scope.userType = decodeURIComponent($cookies.type);


		$http.get('/devotional').

			success(function (data, status, headers, config) {
				 $scope.devotionals = data;
				 
		 	}).
			error(function (data, status, headers, config) {
				      // log error
			});

		$scope.showDevotionalDetails = function (id){

			$http.get('/devotional/'+id).

			success(function (data, status, headers, config) {
				 $scope.devotionalDetails = data;
				 
		 	}).
			error(function (data, status, headers, config) {
				      // log error
			});

		}

		$scope.deleteDevotional = function (id,img,audio,video){

			$http.delete('/devotional/'+id+'/'+img+'/'+audio+'/'+video).success(function (data, status, headers, config){
					
					var devotionalDeleted = angular.element(document.querySelector('#devotional'+id));
					devotionalDeleted.removeClass('animated fadeIn');
					devotionalDeleted.addClass('animated fadeOut');
					

					var deleteModal = angular.element(document.querySelector('#deleteModal'));
					deleteModal.modal('hide');
					
				})
				.error(function (){
					alert('AJAX error in details devotional');
					
				})

		}



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
		$scope.sessionType = function(){
			if($scope.userType == 'true'){
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
		$scope.userType = decodeURIComponent($cookies.type);

		/*$http.get('/user').

			success(function (data, status, headers, config) {
				 $scope.missionaries = data;
				 
		 	}).
			error(function (data, status, headers, config) {
				      // log error
			});*/

		$scope.place_choosen = function(place_id){

			$scope.place_id_selected = place_id;
			console.log($scope.place_id_selected)

		}

		$scope.delete_place = function(){
			
			$http.delete('/place/'+$scope.place_id_selected).

				success(function (data, status, headers, config) {
					 
					 window.location.reload();

					 
			 	}).
				error(function (data, status, headers, config) {
					      alert('Error, Place cant be deleted')
				});

		}

		$http.get('/place').

			success(function (data, status, headers, config) {
				 $scope.places = data;
				 
		 	}).
			error(function (data, status, headers, config) {
				      // log error
			});


	});app.controller('userPlaceController', function ($scope,$http,$cookies){

		$scope.session = function(){
			if($cookies.session != undefined){
				return true;
			}
			else{
				return false;
			}
		}
	
		$scope.admin_session = function(){
			if($cookies.type === 'true'){
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
		

		$scope.showDetails = function (id){

			$http.get('/user/'+id).

				success(function (data, status, headers, config) {
					 $scope.userDetails = data;
					 var userDate = new Date(data.birthday);
					 $scope.userMonth = userDate.getMonth()+1;
					 $scope.userDay = userDate.getDate()+1;

					 
			 	}).
				error(function (data, status, headers, config) {
					      // log error
				});

		}

		$scope.deleteUser = function(){

			$http.delete('/user/'+$scope.userDetails._id).

				success(function (data, status, headers, config) {
					 
					 window.location.reload();

					 
			 	}).
				error(function (data, status, headers, config) {
					  alert('Error, User cant be deleted')
				});

		}

		var pathname = window.location.pathname.split('/');
		$http.get('/users/place/'+pathname[3]).

			success(function (data, status, headers, config) {
				 $scope.missionaries = data;
				 
		 	}).
			error(function (data, status, headers, config) {
				      // log error
			});


	});