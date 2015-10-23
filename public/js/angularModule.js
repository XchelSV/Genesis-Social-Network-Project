var app = angular.module('Genesis',['ngRoute', 'ngCookies']);

	app.controller('indexController',function  ($scope, $http, $cookies) {
		
		$scope.name = $cookies.name;
		$scope.day = $cookies.day;
		$scope.month = $cookies.month;
		$scope.servicePlace = $cookies.servicePlace;
		$scope.biography = $cookies.biography;
		


	});