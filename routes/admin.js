var express    = require('express')   ;
var router= express.Router();
var pool = require('../config/dbconnection');

var categories = {
	getCategories: function (req, res){
		pool.getConnection( function(err, conn){
			conn.query("select * from categories", function(err, results) {
				 if (!err)
				{
					res.json( results );
				}else{
					console.log('Error while performing the query..check function getCategories() for more details..');
				}
				conn.release();
			 });
		});
	},
	getCategoryById: function(req, res){
		pool.getConnection( function(err, conn){
			conn.query("select * from categories where id="+req.params.id, function(err, results) {
				 if (!err)
				{
					res.json( results[0] );
				}else{
					console.log('Error while performing the query..check function getCategories() for more details..');
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
			conn.query("Insert into categories(name, keywords, active, url ) values('"+category.name+"', '"+category.keywords+"', "+category.active+",'"+ category.url +"')", function(err, results) {
				 if (!err)
				{
					res.json({});
				}else{
					console.log('Error while performing the query..check function addNewCategory() for more details..');
				}
				conn.release();
			 });
		});
	},
	deleteCategory: function(req, res){
		pool.getConnection( function(err, conn){
			conn.query("delete from categories where id=" + req.params.id, function(err, results) {
				 if (!err)
				{
					res.json({});
				}else{
					console.log('Error while performing the query..check function deleteCategory() for more details..');
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
		pool.getConnection( function(err, conn){
			conn.query("update categories set keywords='"+category.keywords+"', active= "+category.active+"  where id="+category.id, function(err, results) {
				 if (!err)
				{
					res.json( results );
				}else{
					console.log('Error while performing the query..check function updateCategory() for more details..');
				}
				conn.release();
			 });
		});
	}
};

var products = {
	getProductList: function (req, res){
		pool.getConnection( function(err, conn){
			conn.query("select * from products", function(err, results) {
				 if (!err)
				{
					res.json( results );
				}else{
					console.log('Error while performing the query..check function getProductList() for more details..');
				}
				conn.release();
			 });
		});
	},
	getProductById: function (req, res){
		pool.getConnection( function(err, conn){
			conn.query("select * from products where id="+req.params.id, function(err, results) {
				 if (!err)
				{
					res.json( results[0] );
				}else{
					console.log('Error while performing the query..check function getProductById() for more details..');
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
		//console.log( product );
		pool.getConnection( function(err, conn){
			conn.query("Insert into products( category_ids, name, SKU, price, quantity, enabled, description, short_description) values('"+product.category_ids+"', '"+product.name+"',' "+product.SKU+"',"+ product.price +","+ product.quantity +","+ product.enabled +",'"+ product.description +"','"+ product.short_description+"')", function(err, results) {
				 if (!err)
				{
					res.json({});
				}else{
					console.log('Error while performing the query..check function addNewProduct() for more details..');
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
router.post('/products', function(req, res){
	products.addNewProduct( req, res );
});

module.exports = router;
