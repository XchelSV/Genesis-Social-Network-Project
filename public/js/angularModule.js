var app = angular.module('Genesis',['ngRoute', 'ngCookies']);

	app.controller('indexController',function  ($scope, $http, $cookies) {
		


	});

	app.controller('loginController', function ($scope, $http, $cookies){

		$scope.cookiesAttempUser = $cookies.attempUser;
		$scope.cookiesAttempPass = $cookies.attempPass;		

	});