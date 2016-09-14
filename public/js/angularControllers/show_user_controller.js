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


	});