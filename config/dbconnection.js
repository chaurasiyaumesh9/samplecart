var sql = require('mysql');
var pool = sql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'samplecart'
});



module.exports = pool;