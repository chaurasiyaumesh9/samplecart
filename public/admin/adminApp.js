// configure dropdown for string/boolean & 0-1


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
		.when('/products/add-new', {
			templateUrl : 'pages/add-new-product.html',
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
	$scope.message = "Welcome to dashboard!"; //just to check if controller is working fine..print the message!
});
adminApp.controller('productsCtrl', function($scope, productService, categoryService){
	$scope.message = "Manage Your Products";
	$scope.addSuccess = false;
	$scope.loadDefaults = function(){
		getAllCategories();
		$scope.product = {enabled:false};
	}

	$scope.addNewProduct = function( product ){		
		product.category_ids = JSON.stringify( getSelectedCategories() ); //gettting only chosen categories by splicing the un-selected.
		//console.log( product );
		productService.addNewProduct( product ).then( function( response ){
			$scope.addSuccess = true;
			$scope.loadDefaults();
		}, function( errorMessage ){
			console.warn( errorMessage );
		});
	}
	

	function getSelectedCategories(){
		var arr = [];
		for ( var i=0; i< $scope.categories.length ;i++ )
		{
			if ( $scope.categories[i].selected )
			{
				arr.push( $scope.categories[i].id );
			}
		}
		return arr;
	}

	getProductList();

	function getProductList(){
		productService.getProductList().then( function( response ){
			$scope.productList = response;
		}, function( errorMessage ){
			console.warn( errorMessage );
		});
	}

	function getAllCategories(){
		categoryService.getAllCategories().then( function( response ){
			$scope.categories = response;
		}, function( errorMessage ){
			console.warn( errorMessage );
		});
	}
});

adminApp.service('productService', function($http, $q){
	
	return({
		getProductList: getProductList,
		addNewProduct: addNewProduct
	});

	function getProductList(){
		var request = $http({
            method: "get",
            url: "/admin/products",
            params: {
                action: "get"
            }
        });
        return( request.then( handleSuccess, handleError ) );
	}

	function addNewProduct( product ){
		var request = $http({
            method: "post",
            url: "/admin/products",
            params: {
                action: "add"
            },
            data: {
                product: product
            }
        });
        return( request.then( handleSuccess, handleError ) );
	}

	function handleError( response ) {
        if ( ! angular.isObject( response.data ) || ! response.data.message ) {
            return( $q.reject( "An unknown error occurred." ) );
        }
        // Otherwise, use expected error message.
        return( $q.reject( response.data.message ) );
    }
    function handleSuccess( response ) {
	    return( response.data );
	}
});

adminApp.controller('categoriesCtrl', function($scope, $http, $routeParams, categoryService ){
	$scope.message = "Manage Categories";
	
	$scope.showDelete = false;
	$scope.deletionSuccess = false;
	$scope.updationSuccess = false;
	$scope.deleteCount = 0;
	var categoryId = -1;

	if ( $routeParams.id )
	{
		categoryId = $routeParams.id; // check if in edit mode
		categoryService.getCategoryById( categoryId ).then( function( response ){
			$scope.category = response;
		} , function(errorMessage ){ 
			console.warn( errorMessage );
		});
	}
	$scope.loadDefaults = function(){
		$scope.category = {active:false};
	}
	getAllCategories();

	function getAllCategories(){
		categoryService.getAllCategories().then( function( response ){
			$scope.categories = response;
		}, function( errorMessage ){
			console.warn( errorMessage );
		});
	}

	$scope.updateCategory = function( category ){
		categoryService.updateCategory( category ).then( function( response ){
			$scope.updationSuccess = true;
		}, function( errorMessage ){
			console.warn( errorMessage );
		});
	}

	$scope.addNewCategory = function( category ){
		categoryService.addNewCategory( category ).then( function( response ){
			$scope.success = true;
			$scope.category = {};
		}, function( errorMessage ){
			console.warn( errorMessage );
		});
	}

	$scope.deleteCategories = function(){
		var checked = getCheckedCategories();
		
		for ( var i=0; i<checked.length ;i++ )
		{ 
			categoryService.deleteCategory( checked[i].id ).then( function( response ){
				getAllCategories();
				$scope.deleteCount++;
			}, function( errorMessage ){
				console.warn( errorMessage );
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

adminApp.service("categoryService", function($http, $q){
	return({
        addNewCategory: addNewCategory, //done
        getAllCategories: getAllCategories, //done
		getCategoryById: getCategoryById, //done
        deleteCategory: deleteCategory, //done
		updateCategory: updateCategory //done
    });

	function addNewCategory( category ){
		var request = $http({
            method: "post",
            url: "/admin/categories",
            params: {
                action: "add"
            },
            data: {
                category: category
            }
        });
        return( request.then( handleSuccess, handleError ) );
	}

	function getAllCategories() {
        var request = $http({
            method: "get",
            url: "/admin/categories",
            params: {
                action: "get"
            }
        });
        return( request.then( handleSuccess, handleError ) );
    }
	function getCategoryById( id ) {
        var request = $http({
            method: "get",
            url: "/admin/categories/" + id,
            params: {
                action: "get"
            },
            data: {
                id: id
            }
        });
        return( request.then( handleSuccess, handleError ) );
    }
    function deleteCategory( id ) {
        var request = $http({
            method: "delete",
            url: "/admin/categories/" + id,
            params: {
                action: "delete"
            },
            data: {
                id: id
            }
        });
        return( request.then( handleSuccess, handleError ) );
    }
	 function updateCategory( category ) {
        var request = $http({
            method: "put",
            url: "/admin/categories/" + category.id,
            params: {
                action: "update"
            },
            data: {
                category: category
            }
        });
        return( request.then( handleSuccess, handleError ) );
    }
    function handleError( response ) {
        if ( ! angular.isObject( response.data ) || ! response.data.message ) {
            return( $q.reject( "An unknown error occurred." ) );
        }
        // Otherwise, use expected error message.
        return( $q.reject( response.data.message ) );
    }
    function handleSuccess( response ) {
	    return( response.data );
	}


});