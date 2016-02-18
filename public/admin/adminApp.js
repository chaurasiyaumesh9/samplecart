var adminApp = angular.module('sampleCartAdmin', ['ngRoute']);

adminApp.config(function($routeProvider, $locationProvider) {
	$routeProvider

		// route for the home page
		.when('/', {
			templateUrl : 'pages/dashboard.html'
		})
		.when('/products', {
			templateUrl : 'pages/products.html',
			controller: "productsCtrl"
		})
		.when('/categories', {
			templateUrl : 'pages/categories.html',
			controller: "categoriesCtrl"
		})
		.when('/categories/add-new', {
			templateUrl : 'pages/add-new-category.html',
			controller: "categoriesCtrl"
		});

});

adminApp.controller('adminCtrl', function($scope){
	$scope.message = "Welcome to dashboard!"
});
adminApp.controller('productsCtrl', function($scope){
	$scope.message = "Manage Your Products";
});

adminApp.controller('categoriesCtrl', function($scope, $http){
	$scope.message = "Manage Categories";
	$scope.showDelete = false;
	loadRemoteData();

	function loadRemoteData(){
		$http.get('/admin/categories').success( function( response ){
			$scope.categories = response;
		});
	}

	$scope.addNewCategory = function(){
		$http.post('/admin/categories',$scope.category).success( function(response){
			$scope.success = true;
			$scope.category = {};
		});
	}

	 $scope.checkAll = function () {
        angular.forEach($scope.categories, function (category) {
            category.selected = $scope.selectAll;
        });
		$scope.toggleDelete();
    };
	

	$scope.toggleDelete = function(){
		for ( var i=0; i< $scope.categories.length; i++ )
		{
			if ( $scope.categories[i].selected )
			{
				$scope.showDelete = true;
				break;
			}
		}
		
	}
	 $scope.checkIndividual = function ( category ) {
		 if ( !category.selected )
		 {
			$scope.selectAll = false;
		 }
		 $scope.toggleDelete();
    };

	

});