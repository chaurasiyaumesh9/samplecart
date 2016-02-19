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
		})
		.when('/categories/:id', {
			templateUrl : 'pages/edit-category.html',
			controller: "categoriesCtrl"
		});

});

adminApp.controller('adminCtrl', function($scope){
	$scope.message = "Welcome to dashboard!"
});
adminApp.controller('productsCtrl', function($scope){
	$scope.message = "Manage Your Products";
});

adminApp.controller('categoriesCtrl', function($scope, $http, $routeParams){
	$scope.message = "Manage Categories";
	$scope.showDelete = false;
	$scope.deletionSuccess = false;
	$scope.updationSuccess = false;
	$scope.deleteCount = 0;
	var categoryId = -1;

	if ( $routeParams.id )
	{
		categoryId = $routeParams.id; // check if in edit mode
		//console.log('categoryId :',categoryId);
		getCategoryById( categoryId );
	}
	getAllCategories();

	function getAllCategories(){
		$http.get('/admin/categories').success( function( response ){
			$scope.categories = response;
		});
	}

	function getCategoryById( id ){
		$http.get('/admin/categories/' + id  ).success( function( response ){
			$scope.category = response;
		});
	}

	$scope.updateCategory = function( id ){
		$http.put('/admin/categories/' + id, $scope.category  ).success( function( response ){
			$scope.updationSuccess = true;
		});
	}

	$scope.addNewCategory = function(){
		console.log( $scope.category );
		$http.post('/admin/categories',$scope.category).success( function(response){
			$scope.success = true;
			$scope.category = {};
		});
	}

	$scope.deleteCategories = function(){
		var checked = getCheckedCategories();
		
		for ( var i=0; i<checked.length ;i++ )
		{ 
			$http.delete('/admin/categories/' + checked[i].id).success( function(response){
				getAllCategories();
				$scope.deleteCount++;
			});
		}
		$scope.deletionSuccess = true;
	}

	 $scope.checkAll = function () {
        angular.forEach($scope.categories, function (category) {
            category.selected = $scope.selectAll;
        });
		 toggleDeleteButton();
    };
	
	 $scope.checkIndividual = function ( category ) {
		 if ( getCheckedCategories().length < $scope.categories.length )
		 {
			$scope.selectAll = false;
		 }
		toggleDeleteButton();		
    };
	function toggleDeleteButton(){
		if ( getCheckedCategories().length >0 )
		 {
			$scope.showDelete = true;
		 }else{
			$scope.showDelete = false;
		 }
	}

	function getCheckedCategories(){
		var arr = [];
		for (var i=0; i<$scope.categories.length ;i++ )
		{
			if ( $scope.categories[i].selected )
			{
				arr.push( $scope.categories[i] );
			}	
		}
		return arr;
	}

});