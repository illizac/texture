var mysql = require('mysql')

var conn = mysql.createConnection({
  	host: '127.0.0.1',
  	user: 'root',
  	password: 'zdas2016must',
  	database: 'sxproject'
})
conn.connect()

module.exports = conn
