app.controller('userPlaceController', function ($scope,$http,$cookies){

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