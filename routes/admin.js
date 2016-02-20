var express    = require('express')   ;
var router= express.Router();
var pool = require('../config/dbconnection');


router.get('/categories', function(req, res){
	getCategories( req, res );
});

router.get('/categories/:id', function(req, res){
	getCategoryById( req, res );
});

router.put('/categories/:id', function(req, res){
	updateCategory( req, res );
});

router.post('/categories', function(req, res){
	addCategory( req, res );
});

router.delete('/categories/:id', function(req, res){
	deleteCategories( req, res );
});


function getCategories(req, res){
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
}

function updateCategory(req, res){
	var id = req.params.id;
	pool.getConnection( function(err, conn){
		conn.query("update categories set keywords='"+req.body.keywords+"', active= "+req.body.active+"  where id="+id, function(err, results) {
             if (!err)
			{
				console.log('results :',results);
				res.json( results );
			}else{
				console.log('Error while performing the query..check function updateCategory() for more details..');
			}
			conn.release();
         });
	});
}

function getCategoryById(req, res){
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
}



function addCategory(req, res){
	console.log('addCategory');
	pool.getConnection( function(err, conn){
		conn.query("Insert into categories(name, keywords, active, url ) values('"+req.body.name+"', '"+req.body.keywords+"', "+req.body.active+",'"+ req.body.url +"')", function(err, results) {
             if (!err)
			{
				res.json({});
				console.log( results);
			}else{
				console.log('Error while performing the query..check function addCategory() for more details..');
			}
			conn.release();
         });
	});
} 

function deleteCategories(req, res){
	pool.getConnection( function(err, conn){
		conn.query("delete from categories where id=" + req.params.id, function(err, results) {
             if (!err)
			{
				res.json({});
			}else{
				console.log('Error while performing the query..check function deleteCategories() for more details..');
			}
			conn.release();
         });
	});
} 

module.exports = router;
