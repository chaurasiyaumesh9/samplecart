var express    = require('express')   ;
var router= express.Router();
var pool = require('../config/dbconnection');
var app = express();
//var moment = require('moment');
//app.locals.moment = require('moment');



var categories = {
	getCategories: function (req, res){
		pool.getConnection( function(err, conn){
			conn.query("CALL getAllCategories()", function(err, results) {
				 if (!err)
				{
					res.json( results[0] );
				}else{
					console.log('Error while performing the query..check function getCategories() for more details..', err );
				}
				conn.release();
			 });
		});
	},
	getCategoryById: function(req, res){
		pool.getConnection( function(err, conn){
			conn.query("CALL getCategoryById("+req.params.id + ")", function(err, results) {
				 if (!err)
				{
					res.json( results[0][0] );
				}else{
					console.log('Error while performing the query..check function getCategoryById() for more details..', err );
				}
				conn.release();
			 });
		});
	},
	addNewCategory: function(req, res){
		if ( !req.body.category )
		{
			return;
		}
		var category = req.body.category;
		//console.log( category );
		pool.getConnection( function(err, conn){
			conn.query("CALL addCategory('"+ category.name +"','"+ category.keywords +"',"+ category.active+ ",'"+ category.url +"')", function(err, results) {
				 if (!err)
				{
					res.json({});
				}else{
					console.log('Error while performing the query..check function addNewCategory() for more details..', err );
				}
				conn.release();
			 });
		});
	},
	deleteCategory: function(req, res){
		pool.getConnection( function(err, conn){
			conn.query("CALL deleteCategory("+ req.params.id +")", function(err, results) {
				 if (!err)
				{
					res.json({});
				}else{
					console.log('Error while performing the query..check function deleteCategory() for more details..',err );
				}
				conn.release();
			 });
		});
	},
	updateCategory: function(req, res){
		if ( !req.body.category )
		{
			return;
		}
		var category = req.body.category;
		console.log('category :',category);
		pool.getConnection( function(err, conn){
			conn.query("CALL updateCategory("+ category.id +",'"+ category.name +"','"+ category.keywords +"',"+ category.active +",'"+ category.url +"')", function(err, results) {
				 if (!err)
				{
					res.json( results );
				}else{
					console.log('Error while performing the query..check function updateCategory() for more details..',err);
				}
				conn.release();
			 });
		});
	}
};

var products = {
	getProductList: function (req, res){
		pool.getConnection( function(err, conn){
			conn.query("CALL getAllProducts()", function(err, results) {
				 if (!err)
				{
					res.json( results[0] );
				}else{
					console.log('Error while performing the query..check function getProductList() for more details..', err );
				}
				conn.release();
			 });
		});
	},
	getProductById: function (req, res){
		pool.getConnection( function(err, conn){
			conn.query("CALL getProductById("+ req.params.id +")", function(err, results) {
				 if (!err)
				{
					res.json( results[0][0] );
				}else{
					console.log('Error while performing the query..check function getProductById() for more details..',err);
				}
				conn.release();
			 });
		});
	},
	addNewProduct: function(req, res){
		if ( !req.body.product )
		{
			return;
		}
		var product = req.body.product;
		console.log( product );
		pool.getConnection( function(err, conn){
			
			conn.query("CALL addProduct('"+ product.name +"','"+ product.SKU+ "',"+ product.price +","+ product.quantity +","+ product.in_stock +",'"+ product.description +"','"+ product.short_description+"','"+ product.valid_from +"','"+ product.valid_till +"')", function(err, results) {
				 if (!err)
				{
					res.json({});
				}else{
					console.log('Error while performing the query..check function addNewProduct() for more details..',err);
				}
				conn.release();
			 });
		});
	},
	updateProduct: function(req, res){
		if ( !req.body.product )
		{
			return;
		}
		var product = req.body.product;
		//console.log( 'product : ', product );
		var Query = "CALL updateProduct("+ product.id +","+ product.name +","+ product.SKU +","+ product.price +","+ product.quantity +","+ product.in_stock +","+ product.description +","+ product.short_description +","+ product.valid_from +","+ product.valid_till +")";
		
		//console.log('Query :',Query);
		pool.getConnection( function(err, conn){
			conn.query(Query, function(err, results) {
				 if (!err)
				{
					res.json( results );
				}else{
					console.log('Error while performing the query..check function updateProduct() for more details..',err);
				}
				conn.release();
			 });
		});
	},
	deleteProduct: function(req, res){
		pool.getConnection( function(err, conn){
			conn.query("CALL deleteProduct("+ req.params.id +")", function(err, results) {
				 if (!err)
				{
					res.json({});
				}else{
					console.log('Error while performing the query..check function deleteProduct() for more details..',err);
				}
				conn.release();
			 });
		});
	}
};

router.get('/categories', function(req, res){
	categories.getCategories( req, res );
});

router.get('/categories/:id', function(req, res){
	categories.getCategoryById( req, res );
});

router.put('/categories/:id', function(req, res){
	categories.updateCategory( req, res );
});

router.post('/categories', function(req, res){
	categories.addNewCategory( req, res );
});

router.delete('/categories/:id', function(req, res){
	categories.deleteCategory( req, res );
});


router.get('/products', function(req, res){
	products.getProductList(req, res);
});
router.get('/products/:id', function(req, res){
	products.getProductById(req, res);
});
router.put('/products/:id', function(req, res){
	products.updateProduct( req, res );
});
router.post('/products', function(req, res){
	products.addNewProduct( req, res );
});
router.delete('/products/:id', function(req, res){
	products.deleteProduct( req, res );
});



module.exports = router;
