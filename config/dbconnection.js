var sql = require('mysql');
var pool = sql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'sample2'
});



module.exports = pool;