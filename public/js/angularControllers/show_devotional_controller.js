app.controller('showDevotionalsController', function ($scope,$http,$cookies){

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
