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
	}]);