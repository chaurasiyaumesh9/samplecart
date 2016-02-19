var express = require('express');
var app = express();
var path = require('path');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var sql = require('mysql');

var pool = sql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'samplecart'
});
var port = process.env.PORT || 8087;

//app.use(express.static(path.join(__dirname, '/public')));
//app.use(express.static(path.join(__dirname, 'bower_components')));

app.use(express.static( path.join(__dirname + '/public')));
app.use('/bower_components',  express.static(path.join(__dirname + '/bower_components')));
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); 



app.set('views', __dirname + '/views');
app.set('view engine','ejs');
app.set('view cache', false);


app.get('/categories', function(req, res){
	getActiveCategories( req, res );
});

/* ----------- /admin for backend Requests ------------*/

app.get('/admin/categories', function(req, res){
	getCategories( req, res );
});

app.get('/admin/categories/:id', function(req, res){
	getCategoryById( req, res );
});

app.put('/admin/categories/:id', function(req, res){
	updateCategory( req, res );
});

app.post('/admin/categories', function(req, res){
	addCategory( req, res );
});

app.delete('/admin/categories/:id', function(req, res){
	deleteCategories( req, res );
});
/* ----------- ------- ------------*/


app.listen(port, function(){
	console.log('listening @ port : ' + port);
});

function getActiveCategories(req, res){
	pool.getConnection( function(err, conn){
		conn.query("select * from categories where active=1", function(err, results) {
             if (!err)
			{
				//res.render('categories', { categories: results });
				res.json( results );
			}else{
				console.log('Error while performing the query..check function getCategories() for more details..');
			}
			conn.release();
         });
	});
}


function getCategories(req, res){
	pool.getConnection( function(err, conn){
		conn.query("select * from categories", function(err, results) {
             if (!err)
			{
				//res.render('categories', { categories: results });
				res.json( results );
			}else{
				console.log('Error while performing the query..check function getCategories() for more details..');
			}
			conn.release();
         });
	});
}

//name, keywords, active, url

function updateCategory(req, res){
	var id = req.params.id;
	//console.log('req.body :',req.body);
	//console.log('id:',id);
	pool.getConnection( function(err, conn){
		conn.query("update categories set keywords='"+req.body.keywords+"', active= "+req.body.active+"  where id="+id, function(err, results) {
             if (!err)
			{
				console.log('results :',results);
				res.json( results );
			}else{
				console.log('Error while performing the query..check function getCategories() for more details..');
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
				//res.render('categories', { categories: results });
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
				//res.render('categories', { categories: results });
				res.json({});
				//res.redirect('/admin/categories');
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
				//res.render('categories', { categories: results });
				res.json({});
				//res.redirect('/admin/categories');
			}else{
				console.log('Error while performing the query..check function deleteCategories() for more details..');
			}
			conn.release();
         });
	});
} 