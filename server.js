var express = require('express');
var app = express();
var path = require('path');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var sql = require('mysql');
var admin =  require('./routes/admin');

var pool = sql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'samplecart'
});
var port = process.env.PORT || 8087;

app.use(express.static( path.join(__dirname + '/public')));
app.use('/bower_components',  express.static(path.join(__dirname + '/bower_components')));
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); 

app.use('/admin', admin);

app.set('views', __dirname + '/views');
app.set('view engine','ejs');
app.set('view cache', false);


app.get('/categories', function(req, res){
	getActiveCategories( req, res );
});




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
				console.log('Error while performing the query..check function getActiveCategories() for more details..');
			}
			conn.release();
         });
	});
}


