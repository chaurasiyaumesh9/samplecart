//caution - complete service injection in controller


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
	$scope.message = "Welcome to dashboard!"; //just to check if controller is working fine..print the message!
});
adminApp.controller('productsCtrl', function($scope){
	$scope.message = "Manage Your Products";
});

adminApp.controller('categoriesCtrl', function($scope, $http, $routeParams, categories){
	$scope.message = "Manage Categories";
	$scope.showDelete = false;
	$scope.deletionSuccess = false;
	$scope.updationSuccess = false;
	$scope.deleteCount = 0;
	var categoryId = -1;

	if ( $routeParams.id )
	{
		categoryId = $routeParams.id; // check if in edit mode
		categories.getCategoryById( categoryId ).then( function( response ){
			$scope.category = response;
		} , function(errorMessage ){ 
			console.warn( errorMessage );
		});
	}
	getAllCategories();

	function clearScope(){
		$scope.category = {};
	}

	function getAllCategories(){
		categories.getAllCategories().then( function( response ){
			$scope.categories = response;
		}, function( errorMessage ){
			console.warn( errorMessage );
		});
		
	}

	$scope.updateCategory = function( id ){
		
		$http.put('/admin/categories/' + id, $scope.category  ).success( function( response ){
			$scope.updationSuccess = true;
		});
	}

	$scope.addNewCategory = function(){
		//console.log( $scope.category );
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

adminApp.service("categories", function($http, $q){
	return({
        addCategory: addCategory,
        getAllCategories: getAllCategories, //done
		getCategoryById: getCategoryById, //done
        deleteCategory: deleteCategory,
		updateCategory: updateCategory
    });

	function addCategory( category ){
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
		console.log('getCategoryById',id);
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
	 function updateCategory( id, category ) {
        var request = $http({
            method: "put",
            url: "/admin/categories/" + id,
            params: {
                action: "update"
            },
            data: {
				id: id,
                category: category
            }
        });
        return( request.then( handleSuccess, handleError ) );
    }
    function handleError( response ) {
        if (
            ! angular.isObject( response.data ) ||
            ! response.data.message
            ) {
            return( $q.reject( "An unknown error occurred." ) );
        }
        // Otherwise, use expected error message.
        return( $q.reject( response.data.message ) );
    }
    function handleSuccess( response ) {
	    return( response.data );
	}


});