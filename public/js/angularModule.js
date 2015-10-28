var app = angular.module('Genesis',['ngRoute', 'ngCookies']);

	app.controller('indexController',function  ($scope, $http, $cookies) {
		
		$scope.session = function(){
			if($cookies.session != undefined){
				return true;
			}
			else{
				return false;
			}
		}
		$scope.name = $cookies.name;
		$scope.day = $cookies.day;
		$scope.month = $cookies.month;
		$scope.servicePlace = $cookies.servicePlace;
		$scope.biography = $cookies.biography;
	});

	app.controller('loginController', function ($scope, $http, $cookies){

		$scope.cookiesAttempUser = $cookies.attempUser;
		$scope.cookiesAttempPass = $cookies.attempPass;		

	});