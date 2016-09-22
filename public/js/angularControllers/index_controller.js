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
	});