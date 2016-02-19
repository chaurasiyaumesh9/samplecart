var adminApp = angular.module('sampleCartApp', ['ngRoute']);

adminApp.config(function($routeProvider, $locationProvider) {
	$routeProvider

		// route for the home page
		.when('/', {
			templateUrl : 'pages/dashboard.html',
			controller:'sampleCartAppCtrl'
		});

});

adminApp.controller('sampleCartAppCtrl', function($scope, $http){
	
	loadRemoteData();

	function loadRemoteData(){
		$http.get('/categories').success( function( response ){
			$scope.categories = response;
		});
	}

});