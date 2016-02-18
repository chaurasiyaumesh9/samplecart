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
var port = process.env.PORT || 8080;

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


app.get('/admin/categories', function(req, res){
	
	getCategories( req, res );
	
});

app.post('/admin/categories', function(req, res){
	//console.log('data : ', req.body );
	addCategory( req, res );
});

/*
app.get('/admin', function(req, res){
	res.render('admin');
});




app.get('/admin/categories/add-new', function(req, res){
	
	res.render('add-new-category');
	
});

app.get('/admin/products', function(req, res){
	res.render('products');
});
*/

app.listen(port, function(){
	console.log('listening @ port : ' + port);
});


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

function addCategory(req, res){
	pool.getConnection( function(err, conn){
		conn.query("Insert into categories(name, keywords, active ) values('"+req.body.name+"', '"+req.body.keywords+"', "+req.body.active+")", function(err, results) {
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